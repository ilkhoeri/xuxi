import fs from "fs";
import path from "node:path";

interface SyncCopyProps {
  title: string;
  date: Date | string | number;
  fileSource: string;
  fileOutput: string;
}

function nameFile(fileSource: string) {
  const file = fileSource.split("/");
  return file[file.length - 1];
}

/**
 * expecting a folder structure like the following:
 * ```md
 * cretex
 * ├── main (module root)
 * │ ├── CHANGELOG.md
 * │ ├── CODE_OF_CONDUCT.md
 * │ ├── CONTRIBUTING.md
 * │ ├── LICENSE
 * │ │
 * │ └── // others folder and files...
 * │
 * ├── docs (docs root)
 * │ ├── md
 * │ │ ├── file-1.mdx
 * │ │ ├── file-2.mdx
 * │ │ └── // others files...
 * │ │
 * │ └── // others folder and files...
 * │
 * └── // end...
 * ```
 * @param meta {@link SyncCopyProps SyncCopyProps}
 * @returns void
 */
function syncCopy(meta: SyncCopyProps) {
  const { title, date, fileSource, fileOutput } = meta;
  const sourcePath = path.resolve(__dirname, fileSource);
  const targetPath = path.resolve(__dirname, fileOutput);

  try {
    const outputDir = path.dirname(targetPath);
    fs.mkdirSync(outputDir, { recursive: true });

    if (!fs.existsSync(sourcePath)) {
      console.error("Source file not found:", sourcePath);
      return;
    }

    const sourceContent = fs.readFileSync(sourcePath, "utf-8");
    // const targetContent = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, "utf-8") : "";

    // const yamlMatch = targetContent.match(/^---\n(.*?)\n---/s);
    // const yamlMetadata = yamlMatch ? yamlMatch[0] : `---\ntitle: ${title}\ndate: ${date}\n---`;
    const yamlMetadata = `---\ntitle: ${title}\ndate: ${date}\n---`;
    const newContent = `${yamlMetadata}\n\n${sourceContent.trim()}`;

    fs.writeFileSync(targetPath, newContent, "utf-8");

    console.info(`\n✅ Synchronized ${title} from [${nameFile(fileSource)}] to [${nameFile(fileOutput)}] Successfully.\n`);
  } catch (error) {
    console.error("Error:", `\n${error}\n`);
  }
}

const date = new Intl.DateTimeFormat("en-CA").format(new Date());

syncCopy({
  title: "CHANGELOG",
  date,
  fileSource: "../../main/CHANGELOG.md",
  fileOutput: "../md/changelog.mdx"
});

syncCopy({
  title: "Code of Conduct",
  date,
  fileSource: "../../main/CODE_OF_CONDUCT.md",
  fileOutput: "../md/coc.mdx"
});
