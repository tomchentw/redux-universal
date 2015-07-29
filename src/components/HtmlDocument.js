import React, { PropTypes } from "react";
import serialize from "serialize-javascript";

export default class HtmlDocument extends React.Component {

  static propTypes = {
    state: PropTypes.object.isRequired,
    markup: PropTypes.string.isRequired,
    webpackStats: PropTypes.object.isRequired,
  }

  render() {
    const {state, markup, webpackStats} = this.props;
    const dehydratedState = "window.$STATE=" + serialize(state);

    const style = [].concat(
      webpackStats.main.css
    );

    const script = [].concat(
      webpackStats.vendor.js,
      webpackStats.main.js
    );

    return (
      <html lang="en">
        <head prefix="og: http://ogp.me/ns#">
          <meta charSet="utf-8"/>
          <title>{state.AppReducer.fullTitle}</title>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta property="og:title" content={state.AppReducer.fullTitle}/>
          <meta property="og:image" content=""/>
          <meta property="og:site_name" content=""/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content=""/>
          <link rel="canonical" href=""/>
          {style.map((href, key) => <link rel="stylesheet" type="text/css" href={href} key={key}/>)}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}}/>
          <script dangerouslySetInnerHTML={{__html: dehydratedState}}/>
          {script.map((src, key) => <script src={src} key={key} defer/>)}
        </body>
      </html>
    );
  }
}
