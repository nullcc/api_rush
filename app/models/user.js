// user schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';

const UserSchema = Base.extend({
  name: {type: String}
}, {autoIndex: false});

const User = db.model('User', UserSchema);

export default User;
