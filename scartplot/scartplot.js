class Scatterplot{
    
        constructor(container,widgetID,screenX,screenY,totalWidth,totalHeight){
        //set margins
        this.renderingArea = {x:screenX,y:screenY,width:totalWidth,height:totalHeight};
        this.margins = {left:50,right:10,top:30,bottom:30}
        this.canvasWidth = this.renderingArea.width - this.margins.left - this.margins.right;
        this.canvasHeight = this.renderingArea.height - this.margins.top - this.margins.bottom;
        this.widgetID = widgetID;
        //
        this.data = [];	
        //
        this.canvas = container
            .append("g")
            .attr("id","line_" + widgetID)
            .attr("transform","translate("+(this.renderingArea.x+this.margins.left) + ", " + (this.renderingArea.y+this.margins.top) + ")");
        
        //
        this.xScale = d3.scaleLinear().range([0,this.canvasWidth,]);
        this.xAxis  = d3.axisBottom(this.xScale);
        this.canvas
            .append("g")
            .attr("class","xAxis")
            .attr("transform","translate(0," + this.canvasHeight  + ")");
    
        //
        this.yScale = d3.scaleLinear().range([this.canvasHeight,0]);
        this.yAxis  = d3.axisLeft(this.yScale);
        this.canvas
            .append("g")
            .attr("class","yAxis");
    
        //
        this.canvas.append("text").attr("id",widgetID + "_labelXAxis");
        this.canvas.append("text").attr("id",widgetID + "_labelYAxis");
        this.canvas.append("text").attr("id",widgetID + "_title");
        this.xLabel = "";
        this.yLabel = "";
        this.title = "";
        //
        this.updatePlot();
        }
    
        setXAxisLabel(xLabel){
        this.xLabel = xLabel;
        }
        
        setYAxisLabel(yLabel){
        this.yLabel = yLabel;
        }
    
        setTitle(t){
        this.title = t;
        }
        
        updateAxis(){
        var canvasWidth = this.canvasWidth;
        var canvasHeight = this.canvasHeight;
        
        //text label for the x axis
        this.xAxis(this.canvas.select(".xAxis"));
        this.canvas.select("#" + this.widgetID + "_labelXAxis")
            .attr("x",(canvasWidth/2.0))
            .attr("y",(canvasHeight + this.margins.top + 20))
            .style("text-anchor", "middle")
            .text(this.xLabel);
        //text label for the y axis
        this.yAxis.tickFormat(d3.format(".0s"));
        this.yAxis(this.canvas.select(".yAxis"));
        this.canvas.select("#" + this.widgetID + "_labelYAxis")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margins.left)
            .attr("x",0 - (canvasHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(this.yLabel);
    
        //
        this.canvas.select("#" + this.widgetID + "_title")
            .attr("x",(canvasWidth/2.0))
            .attr("y",10)
            .style("text-anchor", "middle")
            .text(this.title);
        }
    
        setData(newData){
        //
        this.data = newData;
        //
        this.xScale.domain(d3.extent(newData,d=>d[0]));
        this.yScale.domain(d3.extent(newData,d=>d[1]));
        //
        this.updatePlot();
        }
    
        updatePlot(){
        this.updateAxis();
        this.updateDots();
        }
        
        updateDots(){
        var circles = this.canvas.selectAll("circle").data(this.data);
    
        circles.exit().remove();
        var plot = this;
        circles
            .enter()
            .append("circle")
            .merge(circles)
            .attr("cx",d=>plot.xScale(d[0]))
            .attr("cy",d=>plot.yScale(d[1]))
            .attr("r",5)
            .attr("fill","black")
            .attr("fill-opacity",0.5);
        }
     
    
    }
    