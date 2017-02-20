exports.page = (context, pageName) => {
  let querystring = context.querystring;
  if (querystring.indexOf(`&${pageName}`) > -1) {
    const reg = new RegExp(`&${pageName}=\\d*`);
    querystring = querystring.replace(reg, '');
  } else {
    const reg = new RegExp(`${pageName}=\\d*&*`);
    querystring = querystring.replace(reg, '');
  }
  let path = context.path.substr(1, context.path.length - 1);
  path = querystring ? `${path}?${querystring}&` : `${path}?`;
  return path;
};
