# Redux-Universal


## Features

- [Universal JavaScript]
- [React-Router]
- Reactive Programming
- Webpack Server Bundling
- Async Data
- [Immutable] Data Structure
- An of course, integration with [Redux]


## Medium Post

I'd like to share some ideas found in the repo, here you go:

* [Redux-Universal](https://medium.com/@tomchentw/redux-universal-576fb9475b5b)


## Usage

```sh
npm install
```

### Development

```sh
npm run dev
```

It will start:

- [express] server at port 3000
- [webpack-dev-server] at port 8080

Please visit [http://localhost:3000/] to get the page.

### Production

Into two steps, first is build webpack assets:

```sh
npm run build
```

Then, start [express] server:

```sh
npm start
```


## Credits

- [@tommy351]: Original creator of this repo
- [@emmenko]: for decorator idea in [redux-react-router-async-example]


[Universal JavaScript]: https://medium.com/@mjackson/universal-javascript-4761051b7ae9
[React-Router]: https://github.com/rackt/react-router
[Immutable]: http://facebook.github.io/immutable-js/
[Redux]: https://github.com/gaearon/redux
[express]: http://expressjs.com/
[webpack-dev-server]: http://webpack.github.io/docs/webpack-dev-server.html
[@tommy351]: https://github.com/tommy351
[@emmenko]: https://github.com/emmenko
[redux-react-router-async-example]: https://github.com/emmenko/redux-react-router-async-example
