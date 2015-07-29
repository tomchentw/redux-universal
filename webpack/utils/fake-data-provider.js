import webpack from "webpack";
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

const fakePostSearchList = [
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

// This is a hack so that in both server side and client side,
// we will have the same data
export default new webpack.DefinePlugin({
  "global.fakeForumList": JSON.stringify(fakeForumList),
  "global.fakePostList": JSON.stringify(fakePostList),
  "global.fakePostSearchList": JSON.stringify(fakePostSearchList),
});
