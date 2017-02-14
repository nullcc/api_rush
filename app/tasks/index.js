const TokenTask = require('./token');

class Task {
  launch () {
    const tokenTask = new TokenTask();
    tokenTask.init();
    this.tokenTask = tokenTask;
  }
}

module.exports = Task;
