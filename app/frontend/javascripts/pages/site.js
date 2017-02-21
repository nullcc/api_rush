window.checkDelete= function (tips) {
  return confirm(tips);
}

window.API_RUSH = {};
window.API_RUSH.csrf_param = $('meta[name=csrf-param]').attr('content');
window.API_RUSH.csrf_token = $('meta[name=csrf-token]').attr('content');
