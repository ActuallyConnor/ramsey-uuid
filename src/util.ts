export const strcmp = (string1: string, string2: string) => {
  return (string1 ?? 0).toString().localeCompare((string2 ?? 0).toString());
};
