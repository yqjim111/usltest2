// define basic parameters
var margin = {top: 30, bottom: 30, left: 250, right: 30}
var w1=1800
var h1=1800
var moduleW = 15
var moduleH = 21
var gap = 60
var strokewidth = 1
var gridwidth = 0.75
var thingridwidth = 0.25
var annotationsize = 10
var titlesize = 14
var arraylength;
var Occupationtypes;
var Expertisetypes;
var Languagetypes;
var Countrytypes;
var color = ["#D8867D","#FFD799","#ADBC7A","#F69ECA","#D3BAAB","#99C2D6","#B599CC","#6EC4E3"]
// start drawing things

var canvas = d3.select('#pattern')
    .append('svg')
    .attr('width', '400px')
    .attr('height','400px');
        
canvas.append('defs')
	.append('pattern')
	.attr('id', 'diagonalHatch')
	.attr('patternUnits', 'userSpaceOnUse')
	.attr('width', 4)
	.attr('height', 4)
	.append('path')
	.attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
	.attr('stroke', '#010101')
	.attr('stroke-width', 1)
	.attr("opacity",1);

canvas.append('defs')
	.append('pattern')
	.attr('id', 'Mesh')
	.attr('patternUnits', 'userSpaceOnUse')
	.attr('width', 4)
	.attr('height', 4)
	.append('path')
	// .attr('d', 'M-1,1 l2,-8 M0,4 l4,-4 M3,5 l2,-8')
	.attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
	.attr('stroke', '#010101')
	.attr('stroke-width', 1)
	.attr("opacity",1);

// canvas.append('defs')
//   	.append('pattern')
//   	.attr('id', 'dots')
//   	.attr('patternUnits', 'userSpaceOnUse')
//   	.attr('width', 4)
//   	.attr('height', 4)
//   	.append('image')
//   	.attr('xlink:href', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1JyBoZWlnaHQ9JzUnPgo8cmVjdCB3aWR0aD0nNScgaGVpZ2h0PSc1JyBmaWxsPScjZmZmJy8+CjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyNjY2MnLz4KPC9zdmc+')
//   	.attr('x', 0)
//   	.attr('y', 0)
//   	.attr('width', 10)
//   	.attr('height', 10)


var svg = d3.select("#chart")
	.append("svg")
	.attr("width", w1)
	.attr("height", h1)
	// .attr("transform", "translate("+ margin.left +", "+ margin.top +")");

d3.select("#chart")
	// .attr("align","center");

d3.csv("Human.csv")
    .then(function(data) {
// prepare basic parameters
    	// console.log(data);
			var databyOccupation = d3.nest()
				.key(function(d) { return d.Occupation; })
				.entries(data);

			var databyCountry = d3.nest()
				.key(function(d) { return d.Country; })
				.entries(data);

			var databyLanguage = d3.nest()
				.key(function(d) { return d.Language; })
				.entries(data);

			var databyExpertise = d3.nest()
				.key(function(d) { return d.Expertise; })
				.entries(data);

			Expertisetypes = getTYPESof(databyExpertise)
			Languagetypes = getTYPESof(databyLanguage).sort()
			Countrytypes = getTYPESof(databyCountry).sort()
			Occupationtypes = getTYPESof(databyOccupation)
            arraylength = getlength(databyOccupation)
            // console.log(Occupationtypes)
			// console.log(Countrytypes)
			// console.log(databyOccupation)
            for(var order = 0; order < databyOccupation.length; order++){
            	drawChartCountry(databyOccupation[order], order)
            	drawChartLanguage(databyOccupation[order], order)
            	drawChartExpertise(databyOccupation[order], order)
            	drawannotation(order)
            }

            drawGrid(databyOccupation);
            console.log(d3.selectAll("rect"))
})
    .catch(function(error){
})

function drawChartCountry(data, order){
	var yindex = addnumber(order);
	// var datatemp = d3.values(data)[1].sort((a, b) => (a.Gender > b.Gender) ? 1 : -1)
	var datatemp2 = d3.values(data)[1]
	var gCountry = d3.select("svg").append("g").attr("id", "Country")
	function compare( a, b ) {
	  if ( a.Gender < b.Gender ){
	    return -1;
	  }
	  if ( a.Gender > b.Gender ){
	    return 1;
	  }
	  return 0;
	}

	var datatemp = datatemp2.sort( compare );
	// console.log(datatemp)
	// console.log(yindex);
	// console.log(Countrytypes)

	gCountry.append("g")
		.selectAll("g")
		.data(datatemp)
		.enter()
		.append('g')
		.append('rect')
		.attr("x", function(d, i){
			return margin.left + Countrytypes.indexOf(d.Country) * moduleW;
			// console.log(Countrytypes)
			// return moduleW * 
		})
		.attr("y", function(d, i){
			return margin.top + moduleH * i + moduleH * yindex + gap * order ;
		})
		.attr("width", moduleW)
		.attr("height", moduleH)
		.attr("fill", color[order])
		.attr("stroke", "black")
		.attr("stroke-width", strokewidth)

	gCountry.append("g")
		.selectAll("g")
		.data(datatemp)
		.enter()
		.append('g')
		.append('rect')
		.attr("x", function(d, i){
			return margin.left + Countrytypes.indexOf(d.Country) * moduleW;
			// console.log(Countrytypes)
			// return moduleW * 
		})
		.attr("y", function(d, i){
			return margin.top + moduleH * i + moduleH * yindex + gap * order ;
		})
		.attr("width", moduleW)
		.attr("height", moduleH)
		.attr("stroke", "black")
		.attr("stroke-width", strokewidth)
		.style("fill", function(d, i){
			if(datatemp[i].Gender == "M"){
				return "url(#diagonalHatch)";
			}
			if(datatemp[i].Gender == "H"){
				return "url(#Mesh)";
			}
			if(datatemp[i].Gender == "F"){
				return "None";
			}
		})
}

function drawChartLanguage(data, order){
	var yindex = addnumber(order);
	var datatemp2 = d3.values(data)[1]

	function compare( a, b ) {
	  if ( a.Gender < b.Gender ){
	    return -1;
	  }
	  if ( a.Gender > b.Gender ){
	    return 1;
	  }
	  return 0;
	}

	var datatemp = datatemp2.sort( compare );
	// var datatemp = d3.values(data)[1].sort((a, b) => (a.Gender > b.Gender) ? 1 : -1)
	var gendertemp = [];
	var genderindexFMO;
	var genderindexOM;
	var opacityFM;
	var opacityM;
	var opacityO;
	var textYOtemp = 0;
	var gLanguage = d3.select("svg").append("g").attr("id", "Language");
	var gAnno = d3.select("svg").append("g").attr("id", "Annotation");;
	// console.log(datatemp)
	for(var i in datatemp){
		gendertemp.push(datatemp[i].Gender)
	}
	if(gendertemp.indexOf("H") != -1){

		if(gendertemp.indexOf("M") != -1 && gendertemp.indexOf("F") != -1){
			genderindexFMO = gendertemp.lastIndexOf("F") + 1;
			genderindexOM = gendertemp.indexOf("M");
			textYOtemp = (gendertemp.indexOf("M") + gendertemp.lastIndexOf("F") + 1) / 2
			opacityFM = 1;
			opacityM = 1;
			opacityO = 1;
		}
		if(gendertemp.indexOf("M") == -1 && gendertemp.indexOf("F") != -1){
			genderindexFMO = gendertemp.lastIndexOf("F") + 1;
			genderindexOM = gendertemp.lastIndexOf("F") + 1;
			opacityFM = 1;
			opacityM = 0;
			opacityO = 1;
		}
		if(gendertemp.indexOf("M") != -1 && gendertemp.indexOf("F") == -1){
			genderindexFMO = gendertemp.indexOf("M");
			genderindexOM = gendertemp.indexOf("M");
			opacityFM = 0;
			opacityM = 1;
			opacityO = 1;
		}
		if(gendertemp.indexOf("M") == -1 && gendertemp.indexOf("F") == -1){
			genderindexFMO = gendertemp.indexOf("H");
			genderindexOM = gendertemp.indexOf("H");
			opacityFM = 0;
			opacityM = 0;
			opacityO = 1;
		}
	}

	if(gendertemp.indexOf("H") == -1){
		if(gendertemp.indexOf("M") != -1 && gendertemp.indexOf("F") != -1){
			genderindexFMO = gendertemp.lastIndexOf("F") + 1;
			genderindexOM = gendertemp.indexOf("M");
			opacityFM = 1;
			opacityM = 1;
			opacityO = 0;
		}
		if(gendertemp.indexOf("M") == -1 && gendertemp.indexOf("F") != -1){
			genderindexFMO = gendertemp.lastIndexOf("F") + 1;
			genderindexOM = gendertemp.lastIndexOf("F") + 1;
			opacityFM = 1;
			opacityM = 0;
			opacityO = 0;
		}
		if(gendertemp.indexOf("M") != -1 && gendertemp.indexOf("F") == -1){
			genderindexFMO = gendertemp.indexOf("M");
			genderindexOM = gendertemp.indexOf("M");
			opacityFM = 0;
			opacityM = 1;
			opacityO = 0;
		}
	}

// draw people
	for(var i in datatemp){
		var languagetemp = datatemp[i].Language.split(",")
		// console.log(languagetemp.length)
		if(languagetemp.length == 1){

			gLanguage.append("rect")
			.attr("x", margin.left + Languagetypes.indexOf(languagetemp[0]) * moduleW + Countrytypes.length * moduleW)
			.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
			.attr("width", moduleW)
			.attr("height", moduleH)
			.attr("fill", color[order])
			.attr("stroke", "black")
			.attr("stroke-width", strokewidth)

			if(datatemp[i].Gender == "M" ){
				gLanguage.append("rect")
				.attr("x", margin.left + Languagetypes.indexOf(languagetemp[0]) * moduleW + Countrytypes.length * moduleW)
				.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
				.attr("width", moduleW)
				.attr("height", moduleH)
				.style("fill", "url(#diagonalHatch)")
				.attr("stroke", "black")
				.attr("stroke-width", strokewidth)
			}

			if(datatemp[i].Gender == "H" ){
				gLanguage.append("rect")
				.attr("x", margin.left + Languagetypes.indexOf(languagetemp[0]) * moduleW + Countrytypes.length * moduleW)
				.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
				.attr("width", moduleW)
				.attr("height", moduleH)
				.style("fill", "url(#Mesh)")
				.attr("stroke", "black")
				.attr("stroke-width", strokewidth)
			}

		}

		if(languagetemp.length > 1){
			for(var j in languagetemp){

			gLanguage.append("rect")
			.attr("x", margin.left + Languagetypes.indexOf(languagetemp[j].trim()) * moduleW + Countrytypes.length * moduleW)
			.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
			.attr("width", moduleW)
			.attr("height", moduleH)
			.attr("fill", color[order])
			.attr("stroke", "black")
			.attr("stroke-width", strokewidth)

				if(datatemp[i].Gender == "M"){
					gLanguage.append("rect")
					.attr("x", margin.left + Languagetypes.indexOf(languagetemp[j].trim()) * moduleW + Countrytypes.length * moduleW)
					.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
					.attr("width", moduleW)
					.attr("height", moduleH)
					.style("fill", "url(#diagonalHatch)")
					.attr("stroke", "black")
					.attr("stroke-width", strokewidth)
				}

				if(datatemp[i].Gender == "H"){
					gLanguage.append("rect")
					.attr("x", margin.left + Languagetypes.indexOf(languagetemp[j].trim()) * moduleW + Countrytypes.length * moduleW)
					.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
					.attr("width", moduleW)
					.attr("height", moduleH)
					.style("fill", "url(#Mesh)")
					.attr("stroke", "black")
					.attr("stroke-width", strokewidth)
				}
			}
		}
	}
// draw M/O/F index
	gAnno.append("line")
		.attr("x1", margin.left - 40)
		.attr("y1", margin.top + moduleH * genderindexFMO + moduleH * yindex + gap * order)
		.attr("x2", margin.left)
		.attr("y2", margin.top + moduleH * genderindexFMO + moduleH * yindex + gap * order)
		.attr("stroke", "black")
		.attr("stroke-width", gridwidth)

	gAnno.append("line")
		.attr("x1", margin.left - 40)
		.attr("y1", margin.top + moduleH * genderindexOM + moduleH * yindex + gap * order)
		.attr("x2", margin.left)
		.attr("y2", margin.top + moduleH * genderindexOM + moduleH * yindex + gap * order)
		.attr("stroke", "black")
		.attr("stroke-width", gridwidth)

	var textXFM = margin.left - 3;
	var textYFM = margin.top + moduleH * genderindexFMO + moduleH * yindex + gap * order - 3
	var textXM = margin.left - 3;
	var textYM = margin.top + moduleH * genderindexOM + moduleH * yindex + gap * order + 3
	var textXO = margin.left - 3;
	var textYO = margin.top + moduleH * textYOtemp + moduleH * yindex + gap * order 

	gAnno.append("text")
		.attr("class", "text")
		.attr("font-size", annotationsize + "px")
		.text("FEMALE")
		.attr("dominant-baseline", "ideographic")
		.attr("text-anchor", "end")
		// .attr("transform", "translate(" + textX + "," + textY + ") rotate(-90)")
		.attr("x", textXFM)
		.attr("y", textYFM)
		.style("opacity", opacityFM)

	gAnno.append("text")
		.attr("class", "text")
		.attr("font-size", annotationsize + "px")
		.text("MALE")
		.attr("dominant-baseline", "hanging")
		.attr("text-anchor", "end")
		// .attr("transform", "translate(" + textX + "," + textY + ") rotate(-90)")
		// .attr("x", textXM)
		// .attr("y", textYM + 3)
		.style("opacity", opacityM)
		.attr('x', textXM)
		.attr('y', textYM)

	gAnno.append("text")
		.attr("class", "text")
		.attr("font-size", annotationsize + "px")
		.text("OTHER")
		.attr("dominant-baseline", "middle")
		.attr("text-anchor", "end")
		// .attr("transform", "translate(" + textX + "," + textY + ") rotate(-90)")
		.attr("x", textXO)
		.attr("y", textYO)
		.style("opacity", opacityO)

	gAnno.append("text")
		.attr("class", "text")
		.text(Occupationtypes[order])
		.attr("font-size", titlesize + "px")
		.attr("dominant-baseline", "middle")
		.attr("text-anchor", "end")
		// .attr("transform", "translate(" + textX + "," + textY + ") rotate(-90)")
		.attr("x", margin.left - 50)
		.attr("y", textYFM)
		.attr("font-weight", 800)

}


function drawChartExpertise(data, order){
	var yindex = addnumber(order);
	// var datatemp = d3.values(data)[1].sort((a, b) => (a.Gender > b.Gender) ? 1 : -1)
	// var datatemp = d3.values(data)[1].sort(function(a, b){
	// 	return a.Gender - b.Gender || a.Name - b.Name;
	// })
	// console.log(yindex);
	// console.log(datatemp)
	var datatemp2 = d3.values(data)[1]
	var gExpertise = d3.select("svg").append("g").attr("id", "Expertise");

	function compare( a, b ) {
	  if ( a.Gender < b.Gender ){
	    return -1;
	  }
	  if ( a.Gender > b.Gender ){
	    return 1;
	  }
	  return 0;
	}

	var datatemp = datatemp2.sort( compare );

	for(var i in datatemp){
		var expertisetemp = datatemp[i].Expertise.split(",")
		var style;
		// console.log(datatemp[i])
		// console.log(languagetemp.length)
		if(expertisetemp.length == 1){

			gExpertise.append("rect")
			.attr("x", margin.left + Expertisetypes.indexOf(expertisetemp[0]) * moduleW + (Countrytypes.length + Languagetypes.length) * moduleW)
			.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
			.attr("width", moduleW)
			.attr("height", moduleH)
			.attr("fill", color[order])
			.attr("stroke", "black")
			.attr("stroke-width", strokewidth)

			if(datatemp[i].Gender == "M"){
				gExpertise.append("rect")
				.attr("x", margin.left + Expertisetypes.indexOf(expertisetemp[0]) * moduleW + (Countrytypes.length + Languagetypes.length) * moduleW)
				.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
				.attr("width", moduleW)
				.attr("height", moduleH)
				.style("fill", "url(#diagonalHatch)")
				.attr("stroke", "black")
				.attr("stroke-width", strokewidth)
			}

			if(datatemp[i].Gender == "H"){
				gExpertise.append("rect")
				.attr("x", margin.left + Expertisetypes.indexOf(expertisetemp[0]) * moduleW + (Countrytypes.length + Languagetypes.length) * moduleW)
				.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
				.attr("width", moduleW)
				.attr("height", moduleH)
				.style("fill", "url(#Mesh)")
				.attr("stroke", "black")
				.attr("stroke-width", strokewidth)
			}

		}

		if(expertisetemp.length > 1){
			for(var j in expertisetemp){

			gExpertise.append("rect")
			.attr("x", margin.left + Expertisetypes.indexOf(expertisetemp[j].trim()) * moduleW + (Countrytypes.length + Languagetypes.length) * moduleW)
			.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
			.attr("width", moduleW)
			.attr("height", moduleH)
			.attr("fill", color[order])
			.attr("stroke", "black")
			.attr("stroke-width", strokewidth)

				if(datatemp[i].Gender == "M"){
					gExpertise.append("rect")
					.attr("x", margin.left + Expertisetypes.indexOf(expertisetemp[j].trim()) * moduleW + (Countrytypes.length + Languagetypes.length) * moduleW)
					.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
					.attr("width", moduleW)
					.attr("height", moduleH)
					.style("fill", "url(#diagonalHatch)")
					.attr("stroke", "black")
					.attr("stroke-width", strokewidth)
				}

				if(datatemp[i].Gender == "H"){
					gExpertise.append("rect")
					.attr("x", margin.left + Expertisetypes.indexOf(expertisetemp[j].trim()) * moduleW + (Countrytypes.length + Languagetypes.length) * moduleW)
					.attr("y", margin.top + moduleH * i + moduleH * yindex + gap * order)
					.attr("width", moduleW)
					.attr("height", moduleH)
					.style("fill", "url(#Mesh)")
					.attr("stroke", "black")
					.attr("stroke-width", strokewidth)
				}
			}
		}
	}
	// console.log(data)
}

function drawGrid(data){

	// console.log(data.length)
	var gLine = d3.select("svg").append("g").attr("id", "line");

	gLine.append("line")
	.attr("x1", margin.left)
	.attr("y1", margin.top)
	.attr("x2", margin.left)
	.attr("y2", addnumber(data.length) * moduleH + gap * data.length)
	.attr("stroke", "black")
	.attr("stroke-width", gridwidth)

	gLine.append("line")
	.attr("x1", margin.left + Countrytypes.length * moduleW)
	.attr("y1", margin.top)
	.attr("x2", margin.left + Countrytypes.length * moduleW)
	.attr("y2", addnumber(data.length) * moduleH + gap * data.length)
	.attr("stroke", "black")
	.attr("stroke-width", gridwidth)

	gLine.append("line")
	.attr("x1", margin.left + (Countrytypes.length + Languagetypes.length) * moduleW)
	.attr("y1", margin.top)
	.attr("x2", margin.left + (Countrytypes.length + Languagetypes.length) * moduleW)
	.attr("y2", addnumber(data.length) * moduleH + gap * data.length)
	.attr("stroke", "black")
	.attr("stroke-width", gridwidth)

	gLine.append("line")
	.attr("x1", margin.left + (Countrytypes.length + Languagetypes.length + Expertisetypes.length) * moduleW)
	.attr("y1", margin.top)
	.attr("x2", margin.left + (Countrytypes.length + Languagetypes.length + Expertisetypes.length) * moduleW)
	.attr("y2", addnumber(data.length) * moduleH + gap * data.length)
	.attr("stroke", "black")
	.attr("stroke-width", gridwidth)

	for(var i in range(0, Countrytypes.length + Languagetypes.length + Expertisetypes.length)){

	gLine.append("line")
	.attr("x1", margin.left + i * moduleW)
	.attr("y1", margin.top)
	.attr("x2", margin.left + i * moduleW)
	.attr("y2", addnumber(data.length) * moduleH + gap * data.length)
	.attr("stroke", "black")
	.attr("stroke-width", thingridwidth)
	}
}

function drawannotation(order){

}

function range(start, end){
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function getuniqueitem(array){
	var unique = array.filter( onlyUnique )
	return unique;
}

function getlength(data){
	var arraylength = []
	for(var i in data){
		arraylengthtemp = d3.values(data[i])[1].length
		arraylength.push(arraylengthtemp)
	}
	return arraylength;
	// console.log(arraylength)
}

function addnumber(order){

	var sumstep = 0

	if(order > 0){
		for(var i = 0; i < order; i++){
			sumstep = sumstep + arraylength[i];
		}
	}
	return sumstep;
}

function getTYPESof(data){
	var types = []
	var keysfirst = data.map(function(o){return o.key});
	// console.log(keysfirst)
	for(var i in keysfirst){

		if (keysfirst[i].indexOf(',') <= -1) {
			types.push(keysfirst[i])
		}

		if (keysfirst[i].indexOf(',') > -1) { 
			arraytemp = keysfirst[i].split(',') 
			for(j in arraytemp){
				types.push(arraytemp[j].trim())
			}
		}
	}
	return getuniqueitem(types);
	// console.log(getuniqueitem(types));
}



