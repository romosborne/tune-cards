import { Metre, Tune } from '../types'

const metres: Record<Metre, string> = {
  [Metre.Reel]: '4/4',
  [Metre.Reel48]: '4/4',
  [Metre.Jig]: '6/8',
  [Metre.Jig48]: '6/8',
  [Metre.SlipJig]: '9/8',
  [Metre.Square]: '4/4',
  [Metre.Waltz]: '3/4',
}

export function expandAbc(t: Tune): string {
  let abc = 'X:1\n'

  abc += `K:${t.key}\n`

  abc += `M:${metres[t.metre]}\n`

  return abc + t.hint
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce(
    (groups, item) => {
      ;(groups[key(item)] ||= []).push(item)
      return groups
    },
    {} as Record<K, T[]>,
  )
