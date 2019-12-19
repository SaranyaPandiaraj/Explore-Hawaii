d3.json("/static/geojson/Airbnb.geojson", function(json_data) {
	 
var airbnb_data = json_data.features;
console.log(airbnb_data);
var Features_Info = L.geoJSON(airbnb_data,{
					onEachFeature: function(Data,layer){
						layer.bindPopup(`<h2> <center>${Data.properties.name} </center></h2>\
						<hr><h3>Name : ${Data.properties.name}</h3>\
						<h3>Neighbourhood : ${Data.properties.neighbourhood_group}</h3>\
						<h3>Place : ${Data.properties.neighbourhood}</h3>\
						<h3>Room Type : ${Data.properties.room_type}</h3>\
						<h3>Price($) : ${Data.properties.price}</h3>\
						<h3>Minimun Nights : ${Data.properties.minimum_nights}</h3>`);
					},
					pointToLayer:function(Data,latlng){
						return new L.circle(latlng,{
							radius: Data.properties.calculated_host_listings_count * 1,
							fillColor: Colour(Data.properties.calculated_host_listings_count),
							fillOpacity:.7,
							stroke:false,
						})
					}
				});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});
				
var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
accessToken:API_KEY
  });
  
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
accessToken:API_KEY
  });

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
accessToken: API_KEY
});

var baseMaps = {
	"Outdoors": outdoors,
	"Satellite": satellite,
	"Dark Map": darkmap,
	"Light Map": lightmap
};

var TectonicPlates = new L.LayerGroup();

var overlayMaps ={
	"Airbnb Listings": Features_Info,
	"tectonic Plates": TectonicPlates
};

var map = L.map("map", {
	center: [21.1933, -156.0239],
	zoom: 7.0,
	layers: [outdoors, Features_Info, TectonicPlates]
}); 

d3.json("https://raw.githubusercontent.com/fraxen/TectonicPlates/master/GeoJSON/PB2002_boundaries.json", function(TectonicPlatesData) {
	L.geoJSON(TectonicPlatesData,{
		color:"orange",
		weight:3
	})
	.addTo(TectonicPlates);
});

L.control.layers(baseMaps, overlayMaps, {
collapsed: false
  }).addTo(map);
			

				

});				

function Colour(d){
  return d > 5 ? "#f21414":
  d  > 4 ? "#e55b00":
  d > 3 ? "#ffae19":
  d > 2 ? "#e19865":
  d > 1 ? "#ffff75":
          "#81d681";
}