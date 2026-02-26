import React from "react";
import "@fontsource/source-sans-3";
import "@fontsource/source-sans-3/700.css";
import "@fontsource/source-sans-3/400-italic.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";

import { createRoot, Root } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  ConfigCatProvider,
  createConsoleLogger,
  ILazyLoadingOptions,
  LogLevel,
  PollingMode,
} from "configcat-react";

import { Provider } from "react-redux";
import store from "./app/providers/redux/store";

import { App } from "./App";

const mount = (container: Element) => {
  const root: Root = createRoot(container);

  const options: ILazyLoadingOptions = {
    logger: createConsoleLogger(LogLevel.Info),
    cacheTimeToLiveSeconds: 1800,
  };

  root.render(
    <ConfigCatProvider
      sdkKey={process.env.SDK_CNFCT || ""}
      pollingMode={PollingMode.LazyLoad}
      options={options}
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ConfigCatProvider>,
  );
};

const e = document.getElementById("root");
if (e) {
  mount(e);
}
