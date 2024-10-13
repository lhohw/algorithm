import { readFileSync } from "fs";

class Graph {
  private dist: number[][];
  private via: number[][];
  private adj: Set<number>[];

  constructor(private n: number, private m: number, private edges: number[][]) {
    const { dist, via, adj } = this.init(n, m, edges);
    this.dist = dist;
    this.via = via;
    this.adj = adj;
  }

  private init(n: number, m: number, edges: number[][]) {
    const dist = Array.from({ length: n }, () => new Array(n).fill(1 << 30));
    const via = Array.from({ length: n }, () => new Array(n).fill(-1));
    const adj = Array.from({ length: n }, () => new Set<number>());

    for (let i = 0; i < m; i++) {
      const [u, v, w] = edges[i];

      dist[u][v] = w;
      dist[v][u] = w;

      via[u][v] = v;
      via[v][u] = u;

      adj[u].add(v);
      adj[v].add(u);
    }

    for (let i = 0; i < n; i++) {
      dist[i][i] = 0;
    }

    return { dist, via, adj };
  }

  makePath() {
    const { n, dist, via } = this;

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            via[i][j] = via[i][k];
          }
        }
      }
    }
  }

  serialize() {
    const { via, n, adj } = this;

    const table = Array.from({ length: n }, () => new Array(n).fill("-"));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;

        let v = via[i][j];
        if (v === -1) continue;

        while (!adj[i].has(v)) {
          v = via[i][v];
        }

        table[i][j] = v + 1;
      }
    }

    return table.map((row) => row.join(" ")).join("\n");
  }
}

export const parseInput = (input: string) => {
  const edges = input
    .split("\n")
    .map((row) => row.trim().split(" ").map(Number));
  const [n, m] = edges.shift()!;

  for (let i = 0; i < m; i++) {
    edges[i][0]--;
    edges[i][1]--;
  }

  return { n, m, edges };
};

export const solve = (n: number, m: number, edges: number[][]) => {
  const graph = new Graph(n, m, edges);
  graph.makePath();
  return graph.serialize();
};

const print = () => {
  const input = readFileSync(0, "utf-8").toString().trim();
  const { n, m, edges } = parseInput(input);
  const ret = solve(n, m, edges);

  console.log(ret);
};

print();
