export type Maybe<T> = null | undefined | T

export type IResponseListener = (info: {
  name: string
  query: string
  variables: any
  response?: { data: any; warnings: any; headers: any; status: number; errors: any }
  error?: any
}) => void

export type Projection<S, B, E = unknown> = B extends Array<infer W>
  ? W extends Date | string | number | boolean | null | undefined | E
    ? W[]
    : Projection<S, W, E>[]
  : B extends Date | string | number | boolean | null | undefined | E
  ? B
  : {
      [k in keyof S & keyof B]: S[k] extends boolean
        ? B[k]
        : B[k] extends Array<infer A>
        ? Projection<S[k], A, E>[]
        : Projection<S[k], B[k], E>
    }

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T

export type Replacement<M extends [any, any], T> =
  M extends any ? [T] extends [M[0]] ? M[1] : never : never;

export type DeepReplace<T, Ignore, M extends [any, any]> = {
  [P in keyof T]: T[P] extends M[0]
    ?  T[P] extends Ignore ? T[P] extends object
      ? DeepReplace<T[P], Ignore, M>
      : T[P] : Replacement<M, T[P]>
    : T[P] extends object
      ? DeepReplace<T[P], Ignore, M>
      : T[P];
}
