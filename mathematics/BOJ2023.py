# 2023: 신기한 소수
from math import sqrt

class AmazingPrime:
  n = int(input())

  def isPrime(self, num):
    num = int(num)
    if (num == 1):
      return False
    if (num == 2):
      return True
    
    for i in range(2, int(sqrt(num)+1)):
      if (num % i == 0):
        return False
    return True

  def makePrime(self, key):
    if (len(key) == self.n):
      print(key)
      return
    for i in range(1, 10):
      next = key + str(i)
      if (self.isPrime(next)):
        self.makePrime(next)
  
  def solve(self):
    self.makePrime('')

AmazingPrime().solve()