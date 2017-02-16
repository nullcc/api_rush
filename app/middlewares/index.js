import fs from 'fs';
import path from 'path';

const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) && (file !== basename) && (file.split('.').slice(-1)[0] === 'js')
  )
  .forEach((file) => {
    const filename = file.split('.')[0];
    module.exports[filename] = require(path.join(__dirname, file));
  });
