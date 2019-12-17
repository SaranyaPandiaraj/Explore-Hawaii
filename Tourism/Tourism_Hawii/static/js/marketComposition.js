function init() {
    var data = [{
      values: data_1990,
      labels: ["US-West", "US-East", "Japan", "Canada", "Europe","Oceania","Other Asia","Latin America","Other"],
      type: "pie"
    }];
  
    var layout = {
      height: 400,
      width: 500
    };
  
    Plotly.plot("pie", data, layout);
  }
  
  function updatePlotly(newdata) {
    var PIE = document.getElementById("pie");
    Plotly.restyle(PIE, "values", [newdata]);
  }
  
  function getData(dataset) {
    Plotly.d3.csv('/static/js/market.csv', function (err, data) {
      //if (error) return console.warn(error);
  
      data.forEach(function(samp) {
      samp.Totalamount= +samp.Totalamount;
      });
      sample = +sample;
      function selectYear(person) {
          return person.year=="sample";
        }
        data.filter(selectYear);
    var data = [];
    switch (dataset) {
    case "dataset1":
      data = data_1990;
      break;
    case "dataset2":
      data = data_1995;
      break;
    case "dataset3":
      data = data_2000;
      break;
    case "dataset4":
      data = data_2005;
      break;
    case "dataset5":
      data = data_2010;
      break;
    case "dataset6":
      data = data_2013;
      break;
    case "dataset7":
      data = data_2016;
      break;
    default:
      data = data_1990;
    }
    updatePlotly(data);
  }
  
  var data_1990=[];
  var data_1995=[];
  var data_2000=[];
  var data_2005=[];
  var data_2010=[];
  var data_2013=[];
  var data_2016=[];
  var origin=["US-West", "US-East", "Japan", "Canada", "Europe","Oceania","Other Asia","Latin America","Other"]
  
  Plotly.d3.csv("marketComp.csv", function(tvData) {
    for (var i=0;i<tvData.length;i++) {
      var d=tvData[i]
      data_1990.push(d["1990"]);
      data_1995.push(d["1995"]);
      data_2000.push(d["2000"]);
      data_2005.push(d["2005"]);
      data_2010.push(d["2010"]);
      data_2013.push(d["2013"]);
      data_2016.push(d["2016"]);
    }
    console.log(data_2016);
    init();
  })