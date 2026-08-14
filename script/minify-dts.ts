import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import ts from 'typescript';
import { ck } from './log';
import ora from 'ora';

const libFolder = resolve('lib');
const files = readdirSync(libFolder).filter(file => file.endsWith('.d.ts'));

/**
 * Minify konten .d.ts tanpa menghapus komentar & membuat type/interface jadi 1 baris
 */
function minifyDtsContent(code: string, fileName: string): string {
  // 1. Parse source file TypeScript beserta komentarnya
  const sourceFile = ts.createSourceFile(
    fileName,
    code,
    ts.ScriptTarget.Latest,
    true, // Preserve comments
    ts.ScriptKind.TS
  );

  const printer = ts.createPrinter({
    removeComments: false, // JANGAN hapus komentar
    newLine: ts.NewLineKind.LineFeed
  });

  // 2. Cetak kembali node AST tanpa whitespace berlebih
  const rawPrinted = printer.printFile(sourceFile);

  // 3. Transformasi Regex untuk merapatkan spasi dan baris baru dalam blok type & interface
  return (
    rawPrinted
      // Gabungkan multiple newlines/whitespaces di dalam blok {...} menjadi satu baris
      .replace(/\{([\s\S]*?)\}/g, (match, body) => {
        const cleanBody = body
          .replace(/\r?\n/g, ' ') // Hapus newline di dalam blok
          .replace(/\s+/g, ' ') // Gabungkan spasi berlebih
          .trim();
        return `{${cleanBody}}`;
      })
      // Gabungkan ternary / type alias berbaris-baris menjadi 1 baris
      .replace(/;\r?\n/g, ';\n')
      .split('\n')
      .map(line => line.replace(/\s+/g, ' ').trim()) // Merapatkan spasi per baris
      .filter(line => line.length > 0) // Hapus baris kosong
      .join('\n')
  );
}

async function minifyDtsFiles() {
  for (const file of files) {
    const filePath = join(libFolder, file);

    if (statSync(filePath).isFile()) {
      const spinner = ora(ck.yellowBright(`Minifying ${file}`)).start();

      try {
        const rawCode = readFileSync(filePath, 'utf-8');
        const minifiedCode = minifyDtsContent(rawCode, file);

        writeFileSync(filePath, minifiedCode, 'utf-8');
        spinner.succeed(` ${ck.greenBright(`Minified!`)} ${join('lib', file)}`);
      } catch (err) {
        spinner.fail(ck.red(`Failed to minify ${file}`));
        console.error(err);
      }
    }
  }
}

minifyDtsFiles().catch(err => {
  console.error(ck.red('Error during DTS minification:'), err);
  process.exit(1);
});
