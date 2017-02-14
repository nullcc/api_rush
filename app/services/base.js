import errHandling from '../lib/errHandling';

const superagent = require('superagent');

class BaseService {

  constructor(ctx) {
    this.ctx = ctx;
  }

  @errHandling
  async request(method, url, data = null, options = {}, ignoreErr = false) {
    this.ignoreErr = ignoreErr;
    const reqOptions = options || {};
    let authorization = null;
    reqOptions.accept = "application/json";
    const response = await this.doRequest(method, url, data, reqOptions);
    return response;
  }

  async doRequest(method, url, data, options) {
    let response = null;
    try {
      switch (method.toLowerCase()) {
        case 'get':
        {
          response = await BaseService.get(url, data, options);
          break;
        }
        case 'post':
        {
          response = await BaseService.post(url, data, options);
          break;
        }
        case 'put':
        {
          response = await BaseService.put(url, data, options);
          break;
        }
        case 'patch':
        {
          response = await BaseService.patch(url, data, options);
          break;
        }
        case 'delete':
        {
          response = await BaseService.delete(url, data, options);
          break;
        }
        case 'head':
        {
          response = await BaseService.head(url, data, options);
          break;
        }
        case 'options':
        {
          response = await BaseService.options(url, data, options);
          break;
        }
        default:
        {
          response = await BaseService.get(url, data, options);
          break;
        }
      }
    } catch (errResponse) {
      throw new Error('request error');
    }
    return response;
  }

  // get
  static async get(url, data, options) {
    return await superagent
        .get(url)
        .set(options)
        .query(data);
  }

  // post
  static async post(url, data, options) {
    return await superagent
        .post(url)
        .set(options)
        .send(data);
  }

  // put
  static async put(url, data, options) {
    return await superagent
        .put(url)
        .set(options)
        .send(data);
  }

  // patch
  static async patch(url, data, options) {
    return await superagent
        .patch(url)
        .set(options)
        .send(data);
  }

  // delete
  static async delete(url, data, options) {
    return await superagent
        .del(url)
        .set(options)
        .send(data);
  }

  // head
  static async head(url, data, options) {
    return await superagent
        .head(url)
        .set(options)
        .send(data);
  }

  // options
  static async options(url, data, options) {
    return await superagent
        .option(url)
        .set(options)
        .send(data);
  }

}

export default BaseService;
