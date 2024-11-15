from random import random
from sys import stdin
read = stdin.readline

class TreapNode:
  priority: int
  key: int
  count = 1
  nodeCount = 1
  left: "TreapNode" = None
  right: "TreapNode" = None

  def __init__(self, key: int, count = 1):
    self.key = key
    self.count = count
    self.nodeCount = count
    self.priority = random()
  
  def setLeft(self, left: "TreapNode"):
    self.left = left
    self.setNodeCount()

  def setRight(self, right: "TreapNode"):
    self.right = right
    self.setNodeCount()
  
  def setNodeCount(self):
    self.nodeCount = self.count + self.getLeftNodeCount() + self.getRightNodeCount()
  
  def getLeftNodeCount(self):
    if self.left: return self.left.nodeCount
    return 0

  def getRightNodeCount(self):
    if self.right: return self.right.nodeCount
    return 0


class Treap:
  root: TreapNode | None = None
  keySet = set()

  def push(self, key: int, count: int):
    def _push(root: TreapNode | None, node: TreapNode):
      if root == None: return node

      root.nodeCount += count

      if (node.key not in self.keySet) and (root.priority < node.priority):
        [left, right] = self.__split(root, node.key)
        node.setLeft(left)
        node.setRight(right)

        return node
      elif root.key == node.key:
        root.count += node.count
        
        if root.count == 0:
          return self.__delete(root)

        return root

      if root.key > node.key:
        left = _push(root.left, node)
        root.setLeft(left)
      else:
        right = _push(root.right, node)
        root.setRight(right)

      return root

    self.root = _push(self.root, TreapNode(key, count))
    self.keySet.add(key)
  
  def __split(self, root: TreapNode | None, key: int):
    if root == None: return [None, None]

    if root.key < key:
      left = root
      [rl, rr] = self.__split(root.right, key)
      left.setRight(rl)

      return [left, rr]
    else:
      right = root
      [ll, lr] = self.__split(root.left, key)
      right.setLeft(lr)

      return [ll, right]
  
  def __delete(self, node: TreapNode):
    self.keySet.remove(node.key)
    return self.__merge(node.left, node.right)

  def __merge(self, left: TreapNode | None, right: TreapNode | None):
    if left == None: return right
    if right == None: return left

    if left.priority < right.priority:
      root = right
      l = self.__merge(left, root.left)
      root.setLeft(l)
    else:
      root = left
      r = self.__merge(left.right, right)
      root.setRight(r)

    return root

  def nth(self, rank: int):
    def _nth(root: TreapNode, n: int):
      rootCnt = root.count
      leftCnt = root.getLeftNodeCount()

      if n <= leftCnt: return _nth(root.left, n)
      elif n <= leftCnt + rootCnt: return root
      return _nth(root.right, n - leftCnt - rootCnt)
    
    return _nth(self.root, rank)
  

class Commander:
  treap = Treap()
  output: list[int] = []

  def getOutput(self):
    return "\n".join(map(str, self.output))
  
  def pop(self, rank: int):
    target = self.treap.nth(rank)
    self.push(target.key, -1)
    self.output.append(target.key)

  def push(self, flavor: int, count: int):
    self.treap.push(flavor, count)

def solve():
  n = int(read())
  commander = Commander()

  for _ in range(n):
    input = read().split()

    if len(input) == 2:
      _, rank = map(int, input)
      commander.pop(rank)
    else:
      _, flavor, count = map(int, input)
      commander.push(flavor, count)
    
  return commander.getOutput()

ret = solve()
print(ret)