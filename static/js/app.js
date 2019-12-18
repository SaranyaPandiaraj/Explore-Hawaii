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
    var security_deposit = data;
    var trace3 = {
      x: security_deposit,
	  y: [0,100,200,300,400,500],
      type: "bar",
      marker: {
				cmax: 50, 
				cmin: 0, 
				colorbar: {}, 
				color: color_code ,
				colorscale: 'Jet' 
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
      marker: {
        cmax: 50, 
		cmin: 0,  
        colorbar: {}, 
		colors: color_code ,
		colorscale: 'Jet' 
      }
    }];
    var layout2 = {
      title: "Property Types",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
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
		  plot_bgcolor:'rgba(0,0,0,0)'
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
      plot_bgcolor:'rgba(0,0,0,0)'
    };
    // Create pie chart
    Plotly.newPlot('bed', trace5, layout5);
  });
} 

function accom_bed_bath_bed(neighborhood) {
  
  var accom_bed_bath_bed_Url = `/accom_bed_bath_bed/${neighborhood}`;

  d3.json(accom_bed_bath_bed_Url).then(function(accom_bed_bath_bed) {
 
console.log(accom_bed_bath_bed); 


    var accom_keys = [];
    var accom_values = [];
    
    for (var k in accom_bed_bath_bed[0]) {
      accom_keys.push(k);
      accom_values.push(accom_bed_bath_bed[0][k])};
	  
	var bed_keys = [];
    var bed_values = [];
    
    for (var k in accom_bed_bath_bed[0]) {
      bed_keys.push(k);
      bed_values.push(accom_bed_bath_bed[0][k])};

	var bath_keys = [];
    var bath_values = [];
    
    for (var k in accom_bed_bath_bed[0]) {
      accom_keys.push(k);
      accom_values.push(accom_bed_bath_bed[0][k])};

	var accom_keys = [];
    var accom_values = [];
    
    for (var k in accom_bed_bath_bed[0]) {
      accom_keys.push(k);
      accom_values.push(accom_bed_bath_bed[0][k])};  
 
 
    var trace6 = [{
      y: accom_values,
      x: accom_keys,
      type: "bar",
      marker: {
        cmax: 50, 
		cmin: 0,  
        colorbar: {}, 
		color: color_code ,
		colorscale: 'Jet' 
      }
    }];
    var layout6 = {
      title: "accom_bed_bath_bed",
	  paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    };
    // Create pie chart
    Plotly.newPlot('accom_bed_bath_bed', trace6, layout6);
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
	 accom_bed_bath_bed(Initial_Neighborhood_Value);
  });
}

function optionChanged(OnClick_Value) {
	 Listing_Price(OnClick_Value);
	 Security_Deposit(OnClick_Value);
	 Top_Amenities(OnClick_Value);
	 Property_Type(OnClick_Value);
	 Room_Type(OnClick_Value);
	 Bed_Type(OnClick_Value);
	 accom_bed_bath_bed(OnClick_Value);
}	 
init();