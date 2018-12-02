import { BrowserLoggerFactory } from "./browser";
import { LoggerFactory } from "./core";

// setup default logger factory
LoggerFactory.factory = new BrowserLoggerFactory();
