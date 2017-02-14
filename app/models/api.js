// api schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';

const ApiSchema = Base.extend({
  name: String,
  desc: String,
  project_id: {type: db.Schema.Types.ObjectId, ref: 'Project'},
  url: String,
  http_method: {type: String, default: 'GET'},
  headers: [{type: Object}]
}, {autoIndex: false});

const Api = db.model('Api', ApiSchema);

export default Api;
