from sys import stdin
read = stdin.readline

n = int(input())
cache = [[[-1] * (1 << 10) for _ in range(10)] for _ in range(n - 1)]
MOD = 1_000_000_000

def solve(n: int):
  if n < 10: return 0

  ret = 0
  for i in range(1, 10):
    ret = (ret + getStairNumber(0, i, 1 << i)) % MOD
  
  return ret

def getStairNumber(idx: int, here: int, state: int):
  if idx == n-1: return state == (1 << 10) - 1

  ret = cache[idx][here][state]
  if ret != -1: return ret

  ret = 0
  nextIdx = idx + 1

  if here:
    next = here - 1
    nextState = state | (1 << next)
    ret = (ret + getStairNumber(nextIdx, next, nextState)) % MOD

  if (here != 9):
    next = here + 1
    nextState = state | (1 << next)
    ret = (ret + getStairNumber(nextIdx, next, nextState)) % MOD

  cache[idx][here][state] = ret
  return ret

print(solve(n))