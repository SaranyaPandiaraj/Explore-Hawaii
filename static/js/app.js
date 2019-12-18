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
  
    Plotly.newPlot('price', data, layout);
  });
}

function Security_Deposit(neighborhood) {
  var price_url = `/security_deposit/${neighborhood}`;
  d3.json(price_url).then(function(data) {
	console.log(data);
    var Deposit_keys = [];
    var Deposit_values = [];
    
    for (var k in data) {
      Deposit_keys.push(k);
      Deposit_values.push(data[k])};
   
    var trace3 = {
      x: Deposit_keys,
	  y: Deposit_values,
      type: "scatter",
	  mode: 'lines+markers',
      marker: {
				cmax: 50, 
				cmin: 0, 
				colorbar: {}, 
				color: color_code ,
				colorscale: 'Jet',
				size : 12
			  }
    };
    
    var data = [trace3];
    
    var layout = {
      title: "Distribution of security_deposit", 
      xaxis: {title: "Listing security_deposit ($)"}, 
      yaxis: {title: "Security Deposit Freq"},
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    };
  
    Plotly.newPlot('security', data, layout);
  });
}

function Top_Amenities(neighborhood) {
  
  var amenities_url = `/amenities/${neighborhood}`;
  
  d3.json(amenities_url).then(function(amenities_data) {

    var amenities_keys = amenities_data.map(function(tuple) {
    return tuple[0];
	});
	var amenities_values = amenities_data.map(function(tuple) {
    return tuple[1];
	});
		
    var trace2 = {
      y: amenities_values,
      x: amenities_keys,
      type: "bar",
	 	 
	transforms: [
	   {
		type: 'sort',
		target: 'y',
		order: 'descending'	
  
		}],
		
      marker: {
		cmax: 50, 
		cmin: 0,  
        colorbar: {}, 
		color: color_code ,
		colorscale: 'Jet' 
      }
 
    };
	
	var data2 = [trace2];
	
    // Add chart title
    var layout2 = {
      title: "Top Amenities",
	  xaxis: {title: "Amenities", automargin:true}, 
      yaxis: {title: "Amenities Freq"},
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    };
    
    Plotly.newPlot('amenities', data2, layout2);
  });
}


function Property_Type(neighborhood) {
  
  var Property_Url = `/property_type/${neighborhood}`;

  d3.json(Property_Url).then(function(proptypedata) {
    
    var property_type_keys = [];
    var property_type_values = [];
    
    for (var k in proptypedata) {
      property_type_keys.push(k);
      property_type_values.push(proptypedata[k])};
   
    var trace3 = [{
      values: property_type_values,
      labels: property_type_keys,
      type: "pie",
      /*marker: {
        cmax: 10, 
		cmin: 0,  
        colorbar: {}, 
		colors: color_code ,
		colorscale: 'Jet' 
      },*/
	  colorway: {
        valType: 'Jet',
        role: 'style',
        editType: 'calc'}
    }];
    var layout2 = {
      title: "Property Types",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
	   width: 500,
		height: 500
    };
    // Create pie chart
    Plotly.newPlot('property', trace3, layout2);
  });
}


function Room_Type(neighborhood) {
  
  var Room_Url = `/room_type/${neighborhood}`;
 
  d3.json(Room_Url).then(function(roomtypedata) {
    
    var room_type_keys = [];
    var room_type_values = [];
    
    for (var k in roomtypedata) {
      room_type_keys.push(k);
      room_type_values.push(roomtypedata[k])};
        
        var trace4 = [{
          values: room_type_values,
          labels: room_type_keys,
          type: "pie",
          marker: {
				   cmax: 50, 
				cmin: 0,  
				colorbar: {}, 
				colors: color_code ,
				colorscale: 'Jet' 
          }
        }];
        
        var layout3 = {
          title: "Room Types",
		  paper_bgcolor:'rgba(0,0,0,0)',
		  plot_bgcolor:'rgba(0,0,0,0)',
		   width: 500,
			height: 500
        };
        // Create pie chart
        Plotly.newPlot('room', trace4, layout3);
      });
  }

function Bed_Type(neighborhood) {
 
  var Bed_Url = `/bed_type/${neighborhood}`;

  d3.json(Bed_Url).then(function(bedtypedata) {
   
    var bedtype_keys = [];
    var bedtype_values = [];
     
    for (var k in bedtypedata) {
      bedtype_keys.push(k);
      bedtype_values.push(bedtypedata[k])};
    
    var trace5 = [{
      values: bedtype_values,
      labels: bedtype_keys,
      type: "pie",
      marker: {
        cmax: 50, 
		cmin: 0,  
        colorbar: {}, 
		colors: color_code ,
		colorscale: 'Jet' 
      }
    }];
    // Add chart title
    var layout5 = {
      title: "Bed Types",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
	   width: 500,
  height: 500
    };
    // Create pie chart
    Plotly.newPlot('bed', trace5, layout5);
  });
} 

function accom_bath_bedroom_beds(neighborhood) {
  
  var accom_bath_bedroom_beds_Url = `/accom_bath_bedroom_beds/${neighborhood}`;

  d3.json(accom_bath_bedroom_beds_Url).then(function(accom_bath_bedroom_beds) {
 
console.log(accom_bath_bedroom_beds); 


    var accom_keys = [];
    var accom_values = [];
    
    for (var k in accom_bath_bedroom_beds[0]) {
      accom_keys.push(k);
      accom_values.push(accom_bath_bedroom_beds[0][k])};
	  

	var bath_keys = [];
    var bath_values = [];
    
    for (var k in accom_bath_bedroom_beds[1]) {
      bath_keys.push(k);
      bath_values.push(accom_bath_bedroom_beds[1][k])};
	  

	  
	var bedroom_keys = [];
    var bedroom_values = [];
    
    for (var k in accom_bath_bedroom_beds[2]) {
      bedroom_keys.push(k);
      bedroom_values.push(accom_bath_bedroom_beds[2][k])};
	 

	var bed_keys = [];
    var bed_values = [];
    
    for (var k in accom_bath_bedroom_beds[3]) {
      bed_keys.push(k);
      bed_values.push(accom_bath_bedroom_beds[3][k])};  
 
 
    var trace6 = {
      y: accom_values,
      x: accom_keys,
      type: "bar",
	  name: "Accomodates",
      marker: {
        cmax: 10, 
		cmin: 0,  
       // colorbar: {}, 
		color: "blue" ,
		colorscale: 'Jet' 
      }
    };
	
	var trace7 = {
      y: bath_values,
      x: bath_keys,
      type: "bar",
	  name: "Bathrooms",
      marker: {
        cmax: 10, 
		cmin: 0,  
       // colorbar: {}, 
		color: "red" ,
		colorscale: 'Jet' 
      }, xaxis: 'x2',
  yaxis: 'y2',
    };
	
	var trace8 = {
      y: bedroom_values,
      x: bedroom_keys,
      type: "bar",
	  name: "Bedrooms",
      marker: {
        cmax: 10, 
		cmin: 0,  
        //colorbar: {}, 
		color: "green" ,
		colorscale: 'Jet' 
      }, xaxis: 'x3',
  yaxis: 'y3',
    };
	var trace9 = {
      y: bed_values,
      x: bed_keys,
      type: "bar",
	  name: "Beds",
      marker: {
        cmax: 10, 
		cmin: 0,  
        //colorbar: {}, 
		color: "orange" ,
		colorscale: 'Jet' 
      }, xaxis: 'x4',
		yaxis: 'y4',
    };
	
	var data = [trace6,trace7,trace8,trace9];
    var layout6 = {
      title: "Accomodations Bathrooms Bedrooms Baths Distribution",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
	  grid: {rows: 2, columns: 2, pattern: 'independent'},
	   width: 1300,
		height: 500
    };
    // Create pie chart
    Plotly.newPlot('accom_bath_bedroom_beds', data, layout6);
  });
}

function Cancellation(neighborhood) {
 
  var Cancellation_Url = `/Cancellation/${neighborhood}`;

  d3.json(Cancellation_Url).then(function(Cancellation) {
   
    var Cancellation_keys = [];
    var Cancellation_values = [];
     
    for (var k in Cancellation) {
      Cancellation_keys.push(k);
      Cancellation_values.push(Cancellation[k])};
    
    var trace10 = [{
      values: Cancellation_values,
      labels: Cancellation_keys,
      type: "pie",
      marker: {
        cmax: 50, 
		cmin: 0,  
        colorbar: {}, 
		colors: color_code ,
		colorscale: 'Jet' 
      }
    }];
    // Add chart title
    var layout10 = {
      title: "Cancellation Policy",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
	   width: 500,
  height: 500
    };
    // Create pie chart
    Plotly.newPlot('cancellation', trace10, layout10);
  });
} 

function host_listing(neighborhood) {
  var host_listing_url = `/host_listing/${neighborhood}`;
  d3.json(host_listing_url).then(function(data) {
    var host_listing = data;
    var trace11 = {
      x: host_listing,
      type: "histogram",
      marker: {
				cmax: 50, 
				cmin: 0, 
				colorbar: {}, 
				color: color_code ,
				colorscale: 'Jet' 
			  }
    };
    
    var data = [trace11];
    
    var layout11 = {
      title: "Host : Airbnb Listing Distribution", 
      xaxis: {title: "Host Airbnb Listings"}, 
      yaxis: {title: "Airbnb Listing Freq."},
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    };
  
    Plotly.newPlot('host_listing', data, layout11);
  });
}

function reviews_rating(neighborhood) {
  
  var reviews_rating_url = `/reviews_rating/${neighborhood}`;
 
  d3.json(reviews_rating_url).then(function(reviews_data) {
    
	console.log(reviews_data);
    var review_scores_rating = reviews_data;
   
    var data = [
      {
        
        x: review_scores_rating,
        
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8,
        
        name: "",
       
        marker:{
                cmax: 50, 
				cmin: 0, 
				colorbar: {}, 
				colors:  color_code,
				colorscale: 'Jet' 
        },
        type: 'box',
		colorway: {
        valType: 'Jet',
        role: 'style',
        editType: 'calc'}
      }
    ];
    // Add title and x label
    layout = {
      title: "Distribution of Ratings",
      xaxis: {title: "Overall Rating (Scale of 0 to 100)"},
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    }
    //  Create the box plot
    Plotly.newPlot('Reviews', data, layout);
  });
}

function host_visual_pie(neighborhood) {
  
  var host_visual_pie_Url = `/host_visual/${neighborhood}`;

  d3.json(host_visual_pie_Url).then(function(host_visual) {
 

    var host_is_superhost_keys = [];
    var host_is_superhost_values = [];
    
    for (var k in host_visual[0]) {
      host_is_superhost_keys.push(k);
      host_is_superhost_values.push(host_visual[0][k])};
	  

	var host_identity_verified_keys = [];
    var host_identity_verified_values = [];
    
    for (var k in host_visual[1]) {
      host_identity_verified_keys.push(k);
      host_identity_verified_values.push(host_visual[1][k])}; 
 
 
    var trace13 = {
      values: host_is_superhost_values,
      labels: ["Host is Not Superhost","Host Is Superhost"],
      type: "pie",
	  name: "Host is SuperHost",
	  hole: .3,
	  domain: {column: 0},
      marker: {
        cmax: 10, 
		cmin: 0,  
       // colorbar: {}, 
		color: "blue" ,
		colorscale: 'Jet' 
      }
    };
	
	var trace14 = {
      values: host_identity_verified_values,
      labels: ["Host Identity Not Verified","Host Identity Verified"],
      type: "pie",
	  name: "Host Identity Verified",
	  hole: .3,
	  domain: {column: 1},
      marker: {
        cmax: 10, 
		cmin: 0,  
       // colorbar: {}, 
		color: "red" ,
		colorscale: 'Jet' 
      }
    };
	
	var data = [trace13,trace14];
    var layout12 = {
      title: "Host Is Superhost & Host Identity Verified",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
	  //showlegend: false,
	  grid: {rows: 1, columns: 2 },
	   width: 1300,
		height: 500
    };
    // Create pie chart
    Plotly.newPlot('host_visual_pie', data, layout12);
  });
}
function host_visual(neighborhood) {
  
  var host_visual_Url = `/host_visual/${neighborhood}`;

  d3.json(host_visual_Url).then(function(host_visual) {
 


	  
	var host_response_time_keys = [];
    var host_response_time_values = [];
    
    for (var k in host_visual[2]) {
      host_response_time_keys.push(k);
      host_response_time_values.push(host_visual[2][k])};
	 

	var host_response_rate_keys = [];
    var host_response_rate_values = [];
    
    for (var k in host_visual[3]) {
      host_response_rate_keys.push(k);
      host_response_rate_values.push(host_visual[3][k])};  
 

	
	var trace15 = {
      y: host_response_time_values,
      x: host_response_time_keys,
      type: "bar",
	  name: "Host Response Time",

      marker: {
        cmax: 10, 
		cmin: 0,  
        //colorbar: {}, 
		color: "green" ,
		colorscale: 'Jet' 
      }
    };
	var trace16 = {
      y: host_response_rate_values,
      x: host_response_rate_keys,
      type: "scatter",
	  mode: 'lines+markers',
	  name: "Host Response Rate",
      marker: {
        cmax: 10, 
		cmin: 0,  
        size : 12, 
		color: "orange" ,
		colorscale: 'Jet' 
      }, xaxis: 'x2',
		yaxis: 'y2',
    };
	
	var data = [trace15,trace16];
    var layout13 = {
      title: "Host Response Rate & Time",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
	  grid: {rows: 1, columns: 2},
	   width: 1300,
		height: 500
    };
    // Create pie chart
    Plotly.newPlot('host_visual', data, layout13);
  });
}

function reviews_comments(neighborhood) {
  
  var reviews_comments_url = `/reviews_comments/${neighborhood}`;
 
  d3.json(reviews_comments_url).then(function(reviews_data) {
	  var wordcloudstring = "";
    
    wordcloudstring = reviews_data.join(" ");
    var myConfig = {
   
      type: 'wordcloud',
      options: {
        
        text: wordcloudstring,
        
        minLength: 5,
        // Ignore irrelevant words
        ignore: ["Hawaii","there","would","which","really","host","place","house","could","didn't","definitely","accommodating","about","first","needed","bathroom","bedroom","There","around","great","apartment","kitchen","condo","house","everything","Place","Great","great","during","helpful","downtown","questions","location","located","space","within","visit","their","little","Waikki","Waikiki","Hill","neighborhood","Thanks","Thank","thanks","thank","clean","right","left","recommend","before","after","wonderful","again","hosts","amazing","beautiful","again","airport","arrived","check","other","super","stayed","Needle","excellent","The","arrival","Would","things","perfect","loved","described","exactly","Space","available","Everything","awesome","fantastic","welcome","enough","responsive","absolutely","experience","highly","minute","anyone","studio","extremely","because","while","staying","Carol","Airbnb","better","being","The","every","comfortable","close","though","where","wanted","early","itself","communication","looking","instructions","distance","information","airbnb","short","light","night","lovely","enjoyed"],
        
        maxItems: 50,
      
        aspect: 'flow-center',
       
        rotate: true,
       
        colorType: 'palette',
        
        palette: color_code,
        
        style: {
          fontFamily: 'Crete Round',
       
          hoverState: {
            backgroundColor: color_code,
            borderRadius: 2,
            fontColor: 'white'
          },
         
          tooltip: {
            text: '%text: %hits',
            visible: true,
            alpha: 0.9,
            backgroundColor: "black",
            borderRadius: 2,
            borderColor: 'none',
            fontColor: 'white',
            fontFamily: 'Georgia',
            textAlpha: 1
          }
        }
      },
    };
 
    zingchart.render({ 
   
      id: 'comment', 
      data: myConfig,
      width: '100%' 
    });
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
	 Security_Deposit(Initial_Neighborhood_Value);
	 Top_Amenities(Initial_Neighborhood_Value);
	 Property_Type(Initial_Neighborhood_Value);
	 Room_Type(Initial_Neighborhood_Value);
	 Bed_Type(Initial_Neighborhood_Value);
	 Cancellation(Initial_Neighborhood_Value);
	 accom_bath_bedroom_beds(Initial_Neighborhood_Value);
	 host_listing(Initial_Neighborhood_Value);
	 reviews_rating(Initial_Neighborhood_Value);
	 host_visual_pie(Initial_Neighborhood_Value);
	 host_visual(Initial_Neighborhood_Value);
	 reviews_comments(Initial_Neighborhood_Value);
  });
}

function optionChanged(OnClick_Value) {
	 Listing_Price(OnClick_Value);
	 Security_Deposit(OnClick_Value);
	 Top_Amenities(OnClick_Value);
	 Property_Type(OnClick_Value);
	 Room_Type(OnClick_Value);
	 Bed_Type(OnClick_Value);
	 Cancellation(OnClick_Value);
	 accom_bath_bedroom_beds(OnClick_Value);
	 host_listing(OnClick_Value);
	 reviews_rating(OnClick_Value);
	 host_visual_pie(OnClick_Value);
	 host_visual(OnClick_Value);
	 reviews_comments(OnClick_Value);
}	 
init();