// var visitors_data={
//     "year_2010" : [2924430, 1610421, 1239307,	405040,	112765,	161060,	167669,	19791,	276411],
//     "year_2011" : [2994731,	1642279, 1241805, 477564,	119825,	209976,	211028,	22116,	255073],
//     "year_2012" : [3178824,	1699625,	1465654,	499144,	129252,	273039,	289977,	25519,	306110],
//     "year_2013" : [3211429,	1701852,	1518517,	517011,	136805,	355568,	335072,	30265,	196955],
//     "year_2014" : [3255475,	1713085,	1511739,	522761,	142366,	371367,	368110,	29800,	281639],
//     "year_2015" : [3507652,	1803670,	1482304,	512323,	145019,	399619,	393833,	27978,	290621],
//     "year_2016" : [3664150,	1892768,	1487979,	469314,	143922,	390364,	448414,	26075,	298817]
// };

// var US_West_data={ "2010": visitors_data.year_2010[0], "2011": visitors_data.year_2011[0], "2012": visitors_data.year_2012[0], "2013": visitors_data.year_2013[0], "2014": visitors_data.year_2014[0], "2015": visitors_data.year_2015[0], "2016": visitors_data.year_2016[0]};
// var US_East_data={ "2010": visitors_data.year_2010[1], "2011": visitors_data.year_2011[1], "2012": visitors_data.year_2012[1], "2013": visitors_data.year_2013[1], "2014": visitors_data.year_2014[1], "2015": visitors_data.year_2015[1], "2016": visitors_data.year_2016[1]};
// var Japan_data={ "2010": visitors_data.year_2010[2], "2011": visitors_data.year_2011[2], "2012": visitors_data.year_2012[2], "2013": visitors_data.year_2013[2], "2014": visitors_data.year_2014[2], "2015": visitors_data.year_2015[2], "2016": visitors_data.year_2016[2]};
// var Canada_data={ "2010": visitors_data.year_2010[3], "2011": visitors_data.year_2011[3], "2012": visitors_data.year_2012[3], "2013": visitors_data.year_2013[3], "2014": visitors_data.year_2014[3], "2015": visitors_data.year_2015[3], "2016": visitors_data.year_2016[3]};
// var Other_data={ "2010": visitors_data.year_2010[4]+visitors_data.year_2010[5]+visitors_data.year_2010[6]+visitors_data.year_2010[7]+visitors_data.year_2010[8], 
//                  "2011": visitors_data.year_2011[4]+visitors_data.year_2011[5]+visitors_data.year_2011[6]+visitors_data.year_2011[7]+visitors_data.year_2011[8],
//                  "2012": visitors_data.year_2012[4]+visitors_data.year_2012[5]+visitors_data.year_2012[6]+visitors_data.year_2012[7]+visitors_data.year_2012[8], 
//                  "2013": visitors_data.year_2013[4]+visitors_data.year_2013[5]+visitors_data.year_2013[6]+visitors_data.year_2013[7]+visitors_data.year_2013[8],
//                  "2014": visitors_data.year_2014[4]+visitors_data.year_2014[5]+visitors_data.year_2014[6]+visitors_data.year_2014[7]+visitors_data.year_2014[8],
//                  "2015": visitors_data.year_2015[4]+visitors_data.year_2015[5]+visitors_data.year_2015[6]+visitors_data.year_2015[7]+visitors_data.year_2015[8],
//                  "2016": visitors_data.year_2016[4]+visitors_data.year_2016[5]+visitors_data.year_2016[6]+visitors_data.year_2016[7]+visitors_data.year_2016[8] }

// console.log(Object.keys(US_West_data));

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
