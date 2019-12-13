// Load data from hours-of-tv-watched.csv
d3.csv("./hawii_tourism.csv", function(error, hawiiData) {
    if (error) return console.warn(error);
  
    console.log(hawiiData);
  
    // log a list of names
  var names = hawiiData.map(data => data.Indicator);
  console.log("names", names["Hawaii Tourism Authority"]);
  

  // Cast each hours value in tvData as a number using the unary + operator
  

});

