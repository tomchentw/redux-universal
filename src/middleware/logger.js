export default function loggerMiddleware ({ getState }) {
  return next => action => {
    if ("production" !== process.env.NODE_ENV) {
      console.log("action", action);
      console.log("state", getState());
    }
    next(action);
  };
}
