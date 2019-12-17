var sample=2016;
var data_US_West=[];
var data_US_East=[];
var data_Japan=[];
var data_canada=[];
var data_Europe=[];
var data_Oceania=[];
var data_Other_Asia=[];
var data_Other=[];


var origin=["US-West", "US-East", "Japan", "Canada", "Europe","Oceania","Other Asia","Other"]
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
      for (var j = 0; j < data.length; j++) {
        if (data[j].year==sample) {
            if (data[j].place=="US-West"){
                data_US_West.push(data[j].visitorts)
            }
            else if (data[j].place=="US-East") {
              data_US_East.push(data[j].visitors)
            }
            else if (data[j].place=="Japan") {
              data_Japan.push(data[j].visitors)
            }
            else if (data[j].place=="Canada") {
               data_canadas.push(data[j].visitors)
            }  
        var su=[];
        su.push(sum(data_US_West));
        su.push(sum(data_US_East));
        su.push(sum(data_Japan));
        su.push(sum(data_canada));  
        
        }
      }
      function sum(listt) {
        var total=0;
        listt.forEach(x => total +=x)
        return total
      }
var data = [{
    values: su,
    labels: ["US-West", "US-East", "Japan", "Canada", "Europe","Oceania","Other Asia","Latin America","Other"],
    type: "pie"
  }];

var layout = {
    height: 400,
    width: 500
  };

Plotly.plot("extra", data, layout);
});
