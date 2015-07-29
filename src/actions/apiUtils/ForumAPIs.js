// import fetch from "isomorphic-fetch";
import faker from "faker";

const fakeForumList = [
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
  {
    id: faker.random.uuid(),
    title: faker.name.title(),
  },
];

export function fetchForumList() {
  // Normally you should just return fetch("/api/forums/") ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: fakeForumList,
      });
    }, 800);
  });
}
