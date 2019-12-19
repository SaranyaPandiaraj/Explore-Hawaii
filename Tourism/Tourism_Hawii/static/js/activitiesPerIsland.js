var sightseeing=[];
var recreation=[];
var entertainment=[];
var shopping=[];
var culture=[];
var transportation=[];
var island=[];

Plotly.d3.csv("/static/js/activities.csv", function(tvData) {
  for (var i=0;i<tvData.length;i++) {
    island.push(tvData[i].island);
    sightseeing.push(tvData[i].sightseeing);
    recreation.push(tvData[i].recreation);
    entertainment.push(tvData[i].entertainment);
    shopping.push(tvData[i].shopping);
    culture.push(tvData[i].culture);
    transportation.push(tvData[i].transportation);

  }
  console.log(transportation);

  var trace1={
    x: island,
    y: sightseeing,
    name: "sightseeing (drive around, scenic views, whale watching,visiting communities etc.)",
    type:"bar"
  };
  var trace2={
    x: island,
    y: recreation,
    name:"recreations (beach, swimming, parks, running etc.)",
    type:"bar"
  };
  var trace3={
    x: island,
    y: entertainment,
    name: "entertainment & dining (restaurant, live music, ethnic dining etc.)",
    type:"bar"
  };
  var trace4={
    x: island,
    y: shopping,
    name: "shopping (local shops,malls, hotel stores etc.)",
    type:"bar"
  };
  var trace5={
    x: island,
    y: culture,
    name: "history, culture, fine arts (historic place, museum, festival etc.)",
    type:"bar"
  };
  var trace6={
    x: island,
    y: transportation,
    name: "transportation (rent, airport shuttle, tour bus etc.)",
    type:"bar" 
  };
  data=[trace1,trace2,trace3,trace4,trace5,trace6];
  var options={
    title: " Visitors Participation in Activities",
    width:1500,
    height:400,
    legend: {position:"right", maxLines:3}

  }

  
  
  Plotly.newPlot("bars",data,options)


});
