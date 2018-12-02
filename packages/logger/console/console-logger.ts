import { format } from "util";
import { AbstractLogger, Level } from "../";

const buffer: any[] = [];

export interface ConsoleLoggerOptions {

  /** Whether to include current time in output message. */
  showTime: boolean;

  /** Whether to include logging level in output message. */
  showLevel: boolean;

  /** Whether to include logger name in output message. */
  showName: boolean;
}

/**
 * Logger that writes messages to the {@link console}.
 */
export class ConsoleLogger extends AbstractLogger {

  /** Logging options of this logger. */
  public readonly options: ConsoleLoggerOptions;

  constructor(name: string, level?: Level, options?: Partial<ConsoleLoggerOptions>) {
    super(name, level);
    this.options = {
      showTime: true,
      showLevel: true,
      showName: true,
      ...options,
    };
  }

  /** @inheritDoc */
  log(level: Level, ...args: any[]): void {

    // format
    if (isFormatString(args[0])) {
      args[0] = format.apply(void 0, args);
      args.length = 1;
    }

    try {
      // time?
      if (this.options.showTime)
        buffer.push(new Date().toISOString().substring(11, 23));

      // level?
      if (this.options.showLevel)
        buffer.push(this.level.name);

      // name?
      if (this.options.showName)
        buffer.push(this.name);

      // compose prefix
      if (buffer.length > 0) {
        buffer[0] = `${buffer.join(" ")}:`;
        buffer.length = 1;
      }

      // compose message
      buffer.push.apply(buffer, args);

      switch (level) {
        case Level.FATAL:
        case Level.ERROR:
          log(console.error, args);
          return;

        case Level.INFO:
          log(console.trace, args);
          break;

        case Level.TRACE:
          log(console.trace, args);
          return;

        default:
          log(console.debug, args);
          return;
      }

    } finally {
      buffer.length = 0;
    }
  }
}

function isFormatString(value: any): value is string {
  return typeof value === "string"
    && value.indexOf("%") >= 0;
}

function log(log: Function, args: any[]): void {
  log.apply(console, args);
}
