type Distribute<U> = U extends any ? keyof U : never;

export function typedKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Distribute<T>[];
}

export function typedEntries<T extends {}>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
