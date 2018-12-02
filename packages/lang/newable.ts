/**
 * Represents an object, where constructor have same amount of arguments, as number of non-void generic arguments.
 * @template R - type of the object constructor initializes.
 */
export type Newable<R = any, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void>
  = T1 extends void ? Newable.$0<R>
  : T2 extends void ? Newable.$1<R, T1>
    : T3 extends void ? Newable.$2<R, T1, T2>
      : T4 extends void ? Newable.$3<R, T1, T2, T3>
        : T5 extends void ? Newable.$4<R, T1, T2, T3, T4>
          : Newable.$5<R, T1, T2, T3, T4, T5>
  ;

export namespace Newable {
  export type $<R = any> = $$.Newable<R>;
  export type $$<R = any> = $$.Newable<R>;
  export type $0<R = any> = $0.Newable<R>;
  export type $1<R, T1> = $1.Newable<R, T1>;
  export type $2<R, T1, T2> = $2.Newable<R, T1, T2>;
  export type $3<R, T1, T2, T3> = $3.Newable<R, T1, T2, T3>;
  export type $4<R, T1, T2, T3, T4> = $4.Newable<R, T1, T2, T3, T4>;
  export type $5<R, T1, T2, T3, T4, T5> = $5.Newable<R, T1, T2, T3, T4, T5>;

  namespace $$ { export type Newable<R> = new (...args: any[]) => R; }
  namespace $0 { export type Newable<R> = new () => R; }
  namespace $1 { export type Newable<R, T1> = new ($1: T1) => R; }
  namespace $2 { export type Newable<R, T1, T2> = new ($1: T1, $2: T2) => R; }
  namespace $3 { export type Newable<R, T1, T2, T3> = new ($1: T1, $2: T2, $3: T3) => R; }
  namespace $4 { export type Newable<R, T1, T2, T3, T4> = new ($1: T1, $2: T2, $3: T3, $4: T4) => R; }
  namespace $5 { export type Newable<R, T1, T2, T3, T4, T5> = new ($1: T1, $2: T2, $3: T3, $4: T4, $5: T5) => R; }
}
