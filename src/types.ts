export type UUID = string
export type IDate = Date | string
export type Maybe<T> = null | undefined | T

export type Projection<S, B> = B extends Array<infer W>
  ? W extends UUID | IDate | string | number | boolean | null | undefined
    ? W[]
    : Projection<S, W>[]
  : {
      [k in keyof S & keyof B]: S[k] extends boolean
        ? B[k]
        : B[k] extends Array<infer A>
        ? Projection<S[k], A>[]
        : Projection<S[k], B[k]>
    }

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T