import React, {PropTypes} from "react";

import {connect, createEnterTransitionHook, propSliceWillChange} from "../../decorators";

import * as AppActions from "../../actions/AppActions";
import * as PostActions from "../../actions/PostActions";

if ("undefined" !== typeof window) {
  require("../../styles/views/PostPageView.styl");
}

function fetchData (dispatch, postId) {
  return dispatch(PostActions.getPost(postId));
}

@createEnterTransitionHook(store => (state/*, transition */) => {
  const { AppReducer, PostReducer } = store.getState();
  const { params: { postId } } = state;

  if (AppReducer.fetchForServerRendering) {
    return fetchData(store.dispatch, postId);
  }
  if (!PostReducer.hasIn(["postById", postId, "content"])) {
    return fetchData(store.dispatch, postId);
  }
})
@connect(function mapStateToProps (state, ownProps) {
  const { PostReducer } = state;

  const { params: { postId } } = ownProps;

  const post = PostReducer.getIn(["postById", postId]);

  return {
    post,
  };
}, {// mapDispatchToProps
  setTitle: AppActions.setTitle,
})
@propSliceWillChange(["post"], (props) => {
  const { post, setTitle } = props;
  if (post) {

    setTitle(`${ post.get("title") } | PostPageView`);
  }
})
export default class PostPageView extends React.Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    setTitle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    const {post} = this.props;

    return (
      <div className="post">
        <header className="post__header">
          <h1 className="post__title">{post.get("title")}</h1>
        </header>
        <p className="post__content">{post.get("content")}</p>
      </div>
    );
  }
}
