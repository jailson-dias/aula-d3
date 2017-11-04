d3.json("us-states.json", function(error, json) {
    console.log(error, json)
    var projection = d3.geoAlbers()
    .translate([1000/2,1000/2])
    .scale([400])
    var path = d3.geoPath()
    .projection(projection);

    d3.select("svg").selectAll("path").data(json.features)
    .enter().append("path")
    .attr("d", path)
    .on("mouseover", function() {
        d3.select(this).attr("fill", "orange")
    })
    .on("mouseout", function() {
        d3.select(this).attr("fill", "black")
    })
})