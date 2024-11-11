from sys import stdin
read = stdin.readline

t, w = map(int, read().split())
treeIdx = [int(read()) - 1 for _ in range(t)]
cache = [[-1] * (w+1) for _ in range(t)]

def fall(i: int, move: int):
  if i == t: return 0

  here = move % 2
  fallen = treeIdx[i]
  isHere = fallen == here
  ret = fall(i+1, move) + isHere

  if cache[i][move] != -1:
    return cache[i][move]

  if move == w:
    cache[i][move] = ret
    return ret

  if not isHere:
    ret = max(ret, fall(i+1, move+1) + 1)
  
  cache[i][move] = ret
  return ret

print(fall(0, 0))