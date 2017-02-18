// api schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';

const ApiSchema = Base.extend({
  name: {type: String, required: true},
  desc: {type: String},
  project: {type: db.Schema.Types.ObjectId, ref: 'Project'},
  url: {type: String, required: true},
  http_method: {type: String, default: 'GET', required: true},
  headers: [{type: Object}],
  body: {type: String},

}, {autoIndex: false});

const Api = db.model('Api', ApiSchema);

export default Api;
