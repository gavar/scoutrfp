import { format } from "util";
import { Level, Logger } from "../";

/** Logger specially optimized for browsers. */
export class BrowserLogger implements Logger {

  /** @inheritDoc */
  readonly name: string;

  /** @inheritDoc */
  readonly level: Level;

  /** @inheritDoc */
  readonly isTrace: boolean;

  /** @inheritDoc */
  readonly isDebug: boolean;

  /** @inheritDoc */
  readonly isInfo: boolean;

  /** @inheritDoc */
  readonly isWarn: boolean;

  /** @inheritDoc */
  readonly isError: boolean;

  /** @inheritDoc */
  readonly isFatal: boolean;

  constructor(name: string, level?: Level) {
    this.name = name;
    this.level = level = level || Level.INFO;
    if (level >= Level.FATAL) this.isFatal = true;
    if (level >= Level.ERROR) this.isError = true;
    if (level >= Level.WARN) this.isWarn = true;
    if (level >= Level.INFO) this.isInfo = true;
    if (level >= Level.DEBUG) this.isDebug = true;
    if (level >= Level.TRACE) this.isTrace = true;
  }

  /** @inheritDoc */
  trace(...args: any[]): void {
    if (this.level >= Level.TRACE)
      print(console.trace, args);
  }

  /** @inheritDoc */
  debug(...args: any[]): void {
    if (this.level >= Level.DEBUG)
      print(console.debug, args);
  }

  /** @inheritDoc */
  info(...args: any[]): void {
    if (this.level >= Level.INFO)
      print(console.log, args);
  }

  /** @inheritDoc */
  warn(...args: any[]): void {
    if (this.level >= Level.WARN)
      print(console.warn, args);
  }

  /** @inheritDoc */
  error(...args: any[]): void {
    if (this.level >= Level.ERROR)
      print(console.error, args);
  }

  /** @inheritDoc */
  fatal(...args: any[]): void {
    if (this.level >= Level.FATAL)
      print(console.error, args);
  }

  /** @inheritDoc */
  isLevel(level: Level): boolean {
    return this.level >= level;
  }

  /** @inheritDoc */
  log(level: Level, ...args: any[]): void {
    if (this.level >= level)
      switch (level) {
        case Level.FATAL:
        case Level.ERROR:
          print(console.error, args);
          break;
        case Level.WARN:
          print(console.warn, args);
          break;
        case Level.INFO:
        case Level.DEBUG:
          print(console.log, args);
          break;
        case Level.TRACE:
          print(console.trace, args);
          break;
      }
  }
}

function isFormatString(value: any): value is string {
  return typeof value === "string"
    && value.indexOf("%") >= 0;
}

function print(log: Function, args: any[]) {
  if (isFormatString(args[0])) {
    args[0] = format.apply(void 0, args);
    args.length = 1;
  }
  log.apply(console, args);
}
