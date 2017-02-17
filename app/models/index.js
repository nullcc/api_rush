import fs from 'fs';
import path from 'path';
import db from '../lib/db.js';
require('../lib/enhance');

const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) && (file !== basename) && (file.split('.').slice(-1)[0] === 'js')
  )
  .forEach((file) => {
    const filename = file.split('.')[0].firstUpperCase();
    require(path.join(__dirname, file));
    module.exports[filename] = db.model(filename);
  });
