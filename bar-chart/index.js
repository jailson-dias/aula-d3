var data = [
    {"red":10,"blue":20,"green":15}, //bar 1
    {"red":40,"blue":10,"green":35}, //bar 2
    {"red":40,"blue":15,"green":35} //bar 3
];
var keys = ["red","green","blue"];
var stack = d3.stack().keys(keys);
var layers = stack(data); //faixas correspondentes às keys
console.log(layers);

var xScale = d3.scaleBand().domain(keys).range([0,500]);
var maxY = d3.max(layers[layers.length-1],d=>d[1]);
console.log(maxY);
var yScale = d3.scaleLinear().domain([0,maxY]).range([500,0]);

var svg = d3.select("svg")

var layersS = svg.selectAll(".layer")
.data(layers)
.enter()
.append("g")
.attr("class","layer")
.attr("fill",(d,i)=>keys[i])


layersS.selectAll("rect")
.data(d=>d)
.enter()
.append("rect")
.attr("x",(d,i) => xScale(keys[i]))
.attr("y", d=>yScale(d[1]))
.attr("width",xScale.bandwidth())
.attr("height",d=>yScale(d[0])-yScale(d[1]))
.on("mouseover", function() {
    d3.select(this).attr("fill", (d, i, r) => {
        console.log(d,i,r)
        return "orange"
    })
})
.on("mouseout", function() {
    d3.select(this).attr("fill", (d,i)=> {
        console.log(i)
        return keys[d.index]
    })
})