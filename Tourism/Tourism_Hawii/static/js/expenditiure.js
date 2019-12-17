var Maui_data=[];
var Hawaii_data=[];
var Kauai_data=[];
var Honolulu_data=[];
var SF_data_2016=[];
var Seattle_data_2016=[];
var Phonix_data_2016=[];
var Honolulu_data_2016=[];

Plotly.d3.csv("/static/js/pricesIslands.csv", function(tvData) {
  for (var i=0;i<tvData.length;i++) {
    if (tvData[i].island=="Maui") {
      Maui_data.push(tvData[i])
    }
    else if (tvData[i].island=="Hawaii") {
      Hawaii_data.push(tvData[i])
    }
    else if (tvData[i].island=="Kauai") {
      Kauai_data.push(tvData[i])
    }
    else if (tvData[i].island=="Honolulu") {
      Honolulu_data.push(tvData[i])
    }
    else if (tvData[i].island=="Honolulu_2016") {
      Honolulu_data_2016.push(tvData[i])
    }
    else if (tvData[i].island=="SF_2016") {
      SF_data_2016.push(tvData[i])
    }
    else if (tvData[i].island=="Seattle_2016") {
      Seattle_data_2016.push(tvData[i])
    }
    else {
      Phonix_data_2016.push(tvData[i])
    }
  //  category=Maui_data.map(i =>i.Category)
  //  Maui_exp=Maui_data.map(i =>i.Expenditures)
  //  Hawaii_exp=Hawaii_data.map(i =>i.Expenditures)
  //  Kauai_exp=Kauai_data.map(i =>i.Expenditures)
  //  Honolulu_exp=Honolulu_data.map(i =>i.Expenditures)
  //  Honolulu_exp_2016=Honolulu_data_2016.map(i =>i.Expenditures)
  //  SF_exp_2016=SF_data_2016.map(i =>i.Expenditures)
  //  Seattle_exp_2016=Seattle_data_2016.map(i =>i.Expenditures)
  //  Phonix_exp_2016=Phonix_data_2016.map(i =>i.Expenditures)

    var category=Maui_data.map(i =>i.Category);
    var Maui_exp=Maui_data.map(i =>i.Expenditures);
    var Hawaii_exp=Hawaii_data.map(i =>i.Expenditures);
    var Kauai_exp=Kauai_data.map(i =>i.Expenditures);
    var Honolulu_exp=Honolulu_data.map(i =>i.Expenditures);
    var Honolulu_exp_2016=Honolulu_data_2016.map(i =>i.Expenditures);
    var SF_exp_2016=SF_data_2016.map(i =>i.Expenditures);
    var Seattle_exp_2016=Seattle_data_2016.map(i =>i.Expenditures);
    var Phonix_exp_2016=Phonix_data_2016.map(i =>i.Expenditures);
  }
  console.log(Honolulu_exp);

  var trace1={
    x: category,
    y: Maui_exp,
    name: "Maui",
    type:"bar"
  };
  var trace2={
    x: category,
    y: Hawaii_exp,
    name:"Hawaii",
    type:"bar"
  };
  var trace3={
    x: category,
    y: Kauai_exp,
    name: "Kauiai",
    type:"bar"
  };
  var trace4={
    x: category,
    y: Honolulu_exp,
    name: "Honolulu",
    type:"bar"
  };
  data=[trace1,trace2,trace3,trace4];
  var layout={
    title: "VISITOR EXPENDITURES by place"
  }
  Plotly.newPlot("exp_bars",data,layout)


  var trace5 = {
    x: category,
    y: Honolulu_exp_2016,
    type: "scatter",
    name: "Honolulu",
    marker: {
      color: "blue",
      symbol: "cross"
    }
  };
  var trace6 = {
    x: category,
    y: SF_exp_2016,
    type: "scatter",
    name: "SF",
    marker: {
      color: "red",
      symbol: "cross"
    }
  };
  var trace7 = {
    x: category,
    y: Seattle_exp_2016,
    type: "scatter",
    name: "Seattle",
    marker: {
      color: "orange",
      symbol: "cross"
    }
  };
  var trace8 = {
    x: category,
    y: Phonix_exp_2016,
    type: "scatter",
    name: "Phonix",
    marker: {
      color: "green",
      symbol: "cross"
    }
  };
  //Create the data array for the plot
  var data = [trace5, trace6, trace7,trace8];

  // Define the plot layout
  var layout = {
    title: "Expenditures comparison by cities",
    yaxis: { title: "expenditures" }
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.plot("plot", data, layout);



});