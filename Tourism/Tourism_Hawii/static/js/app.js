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
      years.reverse();
        
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
      
      yearlyVisitors(firstYear);
      //marketComposition(newSample);
      crimeplot();
      
  });
      
}
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  yearlyVisitors(newSample);
  //marketComposition(newSample);
  crimeplot();
}
init();
    