export class Level {

  public static readonly OFF = new Level("OFF", 0);
  public static readonly FATAL = new Level("FATAL", 100);
  public static readonly ERROR = new Level("ERROR", 200);
  public static readonly WARN = new Level("WARN", 300);
  public static readonly INFO = new Level("INFO", 400);
  public static readonly DEBUG = new Level("DEBUG", 500);
  public static readonly TRACE = new Level("TRACE", 600);
  public static readonly ALL = new Level("ALL", Number.POSITIVE_INFINITY);

  /** Non-localized name of the level. */
  public readonly name: string;

  /** Integer value of the level. */
  public readonly value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }

  /** @inheritDoc */
  toString() {
    return this.name;
  }

  /** @inheritDoc */
  valueOf() {
    return this.value;
  }
}
