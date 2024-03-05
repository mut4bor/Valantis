export function useAlphabeticalSort(arr: (string | null)[]): (string | null)[] {
  const nulls: (string | null)[] = arr.filter((word) => word === null);

  const words: string[] = arr.filter((word) => word !== null) as string[];

  const compareFunction = (a: string, b: string) =>
    a.localeCompare(b, 'ru', { sensitivity: 'base' });

  const englishWords: string[] = words
    .filter((word) => /^[a-zA-Z]/.test(word))
    .sort();

  const russianWords: string[] = words
    .filter((word) => !/^[a-zA-Z]/.test(word))
    .sort(compareFunction);

  return [...nulls, ...englishWords, ...russianWords];
}
