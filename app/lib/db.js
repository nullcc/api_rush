const mongoose = require('mongoose');
import config from '../../config/config';

const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
mongoose.Promise = global.Promise;
mongoose.connect(uri);

export default mongoose;
