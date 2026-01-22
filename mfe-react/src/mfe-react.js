import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App";


const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById("single-spa-application:mfe-react-app"),
  errorBoundary(err, info, props) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h2>React Micro Frontend Error</h2>
        <p>{err.message}</p>
      </div>
    );
  },
});

// Export lifecycle methods that single-spa expects
export const { bootstrap, mount, unmount } = lifecycles;
