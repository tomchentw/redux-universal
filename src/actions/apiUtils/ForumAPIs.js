// import fetch from "isomorphic-fetch";

export function fetchForumList() {
  // Normally you should just return fetch("/api/forums/") ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: global.fakeForumList,
      });
    }, 800);
  });
}
