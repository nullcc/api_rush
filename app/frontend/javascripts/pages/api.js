$(() => {
  if ($('#api-editor').length) {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const ApiEditor = require('../components/ApiEditor').default;
    const projectId = _data.projectId;
    ReactDOM.render(
      <ApiEditor
        projectId={projectId}
      />, document.getElementById('api-editor')
    );
  }
});
