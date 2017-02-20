// base schema

import db from '../lib/db.js';
const Schema = db.Schema;
import consts from '../lib/consts';

const BaseSchema = new Schema({
  created_at: {type: Date, default: Date.now}, // 创建时间
  updated_at: {type: Date, default: Date.now}  // 更新时间
}, {autoIndex: false});

// 获取集合的总页数
BaseSchema.statics.getTotalPage = async function (query) {
  const count = await db.model(this.modelName).count(query);
  if (count % 10 === 0) {
    return parseInt(count / consts.ITEMS_PER_PAGE);
  }
  return parseInt(count / consts.ITEMS_PER_PAGE) + 1;
};

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
