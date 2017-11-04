var dataUsed   = undefined;
var scat       = undefined;
var barChart   = undefined;
var scats = {};
var bars = {};
var cursos = ["Administracao", "Biologia", "Letras", "Pedagogia"];
var semestres = ["2009.2", "2010.1", "2010.2", "2011.1", "2011.2", "2012.1", "2012.2", "2013.2", "2014.1", "2014.2", "2016.1"];    

//load dataset
d3.csv("baseGeral.csv",function(data){
    initSystem(data);
});

function optionChanged(data){
    
    cursos.forEach(function(d){
        var selectedCourse = d;
        var selectedSemester   = d3.select("#termInput").property("value");
        var filteredData = data.filter(d=>(d["Curso"] == selectedCourse)&&(d["Semestre"] == selectedSemester))

        //scat
        var scat = scats[d];
        scat.setTitle(d);
        scat.setXAxisLabel("VAR22");
        scat.setYAxisLabel("VAR18");
        var scatData = filteredData.map(d=>[d["VAR22"],d["VAR18"]]);
        scat.setData(scatData);

        
        console.log(filteredData)
        // scat.canvas.selectAll("circle").attr("fill", "red")

        // console.log(, "teste")
        //bar
        var barChart = bars[d];
        var hourData = d3.range(24).map(d=>[d,0]);
        filteredData.forEach(function(d){
            var hour = +d["VAR13"];
            hourData[hour][1] += 1;
        });
        barChart.setData(hourData);
        barChart.setCallback((i) => {
            var filteredData = data.filter(d=>
                    (d["Curso"] == selectedCourse)
                    &&(d["Semestre"] == selectedSemester)
                    && (d["VAR13"] == i))
            scat.setData(filteredData.map(d=>[d["VAR22"],d["VAR18"]]))
        })
    });

}

function buildVisualization(data){
    //
    var filteredData = data;//data.filter(d=>(d.Curso == selectedCourse)&&(d["Semestre"] == selectedTerm)&&(d["Nome da Disciplina"] == selectedDiscipline));
    
    //
    var scatData = filteredData.map(d=>[d["VAR22"],d["VAR18"]]);
    //scat.setXAxisLabel("Tempo Médio Abertura Submissão");
    //scat.setYAxisLabel("Tempo Médio Criação Postagem");
    scat.setData(scatData);

    console.log(scartData.canvas, "teste")

    //
    var hourData = d3.range(24).map(d=>[d,0]);
    filteredData.forEach(function(d){
	var hour = +d["VAR13"];
	hourData[hour][1] += 1;
    });
    barChart.setData(hourData);
}

function initSystem(data){
    //
    var divInput = d3.select("body").append("div");
    var termLabel = divInput.append("label").attr("for","termInput").text("   Semestre: ");
    var termInput = divInput.append("select").attr("id","termInput").attr("background", "white");
    termInput.selectAll("option").data(semestres).enter().append("option").attr("value",d=>d).attr("color","white").text(d=>d);
    termInput.on("change",d=>optionChanged(data));
   
    //
    d3.select("body").selectAll("svg").data(cursos).enter().append("svg").attr("id",d=>"svg_"+d).attr("width",300).attr("height",800);
    cursos.forEach(function(d){
	var mySVG = d3.select("#svg_"+d);
	var scat = new Scatterplot(mySVG,"scat1",0,0,300,300);
	var barChart = new BarChartWidget(mySVG,"barChart1",0,330,300,300);
	scats[d] = scat;
	bars[d] = barChart;
	
    });







     
    
    // //include course input
    // var courseLabel = d3.select("body").append("label").attr("for","courseInput").text("Curso: ");
    // var courseInput = d3.select("body").append("select").attr("id","courseInput");
    // courseInput.selectAll("option").data(cursos).enter().append("option").attr("value",d=>d).text(d=>d);    
    // courseInput.on("change",d=>optionChanged(data));
    
    // //include periodo input
    // var termLabel = d3.select("body").append("label").attr("for","termInput").text("   Semestre: ");
    // var termInput = d3.select("body").append("select").attr("id","termInput");
    // termInput.selectAll("option").data(periodos).enter().append("option").attr("value",d=>d).text(d=>d);
    // termInput.on("change",d=>optionChanged(data));
   
    // //include discipline input
    // var disciplineLabel = d3.select("body").append("label").attr("for","disciplineInput").text("   Disciplina: ");
    // var disciplineInput = d3.select("body").append("select").attr("id","disciplineInput");
    // disciplineInput.on("change",d=>buildVisualization(data));
    
    // //
    // optionChanged(data);
    // scatterSvg = d3.select("body").append("svg").attr("width",400).attr("height",400);
    // scat = new Scatterplot(scatterSvg,"scat1",0,50,300,300);
    // hourSvg = d3.select("body").append("svg").attr("width",400).attr("height",400);
    // barChart = new BarChartWidget(hourSvg,"barChart1",0,0,300,300);

}



// var dataset = [  [5, 20, 65],
// 	       [480, 90, 34],
// 	       [250, 50, 9],
// 	       [100, 33, 13],
// 	       [330, 95, 25],
//                [410, 12, 89],
// 	       [475, 44, 67],
// 	        [25, 67, 57],
// 	        [85, 21, 34],
// 	       [220, 88, 54]
// 	      ];

// var dataset1 = dataset.map(d=>[d[0],d[1]]);
// var dataset2 = dataset.map(d=>[d[1],d[2]]);

// var svg = d3.select("body").append("svg").attr("width",600).attr("height",600);

// var scat = new Scatterplot(svg,"scat1",0,0,300,300);
// scat.setData(dataset1);

// var scat2 = new Scatterplot(svg,"scat2",300,0,300,300);
// scat2.setData(dataset2);
