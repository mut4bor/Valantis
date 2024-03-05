export function useAscendingNumberSort(arr: number[]): number[] {
  return arr.slice().sort((a, b) => a - b);
}
