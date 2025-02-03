import { allDocs, Docs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { DashboardTableOfContents } from "@/ui/toc/toc";
import { getTableOfContents } from "@/ui/toc/config";
import { Mdx } from "@/ui/mdx-component";
import { NavLeft } from "@/ui/navleft";

interface SlugParams {
  params: Promise<{ docs: string[] }>;
}

export async function generateStaticParams() {
  return allDocs.map(doc => ({ app: [doc._raw.flattenedPath] }));
}

async function getPathFromParams({ params }: SlugParams) {
  const slug = (await params).docs?.join("/") || "";
  const docs = allDocs.find(doc => doc.slug === slug);

  if (!docs) return null;

  return docs;
}

export async function generateMetadata({ params }: SlugParams) {
  const slug = (await params).docs;
  const post = allDocs.find(doc => slug?.includes(doc._raw.flattenedPath));
  return { title: post?.title };
}

export default async function Home({ params }: SlugParams) {
  const docs = await getPathFromParams({ params });

  if (!docs) notFound();

  const toc = await getTableOfContents(docs.body.raw);

  return (
    <main className="w-full relative flex flex-col md:flex-row mx-auto min-h-screen pt-[--navbar] pb-20 max-lg:pr-8 rtl:max-lg:pr-0 rtl:max-lg:pl-8 max-w-var">
      <NavLeft />

      <article className="relative w-full max-w-full overflow-x-hidden max-md:px-6 pt-9 flex flex-col">
        <Mdx code={docs.body.code} />
      </article>

      {docs.toc && <DashboardTableOfContents toc={toc} />}
    </main>
  );
}
