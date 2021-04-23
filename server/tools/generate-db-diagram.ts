import { EOL } from 'os';
import { Direction, Flags, Format, TypeormUml } from 'typeorm-uml';
import { createConnection, getConnectionOptions } from 'typeorm';
import * as path from 'path';

const GENERATED_FILENAME = 'diagram.db.svg';
const GENERATED_PATH = path.join(
  __dirname,
  `../generated/${GENERATED_FILENAME}`,
);

async function main() {
  const options = await getConnectionOptions();
  const connection = await createConnection({
    ...options,
    synchronize: false,
    logging: false,
  });
  const flags: Flags = {
    direction: Direction.LR,
    format: Format.SVG,
    handwritten: false,
  };

  const typeormUml = new TypeormUml();
  const url = await typeormUml.build(connection, flags);
  process.stdout.write('[Database] Diagram URL: ' + url + EOL);
}
if (process.env.NODE_ENV === 'production') {
  process.stdout.write('Skip' + EOL);
} else {
  main();
}
