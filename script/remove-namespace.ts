import fs from 'fs/promises';
import path from 'node:path';
import log from './log';
import chalk from 'chalk';

async function removeNamespace() {
  try {
    const baseFolder = 'src';
    const indexFile = path.join(baseFolder, 'index.ts');

    const content = await fs.readFile(indexFile, 'utf8');

    const namespaceRegex = /namespace xuxi\s*{([\s\S]*?)}\n*export { xuxi as default, xuxi as x };/g;
    const matches = content.match(namespaceRegex);

    const removeContent = matches ? content.replace(namespaceRegex, '') : content;

    await fs.writeFile(indexFile, `${removeContent.trimEnd()}\n`, 'utf8');

    log.build('namespace', chalk.greenBright('✂️  berhasil dihapus'));
  } catch (error) {
    log.error('Terjadi kesalahan saat menghapus namespace. Error:', error);
  }
}

removeNamespace();
