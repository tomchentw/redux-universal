import React, {PropTypes} from "react";
import {Link} from "react-router";

import shouldImmutableComponentUpdate from "../../utils/shouldImmutableComponentUpdate";

if ("undefined" !== typeof window) {
  require("../../styles/common/PostList.styl");
}

export default class PostList extends React.Component {
  static propTypes = {
    forumAlias: PropTypes.string.isRequired,
    forumId: PropTypes.string.isRequired,
    posts: PropTypes.object.isRequired,
  }

  shouldComponentUpdate = shouldImmutableComponentUpdate;

  render() {
    const {posts} = this.props;

    return (
      <div>
        {posts.map(this.renderPost)}
      </div>
    );
  }

  renderPost = (item) => {
    return (
      <Link key={item.id} className="post-list__item" to={`/posts/${item.get("id")}`}>
        <header className="post-list__header">
          <strong className="post-list__title">{item.get("title")}</strong>
        </header>
        <div className="post-list__content">
          {item.get("shortContent")}
        </div>
      </Link>
    );
  }
}
