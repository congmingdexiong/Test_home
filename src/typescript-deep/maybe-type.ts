type Maybe<T> = NonNullable<T> | undefined;

function convertToMaybe<T extends unknown>(value: T): Maybe<T> {
  return value ?? undefined;
}

console.log(convertToMaybe(null));
console.log(convertToMaybe(undefined));
console.log(convertToMaybe(""));
console.log(convertToMaybe(0));
