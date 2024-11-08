from queue import SimpleQueue

impossible = "IMPOSSIBLE"
dy = [-1, 0, 1, 0]
dx = [0, 1, 0, -1]

class Board:
  def __init__(self, n: int, m: int, board):
    self.n = n
    self.m = m
    self.board = board

  def isOut(self, y: int, x: int):
    n, m = self.n, self.m

    return y < 0 or y >= n or x < 0 or x >= m

  def isBlocked(self, y: int, x: int):
    land = self.get(y, x)
    return land == '#'

  def get(self, y: int, x: int):
    return self.board[y][x]
  
  def set(self, y: int, x: int, key: str):
    self.board[y][x] = key

def solve():
  n, m, _board = parseInput()
  board, jq, fq, visited = init(n, m, _board)
  ret = count(board, jq, fq, visited)

  if ret == -1:
    return impossible
  
  return str(ret)

def parseInput():
  n, m = map(int, input().split())
  board = list()

  for _ in range(n):
    board.append(list(input()))

  return n, m, board

def init(n: int, m: int, _board):
  jq = SimpleQueue()
  fq = SimpleQueue()
  board = Board(n, m, _board)
  visited = [[False] * m for _ in range(n)]

  for y in range(n):
    for x in range(m):
      key = board.get(y, x)

      if key == 'J':
        jq.put([y, x, 0])
        board.set(y, x, ".")
        visited[y][x] = True
      elif key == 'F':
        fq.put([y, x])
        board.set(y, x, "#")
  
  return board, jq, fq, visited

def count(board: Board, jq: SimpleQueue, fq: SimpleQueue, visited):
  while jq.qsize():
    spreadFire(fq, board)
    ret = move(jq, board, visited)
    if ret: return ret


  return -1

def move(jq: SimpleQueue, board: Board, visited):
  len = jq.qsize()

  for _ in range(len):
    [y, x, cnt] = jq.get()
    
    for d in range(4):
      ny = y + dy[d]
      nx = x + dx[d]


      if board.isOut(ny, nx):
        return cnt + 1
      if board.isBlocked(ny, nx) or visited[ny][nx]:
        continue

      jq.put([ny, nx, cnt + 1])
      visited[ny][nx] = True

def spreadFire(fq: SimpleQueue, board: Board):
  len = fq.qsize()

  for _ in range(len):
    [ y, x ] = fq.get()

    for d in range(4):
      ny = y + dy[d]
      nx = x + dx[d]

      if board.isOut(ny, nx) or board.isBlocked(ny, nx):
        continue

      fq.put([ny, nx])
      board.set(ny, nx, "#")

def log():
  ret = solve()
  print(ret)

log()


