import React, {Component} from 'react';
import "./api_editor.css";

class ApiEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      httpMethod: "GET"
    };
    this.handleHttpMethodChanged = this.handleHttpMethodChanged.bind(this);
  }

  handleHttpMethodChanged (e) {
    const method = e.target.value;
    this.setState({httpMethod: method});
  }

  buildBodyField () {
    return (
      <div>
        <div className="api_editor_body_field">
          <input type="radio" name="post_type" value="form-data" />&nbsp;form-data
          &nbsp;
          <input type="radio" name="post_type" value="x-www-form-urlencoded" />&nbsp;x-www-form-urlencoded
          &nbsp;
          <input type="radio" name="post_type" value="raw" />&nbsp;raw
          &nbsp;
          <input type="radio" name="post_type" value="binary" />&nbsp;binary
        </div>
        <div className="form-group">
          <label htmlFor="desc">body</label><br />
          <textarea className="form-control" defaultValue={""} rows={5} name="body"/>
        </div>
      </div>
    );
  }

  render () {
    let buildBodyField = "";
    if (this.state.httpMethod !== "GET") {
      buildBodyField = this.buildBodyField();
    }
    return (
      <div>
        <h3>新建api</h3><a className="btn btn-warning pull-right" href={`/projects/${this.props.projectId}/apis`}>返回</a>
        <form className="col-sm-9" method="post" action={`/projects/${this.props.projectId}/apis`}>
          <input type="hidden" name="_csrf" value={ API_RUSH.csrf_token } />
          <input type="hidden" name="project" value={this.props.projectId} />
          <div className="form-group">
            <label htmlFor="name">api名称</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="api名称" />
          </div>
          <div className="form-group">
            <label htmlFor="name">url</label>
            <input type="text" className="form-control" id="url" name="url" placeholder="url" />
          </div>
          <div className="form-group">
            <label htmlFor="name">http method</label><br />
            <select name="http_method" onChange={this.handleHttpMethodChanged}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          { buildBodyField }

          <div className="form-group">
            <label htmlFor="desc">描述</label><br />
            <textarea className="form-control" defaultValue={""} rows={5} name="desc" />
          </div>
          <button type="submit" className="btn btn-default">提交</button>
        </form>
      </div>
    );
  }
}

export default ApiEditor;
