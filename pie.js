function createPie(width,height){
var pie=  d3.select("#pie")
    .attr("width",width)
    .attr("height",height)
pie.append("g")
   .attr("transform",`translate(${width/2},${height/2+10})`)
   .classed("chart",true) 

pie.append("text")
    .attr("x",width/2)
    .attr("y","1em")
    .attr("font-size","1.5em")
    .style("text-anchor","middle")
    .classed("pie-title",true)
  
}
function drawPie(data,year){
  var pie =d3.select("#pie")
  var arcs = d3.pie()
                .value(d=>d.emissions)
                .sort((a,b)=>{
                  if(a.continent<b.continent){
                    return -1;
                  }
                  else if(a.continent>b.continent){
                    return 1;
                  }
                  else{
                    return  a.emissions -b.emissions
                  }
                })
  var path =d3.arc()
              .outerRadius(+pie.attr("height")/2-50)
              .innerRadius(0)
  var yearData = data.filter(d=>d.year===year) 
  console.log(yearData)
  var continents = []
  for(let i =0;i< yearData.length;i++){
    var continent = yearData[i].continent
  if(continents.indexOf(continent) ===-1){
    continents.push(continent)
  } 
}

var colorScale = d3.scaleOrdinal()
                    .domain(continents)
                    .range(['#ab47bc','#7e57c2','#26a69a','#42a5f5',"#78909c"]);                         
var update =pie.select(".chart")
                .selectAll(".arc")
                .data(arcs(yearData))   
update.exit().remove()

update.enter()
      .append("path")
      .classed("arc",true)
      .attr("stroke","#dff1ff")
      .attr("stroke-width","0.25px")

      .merge(update)
      .attr("fill",d=>colorScale(d.data.continent))
      .attr('d',path)
 pie.select(".pie-title")
    .text("Total Emissions by Continent and Country, "+year)         
}
