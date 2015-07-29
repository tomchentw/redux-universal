import App from "./views/App";
import HomePageView from "./views/HomePageView";
import ForumListPageView from "./views/ForumListPageView";
import ForumPostPageView from "./views/ForumPostPageView";
import PostPageView from "./views/PostPageView";
import SearchPostPageView from "./views/SearchPostPageView";

export default function routes(store) {
  return {
    onEnter: App.onEnterCreator(store),
    component: App,
    childRoutes: [
      {
        component: HomePageView,
        path: "/",
      },
      {
        component: ForumListPageView,
        path: "/forums",
      },
      {
        onEnter: ForumPostPageView.onEnterCreator(store),
        component: ForumPostPageView,
        path: "/forums/:forumId",
      },
      {
        onEnter: PostPageView.onEnterCreator(store),
        component: PostPageView,
        path: "/posts/:postId",
      },
      {
        onEnter: SearchPostPageView.onEnterCreator(store),
        component: SearchPostPageView,
        path: "/search",
      },
      {
        path: "*",
        onEnter(state, transition) {
          // You may choose to render a 404 PageView here.
          transition.to("/");
        },
      },
    ],
  };
}
