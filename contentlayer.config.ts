import {
  defineDocumentType,
  defineNestedType,
  makeSource,
  type ComputedFields
} from "contentlayer2/source-files";
// import { getHighlighter } from "@shikijs/compat";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

export const computedFields: ComputedFields = {
  slug: {
    type: "string",
    // resolve: doc => `/${doc._raw.flattenedPath}`,
    resolve: doc => `${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: doc => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  url: {
    type: "string",
    resolve: doc => `/${doc._raw.flattenedPath}`
  }
};

const LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    doc: {
      type: "string"
    },
    api: {
      type: "string"
    }
  }
}));

const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    description: {
      type: "string",
      required: false
    },
    published: {
      type: "boolean",
      default: false
    },
    summary: {
      type: "string",
      required: false
    },
    links: {
      type: "nested",
      of: LinksProperties
    },
    featured: {
      type: "boolean",
      default: false,
      required: false
    },
    component: {
      type: "boolean",
      default: false,
      required: false
    },
    toc: {
      type: "boolean",
      default: true,
      required: false
    }
  },
  // computedFields: {
  //   url: {
  //     type: "string",
  //     resolve: doc => `/${doc._raw.flattenedPath}`
  //   }
  // },
  computedFields
}));

export default makeSource({
  contentDirPath: "md",
  documentTypes: [Page],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      //rehypeComponent,
      () => tree => {
        visit(tree, node => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") {
              return;
            }

            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/;
              const match = codeEl.data?.meta.match(regex);
              if (match) {
                node.__event__ = match ? match[1] : null;
                codeEl.data.meta = codeEl.data.meta.replace(regex, "");
              }
            }

            node.__rawString__ = codeEl.children?.[0].value;
            node.__src__ = node.properties?.__src__;
            node.__style__ = node.properties?.__style__;
          }
        });
      },
      [
        rehypePrettyCode
        // {
        //   theme: "github-dark",
        //   getHighlighter,
        //   onVisitLine(node: any) {
        //     // Prevent lines from collapsing in `display: grid` mode, and allow empty
        //     // lines to be copy/pasted
        //     if (node.children.length === 0) {
        //       node.children = [{ type: "text", value: " " }];
        //     }
        //   },
        //   onVisitHighlightedLine(node: any) {
        //     node.properties.className.push("line--highlighted");
        //   },
        //   onVisitHighlightedWord(node: any) {
        //     node.properties.className = ["word--highlighted"];
        //   }
        // }
      ],
      () => tree => {
        visit(tree, node => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }

            preElement.properties["__withMeta__"] =
              node.children.at(0).tagName === "div";
            preElement.properties["__rawString__"] = node.__rawString__;

            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__;
            }

            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__;
            }

            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__;
            }
          }
        });
      },
      // rehypeNpmCommand,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
