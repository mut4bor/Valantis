export function useIsFetching(...args: boolean[]): boolean {
  return args.some((arg) => arg === true);
}
