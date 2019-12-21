d3.json("/static/geojson/Airbnb.geojson", function(json_data) {
	 
var airbnb_data = json_data.features;



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
							radius: Data.properties.calculated_host_listings_count * 15,
							fillColor: Colour(Data.properties.calculated_host_listings_count),
							fillOpacity:.7,
							stroke:false,
						})
					}
				});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 20,
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

var LeafIcon = L.Icon.extend({
    options: {
       iconSize:     [45, 45],
       shadowSize:   [45, 45],
       iconAnchor:   [45, 45],
       shadowAnchor: [45, 45],
       popupAnchor:  [-45, -45]
    }
});

var greenIcon = new LeafIcon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/nature-emoji/50/Island-512.png',
    shadowUrl: 'https://cdn3.iconfinder.com/data/icons/nature-emoji/50/Island-512.png'
})

var LeafIcon1 = L.Icon.extend({
    options: {
       iconSize:     [35, 35],
       shadowSize:   [35, 35],
       iconAnchor:   [35, 35],
       shadowAnchor: [35, 35],
       popupAnchor:  [-35, -35]
    }
});

var greenIcon1 = new LeafIcon1({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/map-pins-2/256/21-512.png',
    shadowUrl: 'https://cdn4.iconfinder.com/data/icons/map-pins-2/256/21-512.png'
})

var baseMaps = {
	"Outdoors": outdoors,
	"Satellite": satellite,
	"Dark Map": darkmap,
	"Light Map": lightmap
};

var Rest_Cafe = new L.LayerGroup();
var Popular_Places = new L.LayerGroup();

var overlayMaps ={
	"Popular Airbnb Listings": Features_Info,
	"Popular Rest/Cafe": Rest_Cafe,
    "Popular Places in Hawaii":Popular_Places
};

var map = L.map("map", {
	center: [20.9933, -156.33],
	zoom: 8,
	layers: [outdoors, Features_Info]
}); 

d3.json("/static/geojson/Rest_Cafe.geojson", function(Rest_Cafe_Data) {
	L.geoJSON(Rest_Cafe_Data,{onEachFeature: function(Data,layer){
						layer.bindPopup(`<h2> <center>${Data.properties.name} </center></h2>\
						<hr><h3>Rating : ${Data.properties.rating}</h3>\
						<h3>Place : ${Data.properties.city}</h3>\
						<h3>Category : ${Data.properties.category}</h3>\
						<h3>Address : ${Data.properties.address}</h3>`);
					},
		pointToLayer:function(Data,latlng){
						return new L.marker(latlng,{
							icon: greenIcon1,
						})
					}
	})
	.addTo(Rest_Cafe);
});

d3.json("/static/geojson/Popular_Place.geojson", function(Pop_Place_Data) {
	L.geoJSON(Pop_Place_Data,{onEachFeature: function(Data,layer){
						layer.bindPopup(`<h2> <center>${Data.properties.place} </center></h2>\
											<hr><h3>${Data.properties.information}</h3>`);

					},

			pointToLayer:function(Data,latlng){
						return new L.marker(latlng,{
							icon: greenIcon,
						})
					}
	})

 
	.addTo(Popular_Places);

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
