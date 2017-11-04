var minmax = [0,0]

d3.json("brazil.geojson", function(json) {
    d3.csv("aids_por_estado.csv", function(data) {
        // console.log(json)


        
        // Tratando os dados
        json.features.forEach((feature, index) => {
            var nome = feature.properties.L1
            for (var i = 0; i < data.length; i++) {
                var estado = data[i]
                if (estado.UF.toLowerCase() == nome.toLowerCase()) {
                    json.features[index].properties.AIDS = estado
                    break;
                }
            }
            // var tam = feature.geometry.coordinates[0][0].length
            // var x = 0, y = 0
            // feature.geometry.coordinates[0][0].forEach((p) => {
            //     x += p[0]
            //     y += p[1]
            // })
            // x = x/tam
            // y = y/tam
            // texto.append("text")
            // .attr("x", x)
            // console.log(x,y)

        });
        for (var i = 1990; i< 2010; i++) {
            var colorExtend = d3.extent(json.features, d => d.properties.AIDS[i])
            // minmax[0] = Math.min(minmax[0],colorExtend[0])
            minmax[1] = Math.max(minmax[1],colorExtend[1])
        }
        var colorExtend = d3.extent(json.features, d => d.properties.AIDS[1990])
        var cscale = d3.scaleLinear().domain([0, colorExtend[1]]).range(["pink", "red"]);
        
        
        // desenhando o mapa

        var svg = d3.select("svg")
        var mapa = svg.append("g")
        var texto = svg.append("g") // titulo do estado

        var width = svg.style("width").slice(0, -2) / 2
        var height = svg.style("height").slice(0, -2) / 2
        var projection = d3.geoMercator().center([-85.0777869, 0])
        .translate([width/2,height/2])
        .scale([600])
        // console.log(data)
        // console.log(json)
        var path = d3.geoPath()
        .projection(projection);
        // console.log(path)
        mapa.selectAll("path").data(json.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", (d) => {
            // console.log(d)
            var centro = path.centroid(d)
            texto.append("text")
            .attr("x", centro[0])
            .attr("y", centro[1])
            .text(d.properties.L1)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            return cscale(d.properties.AIDS[1990])
        })
        // .on("mouseover", function() {
        //     d3.select(this).attr("fill", "orange")
        // })
        // .on("mouseout", function() {
        //     d3.select(this).attr("fill", "black")
        // })
    })
})

function slide(value) {
    console.log(value)
    // var colorExtend = d3.extent(json.features, d => d.properties.AIDS[1990])
    var cscale = d3.scaleLinear().domain(minmax).range(["pink", "red"]);
    d3.select("svg").selectAll("path")
    .attr("fill", (d) => {
        return cscale(d.properties.AIDS[value])
    })
}