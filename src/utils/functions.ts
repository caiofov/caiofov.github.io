export function typedKeys<T extends {}>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function typedEntries<T extends {}>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
