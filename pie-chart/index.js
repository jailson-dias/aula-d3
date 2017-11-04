var dataset = [ 5, 10, 20, 45, 6, 25 ];
var pie = d3.pie();
var slices = pie(dataset);
console.log(slices);
var arc = d3.arc()
.outerRadius(200)
.innerRadius(0)
// .padAngle(0.02)
// .cornerRadius(8);

var svg = d3.select("svg")
var pie = svg.append("g").attr("transform", "translate(250,250)")
var label = d3.select("body").append("label")
pie.selectAll("path")
.data(slices)
.enter().append("path")
.attr("class","arc")
.attr("d",arc)
.attr("fill","red")
.attr("stroke", "black")
.attr("stroke-width", 2)
.on("click", d => label.text(d.value))

pie.selectAll("text").data(slices)
.enter().append("text")
.attr("transform", d => "translate(" + arc.centroid(d) + ")")
.attr("fill", "white")
.attr("text-anchor", "middle")
.attr("font-size", 35)
// .attr("x", d => arc.centroid(d)[0])
// .attr("y", d => arc.centroid(d)[1])
.text(d => d.value)