$(() => {
  if ($('#api-editor').length) {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const ApiEditor = require('../components/ApiEditor').default;
    const projectId = "58a7ae09054f5c3ed0f3e579";
    ReactDOM.render(
      <ApiEditor
        projectId={projectId}
      />, document.getElementById('api-editor')
    );
  }
});
