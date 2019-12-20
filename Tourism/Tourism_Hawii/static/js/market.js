function marketComposition(sample){
  var data_USWEST=[];
  var data_USEAST=[];
  var data_JAPAN=[];
  var data_CANADA=[];
  var data_EUROPE=[];
  var data_OCEANIA=[];
  var data_OtherASIA=[];
  var data_OTHER=[];
  var origin=["US-West", "US-East", "Japan", "Canada", "Europe","Oceania","Other Asia","Other"];
  Plotly.d3.csv('/static/js/market.csv',function (err, data) {
    //if (error) return console.warn(error);

    // data.forEach(function(samp) {
    // samp.visitors= +samp.visitors;
    // console.log(samp.visitors)
    // });
    sample = +sample;
    function selectYear(person) {
        return person.year=="sample";
      }
      data.filter(selectYear);
      for (var j = 0; j < data.length; j++) {
        if (data[j].year==sample) {
            if (data[j].place=="USWEST"){
                data_USWEST.push(data[j].visitorts);
                //console.log(data_US_West);
            }
            else if (data[j].place=="USEAST") {
              data_USEAST.push(data[j].visitors)
            }
            else if (data[j].place=="JAPAN") {
              data_JAPAN.push(data[j].visitors);
            }
            else if (data[j].place=="CANADA") {
               data_CANADA.push(data[j].visitors);
            }  
            else if (data[j].place=="EUROPE") {
              data_EUROPE.push(data[j].visitors);
           }  
           else if (data[j].place=="OCEANIA") {
            data_OCEANIA.push(data[j].visitors);
           }
           else if (data[j].place=="OtherASIA") {
              data_OtherASIA.push(data[j].visitors);
           }
           else if (data[j].place=="OTHER") {
            data_OTHER.push(data[j].visitors);
           }
      
           

          
        var su=[];
        su.push(sum(data_USWEST));
        su.push((sumdata_USEAST));
        su.push(sum(data_JAPAN));
        su.push((sumdata_CANADA)); 
        su.push(sum(data_OCEANIA));
        su.push(sum(data_OtherASIA));
        su.push(sum(data_OTHER));
        console.log("=====",su)
      }
      }
      function sum(listt) {
        var total=0;
        listt.forEach(x => total +=x)
        return total
      }
    
       
  
  var data = [{
      values: su,
      labels: ["US-West", "US-East", "Japan", "Canada", "Europe","Oceania","Other Asia","Other"],
      type: "pie"
    }];

  var layout = {
    height: 400,
    width: 500
  };

  Plotly.newPlot("bubble", data, layout);
  });
}
