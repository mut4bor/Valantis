export function useIsFetching(args: boolean[]) {
  return args.some((arg) => arg === true);
}
