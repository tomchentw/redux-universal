// import fetch from "isomorphic-fetch";
import faker from "faker";

const fakePostList = [
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
    shortContent: faker.lorem.paragraph(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
    shortContent: faker.lorem.paragraph(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
    shortContent: faker.lorem.paragraph(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
    shortContent: faker.lorem.paragraph(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
    shortContent: faker.lorem.paragraph(),
  },
];

export function fetchPostList(forumId) {
  // Normally you should just return fetch(`/api/posts/`) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: fakePostList,
      });
    }, 800);
  });
}

let fakeSearchList = [
];

export function fetchPostListBySearchTerm(term) {
  // Normally you should just return fetch(`/api/searchPosts/`) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSearchList = [
        {
          id: faker.random.uuid(),
          title: faker.name.title(),
          shortContent: faker.lorem.paragraph(),
        },
        {
          id: faker.random.uuid(),
          title: faker.name.title(),
          shortContent: faker.lorem.paragraph(),
        },
        {
          id: faker.random.uuid(),
          title: faker.name.title(),
          shortContent: faker.lorem.paragraph(),
        },
        {
          id: faker.random.uuid(),
          title: faker.name.title(),
          shortContent: faker.lorem.paragraph(),
        },
        {
          id: faker.random.uuid(),
          title: faker.name.title(),
          shortContent: faker.lorem.paragraph(),
        },
      ];

      fakeSearchList = [...fakeSearchList, ...newSearchList];

      resolve({
        data: newSearchList,
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
          ...([...fakePostList, ...fakeSearchList].filter(it => postId === it.id)[0]),
          content: faker.lorem.paragraphs(),
        },
      });
    }, 800);
  });
}
