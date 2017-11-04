class BarChartWidget{
    
        constructor(container,widgetID,screenX,screenY,totalWidth,totalHeight){
        //set margins
        this.renderingArea = {x:screenX,y:screenY,width:totalWidth,height:totalHeight};
        this.margins = {left:10,right:10,top:10,bottom:30}
        this.canvasWidth = this.renderingArea.width - this.margins.left - this.margins.right;
        this.canvasHeight = this.renderingArea.height - this.margins.top - this.margins.bottom;
        this.widgetID = widgetID;
    
        //
        this.canvas = container
            .append("g")
            .attr("id","line_" + widgetID)
            .attr("transform","translate("+(this.renderingArea.x+this.margins.left) + ", " + (this.renderingArea.y+this.margins.top) + ")");
        
        //
        this.xScale = d3.scaleLinear().range([0,this.canvasWidth]);
        this.xAxis  = d3.axisBottom(this.xScale);
        this.canvas
            .append("g")
            .attr("class","xAxis")
            .attr("transform","translate(0," + this.canvasHeight  + ")");
    
        //
        this.yScale = d3.scaleBand().range([0,this.canvasHeight]);
        // this.yAxis  = d3.axisLeft(this.yScale);
        // this.canvas
        //     .append("g")
        //     .attr("class","yAxis");
    
        //
        this.canvas.append("text").attr("id",widgetID + "_labelXAxis");
        this.canvas.append("text").attr("id",widgetID + "_labelYAxis");
        this.xLabel = "";
        this.yLabel = "";

        this.callback = undefined

        //
        

        this.updatePlot();
        }

        setCallback(f) {
            // console.log("teste")
            this.callback = f
            this.updatePlot();
        }
    
        setXAxisLabel(xLabel){
        this.xLabel = xLabel;
        }
        
        setYAxisLabel(yLabel){
        this.yLabel = yLabel;
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
        // this.yAxis(this.canvas.select(".yAxis"));
        this.canvas.select("#" + this.widgetID + "_labelYAxis")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margins.left)
            .attr("x",0 - (canvasHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(this.yLabel);
        }
    
        setData(newData){
        //
        this.data = newData;//.map(d=>[d[0],d[1]]);
        // console.log(this.data);
        //
        this.yScale.domain(this.data.map(d=>d[0]));
        this.xScale.domain([0, d3.max(this.data.map(d=>d[1]))]);
        //
        this.updatePlot();
        }
        
        updateBars(){
        if(this.data == undefined)
            return;
        //
        var callback = this.callback
        var bars = this.canvas
            .selectAll(".bar")
            .data(this.data);
    
        bars.exit().remove();
        bars.enter()
            .append("rect")
            .merge(bars)
            .attr("class","bar")
            .attr("x", 0)
            .attr("fill","#e5f5f9")
            .attr("stroke","black")
            .attr("y", (function(d) { return this.yScale(d[0]); }).bind(this))
            .attr("height", (function(d) { return this.yScale.bandwidth(); }).bind(this))
            .attr("width", (function(d){ return this.xScale(d[1])}).bind(this))
            .on("click", function(d,i) {
                callback(i)
            })
    
    
        //labels
        var labels = this.canvas
            .selectAll(".label")
            .data(this.data);
        
        labels.exit().remove();
        labels.enter()
            .append("text")
            .merge(labels)
            .attr("class","label")
            .attr("x", 10)
            .attr("y", (function(d) { return this.yScale(d[0])+this.yScale.bandwidth()/2; }).bind(this))
            .attr("fill","black")
            .style("font-weight","bold")
            .style("pointer-events", "none")
            .attr("alignment-baseline","middle")
            .text(d=>d[0]);	
        }
        
        updatePlot(){
        this.updateAxis();
        this.updateBars();
        }
    }
    
    