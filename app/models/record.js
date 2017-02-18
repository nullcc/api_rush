// record schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';
import {Api, Project} from './index';

const RecordSchema = Base.extend({
  project: {type: db.Schema.Types.ObjectId, ref: 'Project'},
  api: {type: db.Schema.Types.ObjectId, ref: 'Api'},
  status_code: {type: String},
  response: {type: String}
}, {autoIndex: false});

const Record = db.model('Record', RecordSchema);

export default Record;
