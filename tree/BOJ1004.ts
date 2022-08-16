// 1004: 어린 왕자
(function() {
  type Point = { x: number; y: number; }
  type Planet = Point & { r: number };
  let t: number;
  let n: number = 0;
  let ret = '';
  class _Node {
    planet: Planet;
    children: _Node[] = [];
    depth = 0;
    idx: number;
    parent: _Node = this;
    constructor(idx: number, planet: Planet) {
      this.planet = planet;
      this.idx = idx;
    }
  }
  const dist = (p1: Point, p2: Point) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }
  const isIncluded = (child: Planet | Point, parent: Planet) => {
    if ('r' in child) return (dist(child, parent) + child.r) < parent.r;
    return dist(child, parent) < parent.r;
  }
  const isChild = (child: Planet, parent: Planet, planets: Planet[]) => {
    if (!isIncluded(child, parent)) return false;
    for (let i=0; i<planets.length; i++) {
      const planet = planets[i];
      if (isIncluded(child, planet) && isIncluded(planet, parent)) return false;
    }
    return true;
  }
  const makeTree = (planets: Planet[]) => {
    const tree: _Node[] = planets.map((planet, i) => new _Node(i, planet));
    for (let i=0; i<planets.length; i++) {
      for (let j=0; j<planets.length; j++) {
        if (i == j) continue;
        if (isChild(planets[i], planets[j], planets)) {
          tree[j].children.push(tree[i]);
          tree[i].parent = tree[j];
        }
      }
    }
    return tree;
  }
  const findClosestPlanet = (p: Point, planets: Planet[]) => {
    let closest = planets[0];
    let closestIdx = 0;
    for (let i=1; i<planets.length; i++) {
      const planet = planets[i];
      if (isIncluded(p, planet) && isIncluded(planet, closest)) {
        closest = planet;
        closestIdx = i;
      }
    }
    return closestIdx;
  }
  const count = (departure: Point, destination: Point, planets: Planet[]) => {
    const tree = makeTree(planets);
    const q = [ tree[0] ];
    while (q.length) {
      const node = q.shift();
      const { children, depth } = node!;
      children.forEach(child => {
        child.depth = depth + 1;
        q.push(child);
      });
    }
    let totalDist = 0;
    let u = tree[findClosestPlanet(departure, planets)],
        v = tree[findClosestPlanet(destination, planets)];
    if (u.depth > v.depth) [ u, v ] = [ v, u ];
    while (u.depth != v.depth) {
      totalDist++;
      v = v.parent;
    }
    while (u != v) {
      totalDist += 2;
      u = u.parent;
      v = v.parent;
    }
    return totalDist;
  }
  const init = (input: string[]): [ Point, Point, Planet[] ] => {
    const planets: Planet[] = [];
    const [ x1, y1, x2, y2 ] = input.shift()!.split(' ').map(Number);
    const departure: Point = { x: x1, y: y1 };
    const destination: Point = { x: x2, y: y2 };
  
    planets.push({ x: 0, y: 0, r: 3000 });
    
    n = +input.shift()!;
    for (let i=0; i<n; i++) {
      const [ x, y, r ] = input.shift()!.split(' ').map(Number);
      planets.push({ x, y, r });
    }
    return [ departure, destination, planets ];
  }
  
  const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
  t = +input.shift();
  while (t--) {
    const [ departure, destination, planets ] = init(input);
    ret += count(departure, destination, planets) + '\n';
  }
  console.log(ret.trimEnd());
})();