const port = Number.parseInt(process.env.PORT) || 7777

module.exports = {
  port: port,
  hostName: 'http://localhost:' + port,
  serveStatic: true,
  assetHost: '',
  staticHost: '',
  redisUrl: 'redis://localhost:6379',
  redisSessionUrl: 'redis://localhost:6379/1',
  secretKey: 'nullcc',
  mongodb: {
    host: 'localhost',
    port: 27017,
    database: 'api_rush',
    user: 'admin',
    pwd: '123456'
  }
};
