export function bfs(graph, root) {
  var nodesLen = {};

  for (var i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  nodesLen[root] = 0;

  var queue = [root];
  var current;

  while (queue.length !== 0) {
    current = queue.shift();

    var curConnected = graph[current];
    var neighborIdx = [];
    var idx = curConnected.indexOf(1);
    while (idx !== -1) {
      neighborIdx.push(idx);
      idx = curConnected.indexOf(1, idx + 1);
    }

    for (var j = 0; j < neighborIdx.length; j++) {
      if (nodesLen[neighborIdx[j]] === Infinity) {
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
        queue.push(neighborIdx[j]);
      }
    }
  }
  return nodesLen;
}

export function dfs(graph, start) {
  let dfsDisplay = "";

  let visited = [0, 0, 0, 0, 0, 0, 0];

  let stack = [start];

  visited[0] = 1;

  let node = stack.pop(stack.length - 1);

  dfsDisplay = interpretor(node) + " ";

  while (1) {
    for (let i = 0; i < visited.length; i++)
      if (graph[node][i] === 1 && visited[i] === 0) {
        visited[i] = 1;
        stack.push(i);
      }
    if (stack.length === 0) break;
    else {
      node = stack.pop();

      dfsDisplay = dfsDisplay.concat(interpretor(node), " ");
    }
  }
  return dfsDisplay;
}

export function dls(graph, start, max_depth) {
  let show = "";

  let stack = [];

  let numberOfNodes = graph.length;

  let visited = [0, 0, 0, 0, 0, 0, 0];
  let element;
  let destination;
  let depth = 0;

  stack.push(start);
  visited[start] = 1;
  depth = 0;

  while (stack.length !== 0) {
    element = stack[stack.length - 1];

    destination = element;

    while (destination <= numberOfNodes) {
      if (depth < max_depth) {
        if (graph[element][destination] === 1 && visited[destination] === 0) {
          stack.push(destination);
          visited[destination] = 1;
          depth++;

          console.log(interpretor(destination) + " at depth " + depth);

          show = show.concat(
            interpretor(destination) + " at depth " + depth,
            "\n"
          );

          element = destination;
          destination = 1;
        }
      } else {
        return;
      }
      destination++;
    }
    stack.pop();
    depth--;
  }

  return show;
}

export function interpretor(input) {
  let output = "";
  switch (input) {
    case 0:
      output = "Bucuresti";
      break;
    case 1:
      output = "Paris";
      break;
    case 2:
      output = "Moscova";
      break;
    case 3:
      output = "Roma";
      break;
    case 4:
      output = "Londra";
      break;
    case 5:
      output = "Berlin";
      break;
    case 6:
      output = "Oslo";
      break;
    default:
      output = "Bucuresti";
  }
  return output;
}
