const mongoose = require('mongoose');
import config from '../../config/config';

// const init = function() {
//   const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
//   mongoose.Promise = global.Promise;
//   const db = mongoose.connect(uri);
//
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', function (callback) {
//     console.log('mongodb connect ok.');
//   });
// }

const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
mongoose.Promise = global.Promise;
mongoose.connect(uri);

// module.exports = {
//   init
// }

export default mongoose;
