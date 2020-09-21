export function repeat(fn: () => Promise<void>, interval: number) {
  setTimeout(async () => {
    await fn()
    repeat(fn, interval)
  }, interval)
}
