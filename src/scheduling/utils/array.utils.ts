export const uniqueFilter = <T>(a: T[]): T[] => {
  return a.filter(
    (o, i) =>
      i === a.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(o))
  );
};
