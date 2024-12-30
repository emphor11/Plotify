import React, { useState } from "react";
import Plot from "react-plotly.js";
import "./App.css";


const scatterData = [
  { id: 1, x: 1, y: 2 },
  { id: 2, x: 2, y: 3 },
  { id: 3, x: 3, y: 4 },
  { id: 4, x: 4, y: 5 },
];

const lineData = [
  { id: 1, x: 1, y: 2 },
  { id: 2, x: 2, y: 3 },
  { id: 3, x: 3, y: 4 },
  { id: 4, x: 4, y: 5 },
];

const App = () => {
  const [highlightedPoint, setHighlightedPoint] = useState(null);

  
  const handleClick = (event, dataType) => {
    const pointIndex = event.points[0].pointIndex;
    const selectedData = dataType === "scatter" ? scatterData : lineData;
    const selectedPoint = selectedData[pointIndex];
    setHighlightedPoint(selectedPoint.id);
  };

  
  const scatterPlot = {
    type: "scatter",
    mode: "markers",
    x: scatterData.map(d => d.x),
    y: scatterData.map(d => d.y),
    marker: {
      color: scatterData.map(d =>
        highlightedPoint === d.id ? "red" : "blue"
      ),
      size: 12,
    },
    onClick: (event) => handleClick(event, "scatter"),
    name: "Scatter Plot",
  };

  
  const linePlot = {
    type: "scatter",
    mode: "lines+markers",
    x: lineData.map(d => d.x),
    y: lineData.map(d => d.y),
    line: {
      color: highlightedPoint ? "gray" : "green",
      width: 3,
    },
    onClick: (event) => handleClick(event, "line"),
    name: "Line Graph",
  };

  return (
    <div className="App">
      <h1>Interactive Scatter Plot and Line Graph</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Plot
          data={[scatterPlot]}
          layout={{
            title: "Scatter Plot",
            showlegend: false,
            xaxis: { title: "X" },
            yaxis: { title: "Y" },
          }}
          config={{ responsive: true }}
        />
        <Plot
          data={[linePlot]}
          layout={{
            title: "Line Graph",
            showlegend: false,
            xaxis: { title: "X" },
            yaxis: { title: "Y" },
          }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default App;
