export function useConvertStringToNumber(arr: (string | number)[]): number[] {
  return arr.map((item) =>
    typeof item === 'string' ? parseFloat(item) : item
  );
}
