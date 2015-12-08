import React from "react";
import LinkActions from "../actions/LinkActions";

class Link extends React.Component {
  deleteLink() {
    LinkActions.deleteBookmark(this.props.link);
  }
  likeLink() {
    LinkActions.likeBookmark(this.props.link);
  }
  render() {
    let {title, url, safe} = this.props.link;

    return (
      <div className="link">
        <a href={url}
           style={ { color: (safe ? 'green' : 'black') } }
          >{title}</a>
        <button onClick={this.deleteLink.bind(this)}>Delete</button>
        <button onClick={this.likeLink.bind(this)}>Like</button>
      </div>
    );
  }
}

export default Link;
