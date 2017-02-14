import db from '../lib/db.js';

require('./project');
require('./api');
require('./projectModule');
require('./user');

exports.Project = db.model('Project');
exports.Api = db.model('Api');
exports.Module = db.model('ProjectModule');
exports.User = db.model('User');
