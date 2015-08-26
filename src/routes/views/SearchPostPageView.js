import {OrderedSet} from "immutable";
import React, { PropTypes } from "react";

import {connect, createEnterTransitionHook, propSliceWillChange} from "../../decorators";
import * as PostActions from "../../actions/PostActions";
import PostList from "../../components/common/PostList";

if ("undefined" !== typeof window) {
  require("../../styles/views/SearchPostPageView.styl");
}

function fetchData (dispatch, term) {
  return dispatch(PostActions.getPostListBySearchTerm(term));
}

@createEnterTransitionHook(store => (state/*, transition*/) => {
  const { AppReducer } = store.getState();
  const { location: { query } } = state;

  if (!query || !query.q) {
    return;
  }

  if (AppReducer.fetchForServerRendering) {
    return fetchData(store.dispatch, query.q);
  }
})
@propSliceWillChange(["location.query.q"], (props) => {
  const { dispatch, location: { query } } = props;

  if (query && query.q) {
    fetchData(dispatch, query.q);
  }
})
@connect(function mapStateToProps (state) {
  const { PostReducer } = state;

  return {
    PostReducer,
  };
}, null, function mergeProps ({PostReducer}, dispatchProps, ownProps) {
  const { location: { query } } = ownProps;

  let posts = new OrderedSet();

  if (query && query.q) {
    posts = PostReducer.getIn(["postIdsBySearchTerm", query.q], posts)
              .map(id => PostReducer.getIn(["postById", id]));
  }

  return {
    ...ownProps,
    posts,
  };
})
export default class SearchPostPageView extends React.Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    posts: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    const { location: { query } } = props;

    this.state = {
      term: query ? query.q : null,
    };
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }

  renderHeader() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <input
            className="search-container__input"
            type="search"
            onChange={this.handleInputChange}
            value={this.state.term}
            placeholder="Search"
            ref="input"/>
        </form>
      </header>
    );
  }

  renderContent() {
    const {location: {query}, posts} = this.props;
    const {term} = this.state;

    if (query && query.q === term) {
      return (
        <PostList posts={posts}/>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  getInputField() {
    return React.findDOMNode(this.refs.input);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {term} = this.state;

    // Blur the input field when the form is submittted
    this.getInputField().blur();

    this.context.router.transitionTo("/search", {
      q: term,
    });
  }

  handleInputChange = (e) => {
    this.setState({
      term: e.target.value,
    });
  }
}
