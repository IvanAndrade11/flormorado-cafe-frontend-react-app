import React from "react";
import "@fontsource/source-sans-3";
import "@fontsource/source-sans-3/700.css";
import "@fontsource/source-sans-3/400-italic.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";

import { createRoot, Root } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import {
  ConfigCatProvider,
  createConsoleLogger,
  IAutoPollOptions,
  LogLevel,
  PollingMode,
} from "configcat-react";

import { Provider } from "react-redux";
import store from "./app/providers/redux/store";

import { App } from "./App";

const mount = (container: Element) => {
  const root: Root = createRoot(container);

  const options: IAutoPollOptions = {
    logger:
      process.env.NODE_ENV === "development"
        ? createConsoleLogger(LogLevel.Info)
        : undefined,
    pollIntervalSeconds: 10,
    maxInitWaitTimeSeconds: 2,
  };

  root.render(
    <ConfigCatProvider
      sdkKey={process.env.SDK_CNFCT || ""}
      pollingMode={PollingMode.AutoPoll}
      options={options}
    >
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </ConfigCatProvider>,
  );
};

const e = document.getElementById("root");
if (e) {
  mount(e);
}
