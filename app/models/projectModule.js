// project module schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';

const ProjectModuleSchema = Base.extend({
  name: {type: String},
  desc: {type: String}
}, {autoIndex: false});

const ProjectModule = db.model('ProjectModule', ProjectModuleSchema);

export default ProjectModule;
