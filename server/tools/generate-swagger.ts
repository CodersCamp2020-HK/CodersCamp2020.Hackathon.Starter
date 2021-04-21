import { createSwaggerDocument } from 'src/configuration';
import * as path from 'path';
import { appFactory } from 'src/app.build';
import * as fs from 'fs/promises';

const GENERATED_FILENAME = 'swagger.json';
const GENERATED_PATH = path.join(
  __dirname,
  `../generated/${GENERATED_FILENAME}`,
);

async function main() {
  const app = await appFactory();
  const document = createSwaggerDocument(app);
  await fs.writeFile(GENERATED_PATH, JSON.stringify(document));
}
main();
