// 1708: 볼록 껍질
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  type Point = {
    x: number;
    y: number;
  }
  let n: number;
  const coords: Point[] = [];
  const { atan2 } = Math;
  const deg = (angle: number) => ((angle * 180 / Math.PI) + 360) % 360;
  const ccw = (p1: Point, p2: Point, p3: Point) => {
    return (deg(atan2(p2.y - p1.y, p2.x - p1.x)) - deg(atan2(p3.y - p1.y, p3.x - p1.x))) < 0;
  };
  const solve = (coords: Point[]) => {
    let start: Point = { x: Infinity, y: Infinity };
    for (let i=0; i<n; i++) {
      const coord = coords[i];
      const { x, y } = coord;
      if (start.y > y) start = coord;
      else if (start.y == y && start.x > x) start = coord;
    }
    coords.sort((a, b) => {
      const diff = deg(atan2(a.y-start.y, a.x-start.x)) - deg(atan2(b.y-start.y, b.x-start.x));
      if (diff > 0) return 1;
      else if (diff < 0) return -1;
      else if (a.x > b.x) return 1;
      else if (a.x < b.x) return -1;
      return b.y - a.y;
    });
    const hull: Point[] = [];
    for (let i=0; i<n; i++) {
      if (hull.length <= 2) hull.push(coords[i]);
      else {
        while (hull.length >= 3 && !ccw(hull[hull.length-2], hull[hull.length-1], coords[i])) hull.pop();
        hull.push(coords[i]);
      }
    }
    let ret = hull.length;
    if (!ccw(hull[0], hull[1], hull[2])) ret--;
    if (!ccw(hull[hull.length-2], hull[hull.length-1], hull[0])) ret--;
    return ret.toString();
  }
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else {
      const [ x, y ] = input.split(' ').map(Number);
      coords.push({ x, y });
    }
  }).on('close', () => {
    const ret = solve(coords);
    console.log(ret);
  });
})();