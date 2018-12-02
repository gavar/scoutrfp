import { Level } from "./level";
import { Logger } from "./logger";

/**
 * Base class for loggers for ease of implementation.
 */
export abstract class AbstractLogger implements Logger {

  /** @inheritDoc */
  readonly name: string;

  /** @inheritDoc */
  readonly level: Level;

  constructor(name: string, level?: Level) {
    this.name = name;
    this.level = level || Level.INFO;
  }

  /** @inheritDoc */
  get isTrace(): boolean {
    return this.level >= Level.TRACE;
  }

  /** @inheritDoc */
  get isDebug(): boolean {
    return this.level >= Level.DEBUG;
  }

  /** @inheritDoc */
  get isInfo(): boolean {
    return this.level >= Level.INFO;
  }

  /** @inheritDoc */
  get isWarn(): boolean {
    return this.level >= Level.WARN;
  }

  /** @inheritDoc */
  get isError(): boolean {
    return this.level >= Level.ERROR;
  }

  /** @inheritDoc */
  get isFatal(): boolean {
    return this.level >= Level.FATAL;
  }

  /** @inheritDoc */
  isLevel(level: Level): boolean {
    return this.level >= level;
  }

  /** @inheritDoc */
  trace(...args: any[]): void {
    args.unshift(Level.TRACE);
    this.log.apply(this, args);
  }

  /** @inheritDoc */
  debug(...args: any[]): void {
    args.unshift(Level.DEBUG);
    this.log.apply(this, args);
  }

  /** @inheritDoc */
  info(...args: any[]): void {
    args.unshift(Level.INFO);
    this.log.apply(this, args);
  }

  /** @inheritDoc */
  warn(...args: any[]): void {
    args.unshift(Level.WARN);
    this.log.apply(this, args);
  }

  /** @inheritDoc */
  error(...args: any[]): void {
    args.unshift(Level.ERROR);
    this.log.apply(this, args);
  }

  /** @inheritDoc */
  fatal(...args: any[]): void {
    args.unshift(Level.FATAL);
    this.log.apply(this, args);
  }

  /** @inheritDoc */
  abstract log(level: Level, ...args: any[])
}
