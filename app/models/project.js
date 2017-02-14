// project schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';

const ProjectSchema = Base.extend({
  name: String,
  desc: String
}, {autoIndex: false});

const Project = db.model('Project', ProjectSchema);

export default Project;
