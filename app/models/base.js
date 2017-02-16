// base schema

import db from '../lib/db.js';
const Schema = db.Schema;

const BaseSchema = new Schema({
  created_at: {type: Date, default: Date.now}, // 创建时间
  updated_at: {type: Date, default: Date.now}  // 更新时间
}, {autoIndex: false});

// save之前更新created_at和updated_at
BaseSchema.pre('save', function(next) {
  const now = new Date();
  if (!this.created_at) {
      this.created_at = now;
  } else {
      this.updated_at = now;
  }
  next();
});

// save之后做的事情
BaseSchema.post('save', function(doc) {
  console.log(`${doc.__t} instance ${doc._id} was saved.`);
});

const Base = db.model('Base', BaseSchema);

export default BaseSchema;
