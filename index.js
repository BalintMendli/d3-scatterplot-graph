document.addEventListener("DOMContentLoaded", () => {
  d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  ).then(data => {
    const points = [];
    data.forEach(element => {
      points.push([
        element.Year,
        new Date(
          0,
          0,
          0,
          0,
          element.Time.split(":")[0],
          element.Time.split(":")[1]
        ),
        element.Doping
      ]);
    });
    console.log(points);
    d3.select("#container")
      .append("h1")
      .text("Doping in Professional Bicycle Racing")
      .attr("id", "title");
    d3.select("#container")
      .append("h2")
      .text("35 Fastest times up Alpe d'Huez")
      .attr("id", "subtitle");

    const w = 900;
    const h = 600;
    const padding = 40;

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    const xScale = d3
      .scaleTime()
      .domain([d3.min(points, d => d[0] - 1), d3.max(points, d => d[0]) + 1])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleTime()
      .domain([d3.min(points, d => d[1]), d3.max(points, d => d[1])])
      .range([padding, h - padding]);

    svg
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d[0]))
      .attr("cy", d => yScale(d[1]))
      .attr("r", 5)
      .attr("data-xvalue", d => d[0])
      .attr("data-yvalue", d => d[1])
      .attr("fill", "royalblue")
      .attr("class", "point")
      .append("title")
      .text(d => d[1])
      .attr("id", "tooltip");

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".4r"));

    svg
      .append("g")
      .attr("transform", `translate(0, ${h - padding})`)
      .call(xAxis)
      .attr("id", "x-axis");

    const yAxis = d3.axisLeft(yScale);

    yAxis.tickFormat(d3.timeFormat("%M:%S"));

    svg
      .append("g")
      .attr("transform", `translate(${padding},0)`)
      .call(yAxis)
      .attr("id", "y-axis");
  });
});
