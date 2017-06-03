// MIT © 2017 azu
"use strict";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Context, Dispatcher } from "almin";
import AlminReactContainer from "almin-react-container";
import { AppStoreGroup } from "./store/AppStoreGroup";
import { appLocator } from "./AppLocator";
import { AppContainer } from "./component/container/AppContainer";

const AlminLogger = require("almin-logger");
// instances
const dispatcher = new Dispatcher();
// context connect dispatch with stores
const context = new Context({
    dispatcher,
    store: AppStoreGroup.create()
});
if (process.env.NODE_ENV !== "production") {
    (window as any)["alminContext"] = context;
    const logger = new AlminLogger();
    logger.startLogging(context);
}
// set context to a single object.
appLocator.context = context;
// start render
const AppWrapContainer = AlminReactContainer.create<AppStoreGroup>(AppContainer, context);
ReactDOM.render(<AppWrapContainer />, document.getElementById("js-app"));