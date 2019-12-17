function buildCharts(sample) {
    var Maui_data=[];
    var Oahu_data=[]
    var Kauai_data=[]
    var Hawaii_data=[]
    var Others_data=[]
    var summa=[];
    var isl=["MAUI and MAUI CTY", "O'AHU", "KAUA'I", "HAWAI'I ISLAND","Others"]
    Plotly.d3.csv('/static/js/VisitorsNew.csv', function (err, data) {
        //if (error) return console.warn(error);
        data.forEach(function(samp) {
        samp.Totalamount= +samp.Totalamount;
        });
        sample = +sample;
        function selectYear(person) {
            return person.year=="sample";
          }
          
        data.filter(selectYear);
        for (var j = 0; j < data.length; j++) {
            if (data[j].year==sample) {
                if ((data[j].island=="MAUI") || (data[j].island=="MAUI CTY")) {
                    Maui_data.push(data[j].Totalamount)
                }
                else if (data[j].island=="O'AHU") {
                     Oahu_data.push(data[j].Totalamount)
                }
                else if (data[j].island=="KAUA'I") {
                    Kauai_data.push(data[j].Totalamount)
                }
                else if (data[j].island=="HAWAI'I ISLAND") {
                    Hawaii_data.push(data[j].Totalamount)
                }  
            else  {
                Others_data.push(data[j].Totalamount)
            } 
    var summa=[];
    summa.push(sum(Maui_data));
    summa.push(sum(Oahu_data));
    summa.push(sum(Kauai_data));
    summa.push(sum(Hawaii_data));
    summa.push(sum(Others_data));     
    }
  }
  function sum(listt) {
    var total=0;
    listt.forEach(x => total +=x)
    return total
  }
  var data = [{
    values: summa,
    labels: isl,
    type: "pie",
    hole: 0.35,
    direction: 'clockwise',
    pull: [0, 0, 0.1, 0, 0, 0]
  }];
  var layout = {
    height: 400,
    width: 500
  };  
  Plotly.plot("pie", data, layout);
    });
}
function init(){
    var selector = d3.select("#selDataset");
     Plotly.d3.csv('/static/js/VisitorsNew.csv', function (error,islanddata) {
      if (error) return console.warn(error);
      var yearData = {};
      function getData(year) {
        var byYear;
        if (!(byYear = yearData[year])) {;
          byYear = yearData[year] = {};
        }
      }
      for (var i = 0; i < islanddata.length; i++) {
        var datum = islanddata[i];
        getData(datum.year);
        }
        var years = Object.keys(yearData);
        years=years.slice(-10)
          
        // cast the data from the csv as numbers
        console.log(years);
        years.forEach(function(data) {
        selector
            .append("option")
            .text(data)
            .property("value",data);
        });
        const firstYear = years[0];
        console.log(firstYear)
        buildCharts(firstYear);
        //build(firstYear);
    });
        
}
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
   // build(firstYear);
}
init();
      
      
    
    