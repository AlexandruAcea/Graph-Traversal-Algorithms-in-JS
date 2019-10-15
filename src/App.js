import React, { Component } from "react";

import EuropeMap from "./assets/euromap.webp";

import PriorityQueue from "js-priority-queue";

import Oras from "./Oras";

import "./css/indes.css";

class App extends Component {
  state = {
    orase: {
      bucuresti: { name: "bucuresti", x: 0, y: 0 },
      paris: { name: "paris", x: 0, y: 0 },
      roma: { name: "roma", x: 0, y: 0 },
      moscova: { name: "moscova", x: 0, y: 0 },
      berlin: { name: "berlin", x: 0, y: 0 },
      londra: { name: "londra", x: 0, y: 0 },
      oslo: { name: "oslo", x: 0, y: 0 }
    },
    graphInit: [
      //B  P  M  R  L  B  O
      [0, 0, 0, 1, 1, 0, 0], //0   Bucuresti
      [0, 0, 0, 0, 1, 0, 0], //1   Paris
      [0, 0, 0, 0, 0, 0, 0], //2   Moscova
      [1, 0, 0, 0, 0, 0, 0], //3   Roma
      [1, 1, 0, 0, 0, 1, 0], //4   Londra
      [0, 0, 0, 0, 1, 0, 1], //5   Berlin
      [0, 0, 0, 0, 0, 1, 0] //6    Oslo
    ],

    start: 0,

    dfsDisplay: ""
  };

  drawGraph = () => {
    const { graphInit } = this.state;

    let len = graphInit.length;

    const items = [];

    for (let i = 0; i < len; i++)
      for (let j = 0; j < len; j++) {
        if (graphInit[j][i]) items.push(this.drawLine(i, j));
      }
    return items;
  };

  drawLine = (i, j) => {
    const {
      bucuresti,
      paris,
      roma,
      moscova,
      berlin,
      londra,
      oslo
    } = this.state.orase;

    let city1 = {};
    let city2 = {};

    switch (i) {
      case 0:
        city1 = bucuresti;
        break;
      case 1:
        city1 = paris;
        break;
      case 2:
        city1 = moscova;
        break;
      case 3:
        city1 = roma;
        break;
      case 4:
        city1 = londra;
        break;
      case 5:
        city1 = berlin;
        break;
      case 6:
        city1 = oslo;
        break;
      default:
        city1 = bucuresti;
    }

    switch (j) {
      case 0:
        city2 = bucuresti;
        break;
      case 1:
        city2 = paris;
        break;
      case 2:
        city2 = moscova;
        break;
      case 3:
        city2 = roma;
        break;
      case 4:
        city2 = londra;
        break;
      case 5:
        city2 = berlin;
        break;
      case 6:
        city2 = oslo;
        break;
      default:
        city2 = bucuresti;
    }

    return (
      <svg id="svg" key={Math.random()}>
        <line id="line" x1={city1.x} x2={city2.x} y1={city1.y} y2={city2.y} />
      </svg>
    );
  };

  dls = (graph, start, end, limit) => {
    let sentinel = {};
    let visitedStack = [start];
    let path = [];

    while (visitedStack) {
      let currentVertex = visitedStack.pop();

      if (currentVertex === end) {
        path.push(currentVertex);
        return path.concat(" -> ", path);
      } else if (currentVertex === sentinel) {
        limit += 1;
        path.pop();
      } else if (limit !== 0) {
        limit -= 1;
        path.push(currentVertex);
        visitedStack.push(sentinel);
        visitedStack.ex;
      }
    }
  };

  bfs = (graph, root) => {
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
  };

  dfs = (graph, start) => {
    let dfsDisplay = "";

    let visited = [0, 0, 0, 0, 0, 0, 0];

    let stack = [start];

    visited[0] = 1;

    let node = stack.pop(stack.length - 1);
    console.log(this.interpretor(node));
    dfsDisplay = this.interpretor(node) + " ";

    while (1) {
      for (let i = 0; i < visited.length; i++)
        if (graph[node][i] === 1 && visited[i] === 0) {
          visited[i] = 1;
          stack.push(i);
        }
      if (stack.length === 0) break;
      else {
        node = stack.pop();
        console.log(this.interpretor(node));
        dfsDisplay = dfsDisplay.concat(this.interpretor(node), " ");
      }
    }
    return dfsDisplay;
  };

  componentDidMount() {
    this.setState({
      orase: {
        bucuresti: {
          ...this.state.bucuresti,
          x:
            this.bucRef.getBoundingClientRect().left +
            this.bucRef.getBoundingClientRect().width / 2,

          y:
            this.bucRef.getBoundingClientRect().top +
            this.bucRef.getBoundingClientRect().height / 2
        },

        paris: {
          ...this.state.paris,
          x:
            this.parRef.getBoundingClientRect().left +
            this.parRef.getBoundingClientRect().width / 2,
          y:
            this.parRef.getBoundingClientRect().top +
            this.parRef.getBoundingClientRect().height / 2
        },
        moscova: {
          ...this.state.moscova,
          x:
            this.mosRef.getBoundingClientRect().left +
            this.mosRef.getBoundingClientRect().width / 2,
          y:
            this.mosRef.getBoundingClientRect().top +
            this.mosRef.getBoundingClientRect().height / 2
        },
        roma: {
          ...this.state.roma,
          x:
            this.romRef.getBoundingClientRect().left +
            this.romRef.getBoundingClientRect().width / 2,
          y:
            this.romRef.getBoundingClientRect().top +
            this.romRef.getBoundingClientRect().height / 2
        },
        londra: {
          ...this.state.londra,
          x:
            this.lonRef.getBoundingClientRect().left +
            this.lonRef.getBoundingClientRect().width / 2,
          y:
            this.lonRef.getBoundingClientRect().top +
            this.lonRef.getBoundingClientRect().height / 2
        },
        berlin: {
          ...this.state.berlin,
          x:
            this.berRef.getBoundingClientRect().left +
            this.berRef.getBoundingClientRect().width / 2,
          y:
            this.berRef.getBoundingClientRect().top +
            this.berRef.getBoundingClientRect().height / 2
        },
        oslo: {
          ...this.state.oslo,
          x:
            this.oslRef.getBoundingClientRect().left +
            this.oslRef.getBoundingClientRect().width / 2,
          y:
            this.oslRef.getBoundingClientRect().top +
            this.oslRef.getBoundingClientRect().height / 2
        }
      }
    });
  }

  interpretor = input => {
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
  };

  render() {
    let list = this.bfs(this.state.graphInit, this.state.start);

    let startChar = this.interpretor(this.state.start);

    return (
      <div className="App">
        {this.drawGraph()}

        <h1 id="startTitle">{"Start: " + startChar}</h1>

        <ul>
          <li>
            <p>Breadth First Search</p>
          </li>
          <li>
            <br></br>
          </li>
          <li>
            <p>{"Bucuresti: " + list[0]}</p>
          </li>
          <li>
            <p>{"Paris: " + list[1]}</p>
          </li>
          <li>
            <p>{"Moscova: " + list[2]}</p>
          </li>
          <li>
            <p>{"Roma: " + list[3]}</p>
          </li>
          <li>
            <p>{"Londra: " + list[4]}</p>
          </li>
          <li>
            <p>{"Berlin: " + list[5]}</p>
          </li>
          <li>
            <p>{"Oslo: " + list[6]}</p>
          </li>
        </ul>

        <p id="dfsBoi">
          Depth First Search <br />
          <br />
          {this.dfs(this.state.graphInit, this.state.start)}
        </p>

        <h1 id="title1">Strategii de cautare neinformate</h1>
        <h2 id="subtitle1">Planificarea rutei cele mai scurte cu avionul</h2>
        <div className="map">
          <div className="mapOverlay">
            <div
              className="oras"
              id="Bucuresti"
              ref={el => {
                if (!el) return;
                this.bucRef = el;
              }}
              onClick={() => this.setState({ start: 0 })}
            >
              <h1 id="orasTitle">Bucuresti</h1>
              {/* <Oras bfs={this.bfs} dfs={this.dfs}></Oras> */}
            </div>
            <div
              className="oras"
              id="Paris"
              ref={el => {
                if (!el) return;
                this.parRef = el;
              }}
              onClick={() => this.setState({ start: 1 })}
            >
              {" "}
              <h1 id="orasTitle">Paris</h1>
            </div>
            <div
              className="oras"
              id="Moscova"
              ref={el => {
                if (!el) return;
                this.mosRef = el;
              }}
              onClick={() => this.setState({ start: 2 })}
            >
              {" "}
              <h1 id="orasTitle">Moscova</h1>
            </div>
            <div
              className="oras"
              id="Londra"
              ref={el => {
                if (!el) return;
                this.lonRef = el;
              }}
              onClick={() => this.setState({ start: 4 })}
            >
              {" "}
              <h1 id="orasTitle">Londra</h1>
            </div>
            <div
              className="oras"
              id="Roma"
              ref={el => {
                if (!el) return;
                this.romRef = el;
              }}
              onClick={() => this.setState({ start: 3 })}
            >
              {" "}
              <h1 id="orasTitle">Roma</h1>
            </div>
            <div
              className="oras"
              id="Berlin"
              ref={el => {
                if (!el) return;
                this.berRef = el;
              }}
              onClick={() => this.setState({ start: 5 })}
            >
              {" "}
              <h1 id="orasTitle">Berlin</h1>
            </div>
            <div
              className="oras"
              id="Oslo"
              ref={el => {
                if (!el) return;
                this.oslRef = el;
              }}
              onClick={() => this.setState({ start: 6 })}
            >
              {" "}
              <h1 id="orasTitle">Oslo</h1>
            </div>
          </div>
          <img src={EuropeMap} alt="" />
        </div>
      </div>
    );
  }
}

export default App;
