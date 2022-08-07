// 2056: 작업
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  class Task {
    time: number = 0;
    children: Task[] = [];
    prerequisite: number = 0;
    constructor(public key: number) {}
  }
  let n: number, i = 0;
  let tree: Task[];
  let times: number[];

  const dfs = (node: Task, visited: boolean[], sortedArray: Task[]) => {
    const { key, children } = node;
    if (visited[key]) return;
    visited[key] = true;
    for (let i=0; i<children.length; i++) {
      const child = children[i];
      dfs(child, visited, sortedArray);
    }
    sortedArray.push(node);
  }
  const topologicalSort = () => {
    const visited = new Array(n).fill(false);
    const sortedArray: Task[] = [];
    for (let i=0; i<n; i++) dfs(tree[i], visited, sortedArray);
    return sortedArray.reverse();
  }
  const solve = (sortedArray: Task[]) => {
    let minTime = -Infinity;

    for (let i=0; i<sortedArray.length; i++) {
      const here = sortedArray[i];
      const { key, children } = here;
      minTime = Math.max(minTime, times[key]);
      children.forEach((child) => {
        const { key: childKey, time } = child;
        times[childKey] = Math.max(times[childKey], times[key] + time);
      });
    }
    return minTime;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) {
      n = +input;
      tree = new Array(n).fill(undefined).map((_, i) => new Task(i));
      times = new Array(n).fill(undefined);
    }
    else {
      const [ time, cnt, ...prerequisite ] = input.split(' ').map(Number);
      times[i] = time;
      tree[i].time = time;
      tree[i].prerequisite = cnt;
      prerequisite.forEach(pre => tree[pre-1].children.push(tree[i]));
      i++;
    }
  }).on('close', () => {
    const sortedArray = topologicalSort();
    const ret = solve(sortedArray);
    console.log(ret.toString());
    process.exit();
  });
})();