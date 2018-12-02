import { Level } from "./level";

export interface Logger {

  /** Level of message to allow for logging. */
  level: Level;

  /** Name of this logger instance. */
  readonly name: string;

  readonly isTrace: boolean;
  trace(pattern: string, ...args: any[]): void;
  trace(...args: any[]): void;

  readonly isDebug: boolean;
  debug(pattern: string, ...args: any[]): void;
  debug(...args: any[]): void;

  readonly isInfo: boolean;
  info(pattern: string, ...args: any[]): void;
  info(...args: any[]): void;

  readonly isWarn: boolean;
  warn(pattern: string, ...args: any[]): void;
  warn(...args: any[]): void;

  readonly isError: boolean;
  error(pattern: string, ...args: any[]): void;
  error(...args: any[]): void;

  readonly isFatal: boolean;
  fatal(pattern: string, ...args: any[]): void;
  fatal(...args: any[]): void;

  isLevel(level: Level);
  log(level: Level, pattern: string, ...args: any[]);
  log(level: Level, ...args: any[]);
}
