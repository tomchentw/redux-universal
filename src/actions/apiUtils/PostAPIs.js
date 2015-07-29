// import fetch from "isomorphic-fetch";
import faker from "faker";

export function fetchPostList(forumId) {
  // Normally you should just return fetch(`/api/posts/`) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: global.fakePostList,
      });
    }, 800);
  });
}

export function fetchPostListBySearchTerm(term) {
  // Normally you should just return fetch(`/api/searchPosts/`) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeSearchList = global.fakePostSearchList.filter(() => 0.33 > Math.random());

      resolve({
        data: fakeSearchList,
      });
    }, 800);
  });
}

export function fetchPost(postId) {
  // Normally you should just return fetch(`/api/posts/:postId`) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          ...([...global.fakePostList, ...global.fakePostSearchList].filter(it => postId === it.id)[0]),
          content: faker.lorem.paragraphs(),
        },
      });
    }, 800);
  });
}
