color_code = [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50]


function Listing_Price(neighborhood) {
  var price_url = `/price/${neighborhood}`;
  d3.json(price_url).then(function(data) {
    var prices = data;
    var trace1 = {
      x: prices,
      type: "histogram",
      marker: {
				cmax: 50, 
				cmin: 0, 
				colorbar: {}, 
				color: color_code ,
				colorscale: 'Jet' 
			  }
    };
    
    var data = [trace1];
    
    var layout = {
      title: "Distribution of Listing Rent Prices", 
      xaxis: {title: "Listing Rent Prices ($)"}, 
      yaxis: {title: "Number of Listings"},
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    };
  
    Plotly.newPlot('histogram', data, layout);
  });
}



function init() {
  
  var selector = d3.select("#DropDown_Neighborhood");

  d3.json("/neighborhoods").then((neighborhoods) => {
    neighborhoods.forEach((neighborhood) => {
      selector
        .append("option")
        .text(neighborhood)
        .property("value", neighborhood);
    });

    const Initial_Neighborhood_Value = neighborhoods[0];
	 Listing_Price(Initial_Neighborhood_Value);
  });
}

function optionChanged(OnClick_Value) {
	 Listing_Price(OnClick_Value);
}	 
init();