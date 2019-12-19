var neighbourhoodDimension;
var neighbourhoodGroupDimension;
var neighbourhoodCountsMap;
var neighbourhoodGroupCountsMap;
var neighbourhoodMap;
var listingsMap;
var cityCount;
var geoCount;
var recentReviewsWithThresholdDimension;
var hostListingCountDimension;
var map;
var reduceDimension;
var g;
var g_boundaries;
var svg;
var oldZoom = 11;

var hostDimension;    
var hostGroup;

var reviewNodes;
var reviewFeatures;
var animationPositionNode;
var reviewsMonthDimension;
var reviewsListingDimension;
var hostListingCountGroup;
var multiListingDimension;
var reviewsNest;
var animating = false;
var animatingPaused = false;
var animationDateRange;
var animationDateIndex;
var animationPositionNode;

var availability365Chart;
var availability365Group;
var availabilityClassificationFilterDimension;
var roomTypeFilterDimension;
var roomTypeChart;
var listingsPerHostChart;
var hoverPinned = false;
var pinnedListing;

var neighbourhoodBoundaryFeatures;
var neighbourhoodBoundaryPaths;
var neighbourhoodBoundaryLabels;
var neighbourhoodBoundaryLabelText;
var neighbourhoodBoundaryLabelTextGlow;
var neighbourhoodBoundaryLabelBackground;

//City variables - need to make this more object oriented
var city;
var reviewsChart;
var listingsFile;
var reviewsFile;
var centerMap;
var initialZoom;
var neighbourhoodZoom;
var dataDate = new Date(2014, 6, 1);//For New York scrape on 2015/1/1
var neighbourhoodsName = "Neighbourhood"
var neighbourhoodGroupsNames = null;
var showCityViewOnMapsForMobile = false; //For cities with lots of listings, we don't want to show city views on mobile maps
var INITIAL_NEIGHBOURHOOD = null;

var neighbourhoodMouseDown;
var neighbourhoodDrag;

var neighbourhoodClickedOnce = false;
var neighbourhoodClickTimer;

var currentNeighbourhood = "";

//Some variables we use to control degraded functionality (some depending on capability, others depending on issues with the platform/size)
//Show the Map - we turn this off only if the browser width is narrow AND the device is a mobile
var FUNCTIONALITY_MAP = true;
//whether to allow city and borough views. This is for tablets that can show a map, but not all the data points for the city
var FUNCTIONALITY_CITY_VIEW = true;

var AVAILABILITY_DAYS_LOW = 60;

var REVIEW_RATE = 0.3;
var AVERAGE_NIGHTS = 5;
var MAXIMUM_OCCUPANCY = 0.7;

var FORMAT_SHORT_DATE = "%m/%d/%Y";

var ZOOM_ON_LISTINGS_ONLY = false; //Some shapefiles have problems when we try to zoom in on features (neighbourhood). For those, we can disable by setting this to true.

formatThousands = d3.format(",");
formatDollars = d3.format("$");
formatPercent = d3.format("%,1");   
formatDate = d3.time.format(FORMAT_SHORT_DATE);
formatLongDate = d3.time.format("%B %d %Y");
formatMonthYear = d3.time.format("%B, %Y");
formatTimeStamp = d3.time.format("%H:%M:%S");
formatDateDayMonth = d3.time.format("%B %d");
formatDateYear = d3.time.format("%Y");

var res = {
    listings : "listings",
    Entire_home_apt: "Entire home/apt",
    number_of_days_available_in_year: "number of days available in year",
    listings_per_host: "listings per host",
    reviews: "reviews",
    date: "date",
    show: "Show",
    hide: "Hide",
    numberOfListingsWhereTheHostHas: "Number of listings where the host has",
    otherListings: "other listing(s)",
    NA: "N/A",
    low: 'low',
    high: 'high',
    listingTypes: {
      'Entire home/apt': 'Entire home/apt',
      'Private room': 'Private room',
      'Shared room': 'Shared room'
    },
    numberOfReviewsIn: "Number of reviews in",
    numberOfListingsWith: "Number of listings with",
    daysAvailableInTheNext365Days: "day(s) available in the next 365 days",
    availability: "availability"
};

function setFormatShortDate(format){
    FORMAT_SHORT_DATE = format;
    formatDate = d3.time.format(FORMAT_SHORT_DATE);
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};



function setupMap(_centreMap, _initialZoom, _neighbourhoodZoom){
    
    //See if the responsive CSS has hidden the map
    var mapIsVisible = (d3.select("#map").style("visibility") == "visible");
    
    if (isMobile.any()) {
        if (mapIsVisible){
            //We're on a mobile device, but the map is there, so reduce functionality to we don't show the city views
            FUNCTIONALITY_CITY_VIEW = showCityViewOnMapsForMobile;
        }
        else {
            //We're on a mobile device and the map is not visible. It's never going to resize, so downgrade the functionality
            FUNCTIONALITY_MAP = false;
        }
    }
    debugLog("FUNCTIONALITY_MAP: " + FUNCTIONALITY_MAP);
    debugLog("FUNCTIONALITY_CITY_VIEW: " + FUNCTIONALITY_CITY_VIEW);
    
    if (FUNCTIONALITY_MAP){
        centreMap = _centreMap;
        if (_initialZoom)
            initialZoom = _initialZoom;
        else
            initialZoom = 11;

        if (_neighbourhoodZoom)
            neighbourhoodZoom = _neighbourhoodZoom;

        map = new L.Map("map", {center: centreMap, zoom: initialZoom, maxZoom: 16, minZoom: initialZoom, scrollWheelZoom: false})
            .addLayer(new L.TileLayer("https://{s}.tiles.mapbox.com/v3/murraycox.3edcb23d/{z}/{x}/{y}.png"));//, {attribution: "©<a href='http://www.mapbox.com' target='_blank'>Mapbox</a> | ©OpenStreetMap | Locations not exact | Data: " + formatLongDate(dataDate)}));
    
        /* This is the method recommended by http://bost.ocks.org/mike/leaflet/ - need to spend some more time to get this to work
        var svg = d3.select(map.getPanes().overlayPane).append("svg"),
            g = svg.append("g").attr("class", "leaflet-zoom-hide"); */
        
         map._initPathRoot()    
        
         // We pick up the SVG from the map object
         svg = d3.select("#map").select("svg"),
         g_boundaries = svg.append("g")
            .classed({ "hidden": true, "hideLabels": true})
            .attr("id", "neighbourhoodBoundaries"),
         g = svg.append("g");

        // filters go in defs element
        var defs = g_boundaries.append("defs");
         
        // create filter with id #glow
        var filter = defs.append("filter")
            .attr("id", "glow")
            .attr("x", "-10%")
            .attr("y", "-10%")
            .attr("width", "120%")
            .attr("height", "120%");
         
        filter.append("feGaussianBlur")
            .attr("stdDeviation", "5 5")
            .attr("result", "glow");
         
        var feMerge = filter.append("feMerge");
         
        feMerge.append("feMergeNode")
            .attr("in", "glow")
        feMerge.append("feMergeNode")
            .attr("in", "glow");
        feMerge.append("feMergeNode")
            .attr("in", "glow");
    };
};
        
$(document).ready(function() {
    
    $('#filterRecentReviews').change(function() {  
        ga('send', 'event', 'filter', 'recent reviews', $(this).is(":checked") ? "true" : "false");
        filterRecentReviews($(this).is(":checked"));
    });
    
    $('#filterMultiListings').change(function() {
        if (multiListingDimension){
            ga('send', 'event', 'filter', 'multi listing', $(this).is(":checked") ? "true" : "false");
            if ($(this).is(":checked"))
                multiListingDimension.filterExact(true);
            else
                multiListingDimension.filterAll();
            dc.redrawAll("automaticRedrawGroup");
            updateStatsAndMap();
            saveViewState();
        }
    });
    
    $('#filterEntireHomes').change(function() {
        if (roomTypeFilterDimension){
            ga('send', 'event', 'filter', 'entire homes', $(this).is(":checked") ? "true" : "false");
            if ($(this).is(":checked")) {
                roomTypeFilterDimension.filterExact("Entire home/apt");
                //Also make sure there are no filters on the chart
                if (roomTypeChart.filters().length > 0)
                    roomTypeChart.filterAll();
            }
            else
                roomTypeFilterDimension.filterAll();
            dc.redrawAll("automaticRedrawGroup");
            updateStatsAndMap();
            saveViewState();
        }
    });    
    
    $('#filterHighlyAvailableLink').click(function() {
        $('#filterHighlyAvailable').prop("checked", true );
        filterHighlyAvailable(true);
    });
    
    $('#filterHighlyAvailable').change(function() {
        filterHighlyAvailable($(this).is(":checked"));
    });
    
    $('#excludeNoReviews').click(function() {
        $('#filterRecentReviews').prop("checked", true );
        filterRecentReviews(true);
    }); 
    
    $('#topHostsToggle').click(function() {
        if ($("#topHostsToggleAction").text() == res.show) {
            ga('send', 'event', 'show', 'top hosts');
            $("#topHostsToggleAction").text(res.hide);
            d3.select("#topHostsToggleIcon").classed("glyphicon-menu-down", false).classed("glyphicon-menu-up", true);
        }
        else {
            ga('send', 'event', 'hide', 'top hosts');
            $("#topHostsToggleAction").text(res.show);
            d3.select("#topHostsToggleIcon").classed("glyphicon-menu-down", true).classed("glyphicon-menu-up", false);
        }
        $("#topHostsContainer").slideToggle (500, "easeInOutElastic");//, "easeInElastic");//{ "duration": 500, "easing": "easeInElastic"});    
    });
    
    $('#loadReviews').click(function() {
        ga('send', 'event', 'load', 'reviews');
        $("#loadReviews").hide();
        $("#iconLoadingReviews").show();
        setTimeout(loadReviews, 0);
    });
    
    $('#playReviews').click(function() {
        if (!animating)
            startReviewsAnimation();
        else
            endReviewsAnimation();   
    });
    
    $('#closeHover').click(function() {
        hideHover();   
    });    
    
    if (!(FUNCTIONALITY_MAP && FUNCTIONALITY_CITY_VIEW))
        $("#alertMissingOut").addClass("mobile");
    
    $('[data-toggle="tooltip"]').tooltip();

    $('#aboutCityOpen').click(function() {

        openAboutCity();

    });

    $('#aboutCityClose').click(function() {

        ga('send', 'event', 'hide', 'about city');

        $(".narrativeContentAbout").css("display", "none");
        $("#narrativeContentAboutContainer").css("overflow", "visible");
        $("#narrativeContentAboutContainer").animate(
            {bottom: parseInt($(".narrativePanelContent").css("height")) + "px"}
            , 400 
            , function (){ 
                $("#narrativeContentAboutContainer").css("bottom", "auto"); 
                $("#aboutCityOpen").css("display", "block");
            }
        );
    });

    $('.aboutTheLawLink').click(function() {

        openAboutCity("#the-law");

    });

    
});

function openAboutCity(gotoLink){

        ga('send', 'event', 'show', 'about city');

        $("#aboutCityOpen")
            .css("display", "none");
        $("#narrativeContentAboutContainer")
            .css("bottom", parseInt($(".narrativePanelContent").css("height")) + "px");
        $("#narrativeContentAboutContainer").animate({bottom: 0}
            , 400 
            , function (){ 
                $("#aboutCityOpen").css("display", "none");
                //$("#narrativeContentAboutContainer").css("overflow", "auto");
                $(".narrativeContentAbout").css("display", "block");

                if (gotoLink) {
                    $('.narrativeContentAbout').animate({
                        scrollTop: $(gotoLink).offset().top
                    }, 400);            
                }
            }
        );

};



function filterRecentReviews(filter){
    
    if (recentReviewsWithThresholdDimension){
        if (filter)
            recentReviewsWithThresholdDimension.filterExact(true);
        else
            recentReviewsWithThresholdDimension.filterAll();
    
        dc.redrawAll("automaticRedrawGroup");
        updateStatsAndMap();
        saveViewState();
    }
};

function filterHighlyAvailable(filter) {
    if (availabilityClassificationFilterDimension){
        ga('send', 'event', 'filter', 'highly available', filter ? "true" : "false");
        if (filter)
            availabilityClassificationFilterDimension.filterExact(res.high);
        else
            availabilityClassificationFilterDimension.filterAll();
        dc.redrawAll("automaticRedrawGroup");
        updateStatsAndMap();
        saveViewState();
    }
};


function deepCopyGroup(group) {
    var deepCopyArray = [];
    group.all().forEach( function(d) { 
        deepCopyArray.push({"key": d.key, "value": d.value }) ;
    })
    return deepCopyArray;
};

function loadNeighbourhoods(neighbourhoodsFile) {
    
    if (FUNCTIONALITY_MAP)
        map.attributionControl.addAttribution("©<a href='http://www.mapbox.com' target='_blank'>Mapbox</a> | ©OpenStreetMap | Locations not exact | Data: " + formatLongDate(dataDate));
    
    d3.csv(neighbourhoodsFile, function  (airbnb_neighbourhoods) {
    
        if ( neighbourhoodGroupsNames){
            var nested_neighbourhoods = d3.nest()
                .key(function(d) { return d.neighbourhood_group; })
                .entries(airbnb_neighbourhoods);
        
            if (FUNCTIONALITY_CITY_VIEW) {
                d3.select("#geoFilters")
                    .append("option")
                        .text(city)
                        .attr("value", "");
                
                d3.select("#geoFilters").
                    append("optgroup")
                        .attr("label", neighbourhoodGroupsNames)
                        .selectAll("option.d3")
                        .data(nested_neighbourhoods)
                        .enter()
                            .append("option")
                                .text(function(d) { return d.key; })
                                .attr("value", function(d) { return "neighbourhood_group|" + d.key; });
            }
            
            d3.select("#geoFilters").selectAll("optgroup.d3")
                .data(nested_neighbourhoods)
                .enter()
                    .append("optgroup")
                        .attr("label", function(d) { return d.key; })
                        .selectAll("option")
                            .data(function(d) { return d.values; })
                            .enter()
                                .append("option")
                                    .text(function(d) { return d.neighbourhood; })
                                    .attr("value", function(d) { return d.neighbourhood; }) ;    
        }
        else
        {
            if (FUNCTIONALITY_CITY_VIEW) {
                d3.select("#geoFilters")
                    .append("option")
                        .text(city)
                        .attr("value", "");
            }
                
            d3.select("#geoFilters")
                .append("optgroup")
                    .attr("label", neighbourhoodsName == null ? "Neighbourhood" : neighbourhoodsName)
                    .selectAll("option.d3")
                    .data(airbnb_neighbourhoods)
                    .enter()
                        .append("option")
                            .text(function(d) { return d.neighbourhood; })
                            .attr("value", function(d) { return d.neighbourhood; }) ;
        }
        
        if (!isMobile.any()) 
            $("#geoFilters").select2();
        $("#geoFilters").on("change", function() {
                    loadGeo(this.value);
        });
    });
};

function loadGeo(geoName){
    currentNeighbourhood = geoName;    
    if (geoName == ""){
        ga('send', 'event', 'filter', 'city', city);
        neighbourhoodDimension.filterAll();
        if (neighbourhoodGroupsNames)     
            neighbourhoodGroupDimension.filterAll();
        geoCount = cityCount;
    }
    else if (neighbourhoodGroupsNames && (geoName.indexOf("neighbourhood_group|") >= 0)) {
        ga('send', 'event', 'filter', 'borough', geoName.split("|")[1]);
        neighbourhoodDimension.filterAll();
        neighbourhoodGroupDimension.filterExact(geoName.split("|")[1]);
        geoCount = neighbourhoodGroupCountsMap.get(geoName.split("|")[1]).value;
    }
    else {
        ga('send', 'event', 'filter', 'neighbourhood', geoName);
        neighbourhoodDimension.filterExact(geoName);
        if (neighbourhoodGroupsNames)     
            neighbourhoodGroupDimension.filterAll();
        if (neighbourhoodCountsMap.get(geoName))
            geoCount = neighbourhoodCountsMap.get(geoName).value;
        else
            geoCount = 0;  
    }
    d3.select("#geoTotalListings").text(formatThousands(geoCount));    

    if (!FUNCTIONALITY_CITY_VIEW){
        //We're at the neighbourhood view, so we need to setup the map again 
        setupMapData(geoName);
    }
    
    updateStatsAndMap();
    dc.renderAll("automaticRedrawGroup");

    if (FUNCTIONALITY_MAP) {
        if (geoName == "") {
            map.setView(centreMap, initialZoom, {pan: {animate: true, duration: 1.5, easeLinearity: 0.25}});
            g_boundaries.classed("hidden", true);

        }
        else {
            var bounds = [];
            reduceDimension.top(Infinity).forEach(function (d) {
                bounds.push(d.LatLng);
            });  

            if (neighbourhoodGroupsNames && (geoName.indexOf("neighbourhood_group|") >= 0))
                g_boundaries.classed("hidden", true);
            else
                g_boundaries.classed("hidden", false);
            var foundNeighbourhoodBoundaryFeatures  = [];
            neighbourhoodBoundaryFeatures.forEach(function(d){
                if (d.properties.neighbourhood == geoName) {
                    foundNeighbourhoodBoundaryFeatures.push(d);
                    if (!((ZOOM_ON_LISTINGS_ONLY) || (city == 'London') || (city == 'Nashville') || (city == 'Austin, Texas') || (city == 'Bruxelles') || (city == 'Sydney') || (city == 'Melbourne') || (city == 'Santa Cruz County, CA') || (city == 'Asheville') || (city == 'Geneva') || (city == 'Bologna') || (city == 'Santa Clara County, CA') || (city == 'Bordeaux') || (city == 'Clark County, NV') )){ //a bug for London and other cites, need to research
                        // push the bounds of the polygon so it can be centred too
                        var boundaryCentroid = d3.geo.centroid(d);
                        var boundaryLatLng = new L.LatLng(boundaryCentroid[1], boundaryCentroid[0])
                        bounds.push(boundaryLatLng);
                    }
                }
            });
            var selectedNeighbourhoodBoundaryPaths = g_boundaries.selectAll("path")
                .data(foundNeighbourhoodBoundaryFeatures, function(d){return d.properties.neighbourhood;});

            selectedNeighbourhoodBoundaryPaths
                .classed("selected", true);

            selectedNeighbourhoodBoundaryPaths
                .exit()
                .classed("selected", false);

            var selectedNeighbourhoodBoundaryLabelContainers = g_boundaries.selectAll("g.labelContainers")
                .data(foundNeighbourhoodBoundaryFeatures, function(d){return d.properties.neighbourhood;});

            selectedNeighbourhoodBoundaryLabelContainers
                .classed("selected", true);

            selectedNeighbourhoodBoundaryLabelContainers
                .exit()
                .classed("selected", false);
            if (!neighbourhoodZoom)
                map.fitBounds(bounds, {  pan: {animate: true, duration: 1.5, easeLinearity: 0.25}});
            else
                map.fitBounds(bounds, {  pan: {animate: true, duration: 1.5, easeLinearity: 0.25}, maxZoom: neighbourhoodZoom});
 

        }
    }
};

function loadListings(listingsFile) {
    d3.csv(listingsFile, function  (airbnb_data) {
        
        airbnb_data.forEach(function (d) {
            d.price = +d.price; // coerce to number
            d.reviews_per_month = +d.reviews_per_month;
            d.number_of_reviews = +d.number_of_reviews;
            d.last_review = d.last_review == "" ? null : d3.time.format('%Y-%m-%d').parse(d.last_review);
            d.last_review_month = d.last_review ?  d3.time.month(d.last_review) : null;
            d.availability_365 = +d.availability_365;
            d.minimum_nights = +d.minimum_nights;
            d.calculated_host_listings_count = +d.calculated_host_listings_count;
            d.bookings_per_month = +d3.round(d.reviews_per_month / REVIEW_RATE, 1);
            d.estimated_occupancy = +d3.round(d3.min([(d.bookings_per_month * d3.max([d.minimum_nights, AVERAGE_NIGHTS])) / 30, MAXIMUM_OCCUPANCY]), 3);
            d.estimated_nights_per_year = +d3.round(d.estimated_occupancy * 365, 0);
            d.estimated_income_per_month = +d3.round(d.estimated_occupancy * 30 * d.price, 0);
        });
        
        cityCount = airbnb_data.length;
        geoCount = cityCount;
        d3.select("#geoTotalListings").text(formatThousands(cityCount));
        
        /* Run data through crossfilter */
        var ndx = crossfilter(airbnb_data);
        
        //Create a dimension for currently filtered stats and counts (use d.id so we can use it as a data source with the map too)
        reduceDimension = ndx.dimension(function (d) { return "Reduced"; });
        //Create a map of the listings to use later
        listingsMap = d3.map(reduceDimension.top(Infinity), function(d) { return d.id; }); 
        reduceGroup = reduceDimension.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count; 
                switch(v.room_type) {
                        case "Entire home/apt":
                            ++p.entire_home_count;
                            break;
                        case "Private room":
                            ++p.private_room_count;
                            break;
                        case "Shared room":
                            ++p.shared_room_count;
                            break;
                }
                p.price_per_night_sum += v.price;
                p.price_per_night = d3.round(p.price_per_night_sum / p.count);
                p.estimated_income_per_month_sum += v.estimated_income_per_month;
                p.estimated_income_per_month = d3.round(p.estimated_income_per_month_sum / p.count);                
                p.number_of_reviews += v.number_of_reviews;
                p.reviews_per_month_sum += v.reviews_per_month;
                p.reviews_per_month = d3.round(p.reviews_per_month_sum / p.count, 1);
                p.availability_365_sum += v.availability_365;
                p.availability_365 = d3.round(p.availability_365_sum / p.count, 1);
                if (v.availability_365 <= AVAILABILITY_DAYS_LOW)
                    ++p.availability_low_count;
                else
                    ++p.availability_high_count;
                p.estimated_nights_per_year_sum += v.estimated_nights_per_year;
                p.estimated_nights_per_year = d3.round(p.estimated_nights_per_year_sum / p.count, 0); 
                p.estimated_occupancy_sum += v.estimated_occupancy;
                p.estimated_occupancy = d3.round(p.estimated_occupancy_sum / p.count, 3)
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                switch(v.room_type) {
                        case "Entire home/apt":
                            --p.entire_home_count;
                            break;
                        case "Private room":
                            --p.private_room_count;
                            break;
                        case "Shared room":
                            --p.shared_room_count;
                            break;
                }
                p.price_per_night_sum -= v.price;
                p.price_per_night = p.count ? d3.round(p.price_per_night_sum / p.count) : 0;
                p.estimated_income_per_month_sum -= v.estimated_income_per_month;
                p.estimated_income_per_month = p.count ? d3.round(p.estimated_income_per_month_sum / p.count) : 0;  
                p.number_of_reviews -= v.number_of_reviews;
                p.reviews_per_month_sum -= v.reviews_per_month;
                p.reviews_per_month = p.count ? d3.round(p.reviews_per_month_sum / p.count, 1) : 0;
                p.availability_365_sum -= v.availability_365;
                p.availability_365 = p.count ? d3.round(p.availability_365_sum / p.count, 1) : 0;
                if (v.availability_365 <= AVAILABILITY_DAYS_LOW)
                    --p.availability_low_count;
                else
                    --p.availability_high_count;
                p.estimated_nights_per_year_sum -= v.estimated_nights_per_year;
                p.estimated_nights_per_year = p.count ?  d3.round(p.estimated_nights_per_year_sum / p.count, 0) : 0; 
                p.estimated_occupancy_sum -= v.estimated_occupancy;
                p.estimated_occupancy = p.count ? d3.round(p.estimated_occupancy_sum / p.count, 3) : 0;
                return p;
            },
            /* initialize p */
            function () {
                return {
                    count: 0,
                    entire_home_count: 0,
                    private_room_count: 0,
                    shared_room_count: 0,
                    price_per_night_sum: 0,
                    price_per_night: 0,
                    estimated_income_per_month_sum: 0, 
                    estimated_income_per_month: 0,
                    number_of_reviews: 0,
                    reviews_per_month_sum: 0,
                    reviews_per_month: 0,
                    availability_365_sum: 0,
                    availability_365: 0,
                    availability_high_count: 0,
                    availability_low_count: 0,
                    estimated_nights_per_year_sum: 0, 
                    estimated_nights_per_year: 0,
                    estimated_occupancy_sum: 0,
                    estimated_occupancy: 0
                };
            }
        );
    
        neighbourhoodDimension = ndx.dimension(function (d) { return d.neighbourhood; });
        neighbourhoodGroup = neighbourhoodDimension.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count;  
                p.price_per_night_sum += v.price;
                p.price_per_night = d3.round(p.price_per_night_sum / p.count);
                p.price_per_month_min_sum += (v.price * v.reviews_per_month * v.minimum_nights);
                p.price_per_month_min = d3.round(p.price_per_month_min_sum / p.count);
                p.minimum_nights_sum += v.minimum_nights;
                p.minimum_nights = d3.round(p.minimum_nights_sum / p.count, 1);
                p.number_of_reviews += v.number_of_reviews;
                p.reviews_per_month_sum += v.reviews_per_month;
                p.reviews_per_month = d3.round(p.reviews_per_month_sum / p.count, 1);
                p.availability_365_sum += v.availability_365;
                p.availability_365 = d3.round(p.availability_365_sum / p.count, 1);
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                p.price_per_night_sum -= v.price;
                p.price_per_night = p.count ? d3.round(p.price_per_night_sum / p.count) : 0;
                p.price_per_month_min_sum -= (v.price * v.reviews_per_month * v.minimum_nights);
                p.price_per_month_min = d3.round(p.price_per_month_min_sum / p.count);
                p.minimum_nights_sum -= v.minimum_nights;
                p.minimum_nights = p.count ? d3.round(p.minimum_nights_sum / p.count, 1) : 0;
                p.number_of_reviews -= v.number_of_reviews;
                p.reviews_per_month_sum -= v.reviews_per_month;
                p.reviews_per_month = p.count ? d3.round(p.reviews_per_month_sum / p.count, 1) : 0;
                p.availability_365_sum -= v.availability_365;
                p.availability_365 = p.count ? d3.round(p.availability_365_sum / p.count, 1) : 0;
                return p;
            },
            /* initialize p */
            function () {
                return {
                    count: 0,
                    price_per_night_sum: 0,
                    price_per_night: 0,
                    price_per_month_min_sum: 0,
                    price_per_month_min: 0,
                    minimum_nights_sum: 0,
                    minimum_nights: 0,
                    number_of_reviews: 0,
                    reviews_per_month_sum: 0,
                    reviews_per_month: 0,
                    availability_365_sum: 0,
                    availability_365: 0
                };
            }
        );
        
        //If we are not running in city view mode, we need to create a neighbourhood map so we can re-populate the unfiltered nodes for each neighbourhood
        if (!FUNCTIONALITY_CITY_VIEW) {
            neighbourhoodMap = d3.nest()
                .key(function(d) { return d.neighbourhood; })
                .map(neighbourhoodDimension.top(Infinity), d3.map);
        }
        
        //Map the neighbourhood counts for later...
        var neighbourhoodGroupSnapshot = [];
        neighbourhoodGroup.all().forEach( function(d) { 
            neighbourhoodGroupSnapshot.push({"key": d.key, "value": d.value.count }) ;
        })
        neighbourhoodCountsMap = d3.map(neighbourhoodGroupSnapshot, function(d) { return d.key; });
        
        if (neighbourhoodGroupsNames) {
            neighbourhoodGroupDimension = ndx.dimension(function (d) { return d.neighbourhood_group; });
            neighbourhoodGroupGroup = neighbourhoodGroupDimension.group();
        
            neighbourhoodGroupCountsMap = d3.map(deepCopyGroup(neighbourhoodGroupGroup), function(d) { return d.key; });   
        }
        
        var roomTypeDimension = ndx.dimension(function (d) { return res.listingTypes[d.room_type]; });
        var roomTypeGroup = roomTypeDimension.group();
        
        //Also create one for filtering
        roomTypeFilterDimension = ndx.dimension(function (d) { return d.room_type; });
            
        hostDimension = ndx.dimension(function (d) { return d.host_id + "|" + d.host_name ; }); 
        hostGroup = hostDimension.group();
        
        var hostListingCountDimension = ndx.dimension(function (d) { return d.calculated_host_listings_count ; });
        hostListingCountGroup = hostListingCountDimension.group();
        multiListingDimension = ndx.dimension(function (d) { return d.calculated_host_listings_count > 1 ? true : false; });
        
        var availability365Dimension = ndx.dimension(function (d) { return Math.round(d.availability_365); });
        availability365Group = availability365Dimension.group();
        
        var reviewsThresholdDate = dataDate;
        reviewsThresholdDate.setMonth(reviewsThresholdDate.getMonth() - 6);
        recentReviewsWithThresholdDimension = ndx.dimension(function (d) { 
            return d.last_review  && (d.last_review > reviewsThresholdDate) && d.estimated_nights_per_year > AVAILABILITY_DAYS_LOW ? true : false; });
        
        var availabilityClassificationDimension = ndx.dimension(function (d) { 
            if (d.availability_365 <= AVAILABILITY_DAYS_LOW)
                return res.low;
            /* else if (d.availability_365 < 305)
                return "medium";*/
            else
                return res.high;
        });
        var availabilityClassificationGroup = availabilityClassificationDimension.group();
        //Create a duplicate filter for responding to filters driven by the UI
        availabilityClassificationFilterDimension = ndx.dimension(function (d) { 
            if (d.availability_365 <= AVAILABILITY_DAYS_LOW)
                return res.low;
            /* else if (d.availability_365 < 305)
                return "medium";*/
            else
                return res.high;
        });
    
        airbnb_data.forEach(function(d) {
            d.LatLng = new L.LatLng(d.latitude, d.longitude)
        })
    
        function addXAxisLabel(chart, text)
        {
            chart.svg()
                        .append("text")
                        .attr("class", "x-axis-label")
                        .attr("text-anchor", "middle")
                        .attr("x", chart.width()/2)
                        .attr("y", chart.height()-3.5)
                        .text(text);
        };

        var roomTypeColorScale = d3.scale.ordinal().domain([res.listingTypes["Entire home/apt"],res.listingTypes["Private room"], res.listingTypes["Shared room"]])
                                   .range(["#ec5242","#3fb211", "#00bff3"]);

        roomTypeChart = dc.rowChart("#dcRoomTypeChart", "automaticRedrawGroup");
        roomTypeChart
            .width(110)
            .height(180)
            .dimension(roomTypeDimension)
            .group(roomTypeGroup)
            .colors(roomTypeColorScale.range())
            .colorAccessor(function(d){ return roomTypeColorScale.domain().indexOf(d.key); })
            .title(function(d) { return d.key + ": " + formatThousands(d.value) + " (" + formatPercent(d.value / d3.sum(roomTypeGroup.all(), function(d){ return d.value; })) + ")"; })
            .elasticX(true)
            .margins({top: 0, right: 10, bottom: 35, left: 5})
            .gap(20)
            .labelOffsetY(-3) 
            .labelOffsetX(1) 
            .on("filtered", filtered);
        roomTypeChart.xAxis().ticks(2);
        
        listingsPerHostChart = dc.barChart("#dcListingsPerHostChart", "automaticRedrawGroup");
        listingsPerHostChart
            .width(parseInt(d3.select("#dcListingsPerHostChart").style("width")))
            .height(90)
            .dimension(hostListingCountDimension)
            .group(hostListingCountGroup)
            .x(d3.scale.linear().domain([1, 10]))//hostListingCountDimension.top(1)[0].value]))
            .renderTitle(true)
            .brushOn(false)
            .title(function(d) { 
                return res.numberOfListingsWhereTheHostHas + " " + (d.data.key - 1) + " " + res.otherListings + ": " + formatThousands(d.data.value); 
            })
            .gap(0)
            .margins({top: 5, right: 5, bottom: 30, left: 35});
        listingsPerHostChart.elasticY(true);
        listingsPerHostChart.xAxis().ticks(6);
        listingsPerHostChart.yAxis().ticks(2).tickFormat(d3.format('s'));
        listingsPerHostChart.xAxisLabel(res.listings_per_host);
        listingsPerHostChart.yAxisLabel(res.listings);
    
        availability365Chart = dc.barChart("#dcAvailability365Chart", "automaticRedrawGroup");    
        availability365Chart
            .on("preRedraw", preRedraw)
            .on("preRender", preRedraw)
            .width(parseInt(d3.select("#dcAvailability365Chart").style("width")))
            .height(130)
            .dimension(availability365Dimension)
            .group(availability365Group)
            .label(function(d) { return d.key; })
            .gap(0)
            .x(d3.scale.linear().domain([0, 366]))
            .brushOn(false)
            .title(function(d) { 
                return res.numberOfListingsWith + " " + (d.data.key) + " "+ res.daysAvailableInTheNext365Days +": " + formatThousands(d.data.value);
            })
            .margins({top: 5, right: 6, bottom: 30, left: 35})
            .y(d3.scale.log().domain([1, 5000]))
            .xAxis().ticks(7); 
        availability365Chart.yAxis().ticks(4).tickFormat(d3.format('s'));
        availability365Chart.xAxisLabel(res.number_of_days_available_in_year);
        availability365Chart.yAxisLabel(res.listings);
    
        var availabilityCategoriesPie = dc.pieChart("#dcAvailabilityCategoriesPie", "automaticRedrawGroup");  
        availabilityCategoriesPie
            .width(100)
            .height(100)
            .radius(50) 
            .dimension(availabilityClassificationDimension) 
            .group(availabilityClassificationGroup)
            .innerRadius(20)
            .colors(d3.scale.ordinal().domain([res.high,res.low])
                                        .range(["#b4b4b4", "#ccc"]))
            .renderTitle(true)
            .title(function(d) { 
                return res.numberOfListingsWith + " " + (d.data.key) + " "+ res.availability +": " + formatThousands(d.data.value);
            }); 
        availabilityCategoriesPie.filter = function() {};
        
        if (!FUNCTIONALITY_CITY_VIEW) {
            //Narrow data to one neighbourhood, and why not my neighbourhood?
            if (INITIAL_NEIGHBOURHOOD)
                $("#geoFilters").val(INITIAL_NEIGHBOURHOOD).trigger("change");
            //load geo will setup the map and update statistics
            //loadGeo(geoName);
        }
        else{
            if (FUNCTIONALITY_MAP) {
            
                setupMapData();
            }
            
            updateStatsAndMap();
        }
        
        dc.renderAll("automaticRedrawGroup");
        addXAxisLabel(roomTypeChart, res.listings);
        
        function filtered(chart) { 
            //Make sure multi listing filters are in place
            updateStatsAndMap();
        };
        
        function preRedraw(chart) {
            chart.y(d3.scale.sqrt().domain([1, availability365Group.top(1)[0].value]));
        };

        //loadViewState();
    });
};

function loadNeighbourhoodBoundaries(neighbourhoodBoundariesFile){
    //only do this if the device is going to show a map...
    if (FUNCTIONALITY_MAP) {
        d3.json(neighbourhoodBoundariesFile, function(neighbourhoodBoundaries) {

            function projectPoint(x, y) {
              var point = map.latLngToLayerPoint(new L.LatLng(y, x));
              this.stream.point(point.x, point.y);
            }

            var transform = d3.geo.transform({point: projectPoint}),
                path = d3.geo.path().projection(transform);

            if (/.topojson/.test(neighbourhoodBoundariesFile)) 
                neighbourhoodBoundaryFeatures = topojson.feature(neighbourhoodBoundaries, neighbourhoodBoundaries.objects.neighbourhoods).features;
            else
                neighbourhoodBoundaryFeatures = neighbourhoodBoundaries.features;

            neighbourhoodBoundaryPaths = g_boundaries.selectAll("path")
                .data(neighbourhoodBoundaryFeatures)
                .enter().append("path");

            neighbourhoodBoundaryPaths.attr("d", path)
                .on("click", function(d){
                        onClickNeighbourhood(d);
                    })
                .on("mouseenter", neighbourhoodHover)
                .on("mouseout", neighbourhoodNoHover)
                .on("mousedown", function(){
                    neighbourhoodMouseDown = true;
                    neighbourhoodDrag = false;
                });
            neighbourhoodBoundaryPaths.on("mousemove", function(){
                if (neighbourhoodMouseDown)
                    neighbourhoodDrag = true;
                showNeighbourhoodHover
            });
            neighbourhoodBoundaryLabelContainers = g_boundaries.selectAll("g")
                .data(neighbourhoodBoundaryFeatures)
                .enter()
                .append("g")
                .classed("labelContainers", true)
                .attr("transform", function(d) { 
                    return "translate("+ 
                        path.centroid(d)[0] +","+ 
                        path.centroid(d)[1] +")";
                    }
                )
                .on("click", function(d){
                        onClickNeighbourhood(d);
                    })
                .on("mouseenter", neighbourhoodHover)
                //.on("mouseout", hideNeighbourhoodHover)
                .on("mousedown", function(){
                    neighbourhoodMouseDown = true;
                    neighbourhoodDrag = false;
                });

            neighbourhoodBoundaryLabelTextGlow = neighbourhoodBoundaryLabelContainers.append("text")
                .text(function(d){
                    return d.properties.neighbourhood;
                })
                .attr("text-anchor","middle")
                .attr("font-size","10pt")
                .attr("style", "filter: url(#glow); fill: #fff");

            neighbourhoodBoundaryLabelText = neighbourhoodBoundaryLabelContainers.append("text")
                .text(function(d){
                    return d.properties.neighbourhood;
                })
                .attr("text-anchor","middle")
                .attr("font-size","10pt")

            var backgroundBuffer = 4;
            neighbourhoodBoundaryLabelText.each(function() {
                var thisBBox = this.getBBox();
                d3.select(this.parentNode).insert("rect", ":first-child")
                    .attr("x", -(thisBBox.width/2) - backgroundBuffer)
                    .attr("y", -thisBBox.height)
                    .attr("width", thisBBox.width + (2*backgroundBuffer))
                    .attr("height", thisBBox.height + (2*backgroundBuffer));
            });

        });
    }
}

function onClickNeighbourhood(d) {

    //if the user double clicks, don't do anything (pass the doubleclick to leaflet)
    console.log("1");
    if (neighbourhoodClickedOnce == true) {
        doubleClickNeighbourhood();
    } else {
        neighbourhoodClickTimer = setTimeout(function(){ clickNeighbourhood(d.properties.neighbourhood);}, 250);
        neighbourhoodClickedOnce = true;
        console.log("here");
    }
}

function clickNeighbourhood(geo){
    console.log("2");

    neighbourhoodClickedOnce = false;
    if (!neighbourhoodDrag)
        $("#geoFilters").val(geo).trigger("change");

}

function doubleClickNeighbourhood() {
    console.log("3");

    neighbourhoodClickedOnce = false;
    clearTimeout(neighbourhoodClickTimer);
    neighbourhoodClickTimer = null;

}

function neighbourhoodHover(d){
    //Make sure the neighbourhood label is highlighted as well - add hover class
    var hoveredNeighbourhoodBoundaryFeatures  = [];
    hoveredNeighbourhoodBoundaryFeatures.push(d);

    var selectedNeighbourhoodBoundaryLabelContainers = g_boundaries.selectAll("g.labelContainers")
        .data(hoveredNeighbourhoodBoundaryFeatures, function(d){return d.properties.neighbourhood;});

    selectedNeighbourhoodBoundaryLabelContainers
        .classed("hover", true);

    selectedNeighbourhoodBoundaryLabelContainers
        .exit()
        .classed("hover", false);

    var selectedNeighbourhoodBoundaryPaths = g_boundaries.selectAll("path")
        .data(hoveredNeighbourhoodBoundaryFeatures, function(d){return d.properties.neighbourhood;});

    selectedNeighbourhoodBoundaryPaths
        .classed("hover", true);

    selectedNeighbourhoodBoundaryPaths
        .exit()
        .classed("hover", false);

}

function neighbourhoodNoHover(d){

    //Make sure the neighbourhood label is un-highlighed - remove hover class
    var hoveredNeighbourhoodBoundaryFeatures  = [];
    hoveredNeighbourhoodBoundaryFeatures.push(d);

    var selectedNeighbourhoodBoundaryLabelContainers = g_boundaries.selectAll("g.labelContainers")
        .data(hoveredNeighbourhoodBoundaryFeatures, function(d){return d.properties.neighbourhood;});

    selectedNeighbourhoodBoundaryLabelContainers
        .classed("hover", false);

    var selectedNeighbourhoodBoundaryPaths = g_boundaries.selectAll("path")
        .data(hoveredNeighbourhoodBoundaryFeatures, function(d){return d.properties.neighbourhood;});

    selectedNeighbourhoodBoundaryPaths
        .classed("hover", false);

}
function updateStatsAndMap(){
    
    if (animating)
        endReviewsAnimation();
    
    var summaryCount = reduceDimension.top(Infinity).length;
    if (summaryCount == 0) {
        d3.select("#summaryCount").text(0);
        d3.select("#summaryCountPercentage").text(d3.round(0,1));
                             
        d3.select("#summaryEntireHomePercentage").text(d3.round(0, 1));
        d3.select("#summaryEntireHomeMetricsNumber").text(formatThousands(0));
        d3.select("#summaryEntireHomeMetricsPercentage").text(d3.round(0,1));
        d3.select("#summaryPrivateRoomMetricsNumber").text(formatThousands(0));
        d3.select("#summaryPrivateRoomMetricsPercentage").text(d3.round(0,1));
        d3.select("#summarySharedRoomMetricsNumber").text(formatThousands(0));
        d3.select("#summarySharedRoomMetricsPercentage").text(d3.round(0,1));
        
        d3.selectAll("#summaryPrice").text(formatThousands(0));
        d3.select("#summaryEstimatedNights").text(0);
        d3.select("#summaryEstimatedNightsPerYear").text(0);

        d3.select("#summaryReviewsPerMonth").text(0);

        d3.select("#summaryEstimatedIncomePerMonth").text(0);

        d3.select("#summaryHighAvailabilityListings").text(formatThousands(0));
        d3.selectAll(".summaryHighAvailabilityListingsPercentage").text(d3.round(0, 1));
        d3.select("#summaryLowAvailabilityListings").text(formatThousands(0));
        d3.select("#summaryLowAvailabilityListingsPercentage").text(d3.round(0, 1));
        d3.select("#summaryAvailabilityDays").text(0);
        d3.select("#summaryAvailabilityPercentage").text(d3.round(0, 1));
        d3.select("#summaryMultiHostPercentage").text(d3.round(0,1));
        d3.select("#summarySingleHostMetricsNumber").text(formatThousands(0) );
        d3.select("#summarySingleHostMetricsPercentage").text(d3.round(0,1));
        d3.select("#summaryMultiHostMetricsNumber").text(formatThousands(0) );
        d3.select("#summaryMultiHostMetricsPercentage").text(d3.round(0,1));
        d3.select("#summaryNumberOfReviews").text(formatThousands(0));

        d3.select("#summaryEstimatedOccupancy").text(formatThousands(0));

    }
    else
    {
        var summaryReduce = reduceGroup.top(1)[0].value;
        d3.select("#summaryCount").text(formatThousands(summaryCount));
        d3.select("#summaryCountPercentage").text(d3.round(summaryCount/geoCount * 100,1));

        d3.select("#summaryEntireHomePercentage").text(d3.round(summaryReduce.entire_home_count/summaryCount*100, 1));
        d3.select("#summaryEntireHomeMetricsNumber").text(formatThousands(summaryReduce.entire_home_count));
        d3.select("#summaryEntireHomeMetricsPercentage").text(d3.round(summaryReduce.entire_home_count / summaryCount * 100,1));
        d3.select("#summaryPrivateRoomMetricsNumber").text(formatThousands(summaryReduce.private_room_count));
        d3.select("#summaryPrivateRoomMetricsPercentage").text(d3.round(summaryReduce.private_room_count / summaryCount * 100,1));
        d3.select("#summarySharedRoomMetricsNumber").text(formatThousands(summaryReduce.shared_room_count));
        d3.select("#summarySharedRoomMetricsPercentage").text(d3.round(summaryReduce.shared_room_count / summaryCount * 100,1));
        
        d3.selectAll("#summaryPrice").text(formatThousands(summaryReduce.price_per_night));
        d3.select("#summaryEstimatedNightsPerYear").text(d3.round(summaryReduce.estimated_nights_per_year, 0));

        d3.select("#summaryReviewsPerMonth").text(summaryReduce.reviews_per_month);

        d3.select("#summaryEstimatedIncomePerMonth").text(formatThousands(summaryReduce.estimated_income_per_month));
        
        d3.select("#summaryHighAvailabilityListings").text(formatThousands(summaryReduce.availability_high_count));
        d3.selectAll(".summaryHighAvailabilityListingsPercentage").text(d3.round(summaryReduce.availability_high_count / summaryCount * 100, 1));
        d3.select("#summaryLowAvailabilityListings").text(formatThousands(summaryReduce.availability_low_count));
        d3.select("#summaryLowAvailabilityListingsPercentage").text(d3.round(summaryReduce.availability_low_count / summaryCount * 100, 1));
        d3.select("#summaryAvailabilityDays").text(summaryReduce.availability_365);
        d3.select("#summaryAvailabilityPercentage").text(d3.round(summaryReduce.availability_365/365*100, 1));
        var smallestListingCountGroup = hostListingCountGroup.all()[0];
        var summarySingleHostCount = (smallestListingCountGroup.key == "1") ? smallestListingCountGroup.value : 0;
        d3.select("#summaryMultiHostPercentage").text(d3.round((summaryCount - summarySingleHostCount) / summaryCount * 100,1));
        d3.select("#summarySingleHostMetricsNumber").text(formatThousands(summarySingleHostCount));
        d3.select("#summarySingleHostMetricsPercentage").text(d3.round(summarySingleHostCount / summaryCount * 100,1));
        d3.select("#summaryMultiHostMetricsNumber").text(formatThousands(summaryCount - summarySingleHostCount) );
        d3.select("#summaryMultiHostMetricsPercentage").text(d3.round((summaryCount - summarySingleHostCount) / summaryCount * 100,1));
        d3.select("#summaryNumberOfReviews").text(formatThousands(summaryReduce.number_of_reviews));

        d3.select("#summaryEstimatedOccupancy").text(d3.round(summaryReduce.estimated_occupancy * 100, 1));

    }
                                        
    var hostGroupData = hostGroup.top(20).filter(function (d) { return d.value > 0 ? true : false; });
    
    d3.select("#topHostsTable tbody").selectAll("tr").remove()
    var rows = d3.select("#topHostsTable tbody").selectAll("tr")
        .data(hostGroupData);

    rows.enter()
        .append("tr")
        .on("click", clickHost);
    
    var col_host_id = rows.append("td");
    var col_count = rows.append("td");

    col_host_id.text(function(d) { return d.key.split("|")[1]; });
    col_count.text(function(d) { return d.value; }); 
    
    if (FUNCTIONALITY_MAP)
        setTimeout(updateMapData(), 0);
    
    setTimeout(filterReviews, 0);

}

function clickHost(d,i){

    ga('send', 'event', 'click', 'host', d.key);

    if (FUNCTIONALITY_MAP){
        var hostListings = hostDimension.filterExact(d.key);
        var bounds = [];
        hostListings.top(Infinity).forEach(function (d) {
            bounds.push(d.LatLng);
        });    
        map.fitBounds(bounds, {maxZoom: map.getZoom(), pan: {animate: true, duration: 1.5, easeLinearity: 0.25}});
        var originalCircleRadius = (map.getZoom() >= 13)? 4 : 2;
        var hostCircles = g.selectAll("circle.unfiltered")
            .data(hostListings.top(Infinity), function(d){ return d.id; })
            .transition().duration(1000).style("stroke", "black").style("stroke-width", 0.25).attr("r", 20).style("z-index", 99).transition().delay(2000).duration(1000).attr("r", originalCircleRadius).style("stroke-width", 0);
        hostDimension.filterAll();
    }
};

function showClick(d){
    if  (hoverPinned)
        hideHover();
    pinnedListing = this;
    d3.select(pinnedListing).classed("pinned", true);
    switch(map.getZoom()) {
        case 10:
        case 11:
            d3.select(pinnedListing).style("stroke-width", 10);
            break;
        case 12:
        case 13:
            d3.select(pinnedListing).style("stroke-width", 30);
            break;
        case 14:
            d3.select(pinnedListing).style("stroke-width", 40);
            break;
        case 15:
        default:
            d3.select(pinnedListing).style("stroke-width", 50);
    }
    showHover(d);
    hoverPinned = true;
    d3.select("#listingHover")
        .classed({"pinned": true});
    d3.select("#closeHover")
        .style("visibility", "visible");
};

function showHover(d){
    if (!hoverPinned){
        if (d3.select(d3.event.target).classed("unfiltered")){
            var listingHover = d3.select("#listingHover")
                .style("left",(d3.event.pageX+2)+"px")
                .style("visibility", "visible");
            if (d3.event.pageY < (parseInt(d3.select("#map").style("height")) / 2)){
                if (parseInt(d3.select("#listingHover").style("height")) > (parseInt(d3.select("#map").style("height")) / 2))
                    listingHover.style("top", "75px");
                else
                    listingHover.style("top", (d3.event.pageY-10)+"px");
                listingHover.style("bottom", "auto");
            }
            else {
                listingHover.style("top", "auto");
                if (parseInt(d3.select("#listingHover").style("height")) > (parseInt(d3.select("#map").style("height")) / 2))
                    listingHover.style("bottom", "10px");
                else
                    listingHover.style("bottom", (parseInt(d3.select("#map").style("height")) - d3.event.pageY +     40)+"px");
            }
            listingHover.select("#listingRoomType").text(res.listingTypes[d.room_type]);
            listingHover.select("#listingID").attr("href", "http://www.airbnb.com/rooms/" + d.id);
            listingHover.select("#listingID").text(d.id);
            listingHover.select("#listingName").attr("href", "http://www.airbnb.com/rooms/" + d.id);
            listingHover.select("#listingName").text(d.name);                
            listingHover.select("#listingHost").text(d.host_name);
            listingHover.select("#listingHost").attr("href", "http://www.airbnb.com/users/show/" + d.host_id);
            listingHover.select("#listingHostListingCount").text(d.calculated_host_listings_count == 1 ? "No" : formatThousands(d.calculated_host_listings_count - 1));
            listingHover.select("#listingNeighbourhood").text(d.neighbourhood);
            if (neighbourhoodGroupsNames)
                listingHover.select("#listingNeighbourhoodGroup").text(d.neighbourhood_group);
            listingHover.select("#listingMinimumNights").text(d.minimum_nights);
            listingHover.select("#listingPrice").text(formatThousands(d.price));
            listingHover.select("#listingNumberOfReviews").text(formatThousands(d.number_of_reviews));
            if (d.number_of_reviews == 0)
                listingHover.select("#listingLastReview").text(res.NA);
            else {
                listingHover.select("#listingLastReview").text(formatDate(d.last_review));
            }
            listingHover.select("#listingReviewPerMonth").text(d.reviews_per_month);
            listingHover.select("#listingAvailability365").text(d.availability_365);
            listingHover.select("#listingAvailabilityDescription").text(d.availability_365 <= AVAILABILITY_DAYS_LOW ? res.low.toUpperCase() : res.high.toUpperCase());
            listingHover.select("#listingAvailabilityPercentage").text(d3.round(d.availability_365/365*100, 1));
            listingHover.select("#listingEstimatedNightsPerYear").text(d.estimated_nights_per_year);
            listingHover.select("#listingEstimatedOccupancyRate").text(d3.round(d.estimated_occupancy * 100, 1));
            listingHover.select("#listingEstimatedIncomePerMonth").text(formatThousands(d.estimated_income_per_month));

            
        };
    };
}
function hideHover(){
    if (pinnedListing){
        d3.select(pinnedListing).classed("pinned", false);
        pinnedListing = null;
    }
    d3.select("#listingHover")
        .classed({"pinned": false})
        .style("visibility", "hidden");
    d3.select("#closeHover")
        .style("visibility", "hidden");
    hoverPinned = false;
}

function setupMapData(neighbourhoodName) {
    
    g.selectAll("circle").remove();
    
    var listingCircles;
    if (FUNCTIONALITY_CITY_VIEW)
        listingCircles = g.selectAll("circle")
            .data(reduceDimension.top(Infinity));    
    else
        listingCircles = g.selectAll("circle")
            .data(neighbourhoodMap.get(neighbourhoodName));   

    var circleRadius = (map.getZoom() >= 14)? 4 : 2;
    
    listingCircles.enter()
    .append("circle")
        .style("fill", function(d) 
                { 
                    switch(d.room_type) {
                            case "Entire home/apt":
                                return "#ec5242";
                                break;
                            case "Private room":
                                return "#3fb211";
                                break;
                            case "Shared room":
                                return "#00bff3";
                                break;
                            default:
                                return "black";
                    }
                }
            )
        .attr("r", circleRadius)
        .classed({"unfiltered": true})
        .on("mouseover", showHover) 
        .on("click", showClick)
        .on("mouseout", function(d) {
            if (d3.select(this).classed("unfiltered") && (!d3.select("#listingHover").classed("pinned")))
                hideHover();
            });
    
    map.on("viewreset", viewreset);
    map.on("moveend", saveViewState);

    viewreset(); 

    function viewreset() {
        
        //updateViewState();
        if (oldZoom != map.getZoom()){
            switch(map.getZoom()) {
                case 6:                        
                case 7:                
                
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                    listingCircles.attr("r", 2);
                    break;
                case 14:
                    listingCircles.attr("r", 3);
                    break;
                case 15:
                default:
                    listingCircles.attr("r", 4);
            }
        }

        oldZoom = map.getZoom();
        listingCircles.attr("transform", 
        function(d) { 
            return "translate("+ 
                map.latLngToLayerPoint(d.LatLng).x +","+ 
                map.latLngToLayerPoint(d.LatLng).y +")";
            }
        )

        function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        }

        var transform = d3.geo.transform({point: projectPoint}),
            path = d3.geo.path().projection(transform);

        if (neighbourhoodBoundaryPaths) {
            neighbourhoodBoundaryPaths.attr("d", path);

            if (map.getZoom() > 12) {
                g_boundaries.classed("hideLabels", false);
                neighbourhoodBoundaryLabelContainers
                    .attr("transform", function(d) { 
                        return "translate("+ 
                            path.centroid(d)[0] +","+ 
                            path.centroid(d)[1] +")";
                        }
                    );
                var newFontSize;
                switch(map.getZoom()) {
                    case 6:                        
                    case 7:                
                
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                        newFontSize = 8;
                        break;
                    case 14:
                        newFontSize = 10;
                        break;
                    case 15:
                    default:
                        newFontSize = 11;
                }
                neighbourhoodBoundaryLabelTextGlow.attr("font-size", newFontSize + "pt");
                neighbourhoodBoundaryLabelText.attr("font-size", newFontSize + "pt");

                var backgroundBuffer = 4;
                neighbourhoodBoundaryLabelText.each(function() {
                    var thisBBox = this.getBBox();
                    d3.select(this.parentNode).select("rect")
                        .attr("x", -(thisBBox.width/2) - backgroundBuffer)
                        .attr("y", -thisBBox.height - (backgroundBuffer/2))
                        .attr("width", thisBBox.width + (2*backgroundBuffer))
                        .attr("height", thisBBox.height + (2*backgroundBuffer));
                });
            }
            else {
                g_boundaries.classed("hideLabels", true);
            }
        }
    };
};

function saveViewState(){

    var viewState = { 
                        lat: map.getCenter().lat,
                        lng: map.getCenter().lng,
                        neighbourhood: currentNeighbourhood,
                        filterEntireHomes: $("#filterEntireHomes").is(":checked") ? true: false,
                        filterHighlyAvailable: $("#filterHighlyAvailable").is(":checked")? true: false,
                        filterRecentReviews: $("#filterRecentReviews").is(":checked")? true: false,
                        filterMultiListings: $("#filterMultiListings").is(":checked")? true: false
                    };

    querystring = "";
    //querystring += "lat=" + encodeURI(viewState.lat);
    //querystring += "&"
    //querystring += "lng=" + encodeURI(viewState.lng);
    //querystring += "&"
    querystring += "neighbourhood=" + encodeURI(viewState.neighbourhood);
    querystring += "&"
    querystring += "filterEntireHomes=" + viewState.filterEntireHomes;
    querystring += "&"
    querystring += "filterHighlyAvailable=" + viewState.filterHighlyAvailable;
    querystring += "&"
    querystring += "filterRecentReviews=" + viewState.filterRecentReviews;
    querystring += "&"
    querystring += "filterMultiListings=" + viewState.filterMultiListings;


    history.replaceState(viewState, "", "?" + querystring);

};


function updateMapData() {
    
    var unfilteredCircles = g.selectAll("circle")
        .data(reduceDimension.top(Infinity), function(d){ return d.id; })
        .classed({"unfiltered": true, "filtered": false})
        .exit()
            .classed({"unfiltered": false, "filtered": true});
};

function loadReviews() {

    d3.csv(reviewsFile, function  (airbnb_reviews) {
   
        airbnb_reviews.forEach(function (d) {
            d.date = d3.time.format('%Y-%m-%d').parse(d.date);
            d.date_month = d3.time.month(d.date);
            //for convenience, also add a pointer to the listing
            d.listing = listingsMap.get(d.listing_id);
        });
        
        /* Run data through crossfilter */
        var reviewsDX = crossfilter(airbnb_reviews);
    
        reviewsMonthDimension = reviewsDX.dimension(function (d) { return d.date_month; });
        reviewsMonthGroup = reviewsMonthDimension.group();
    
        reviewsListingDimension = reviewsDX.dimension(function (d) { return d.listing_id; });
        //if there are some filters on our charts already,
        //make sure we fsynch the reviews
        if (reduceDimension.top(Infinity).length != cityCount) {
            var unfilteredListings = d3.map(reduceDimension.top(Infinity), function(d) { return d.id; });
            reviewsListingDimension.filterFunction(function (d) { 
                return (unfilteredListings.has(d));
            });     
        }
        reviewsChart = dc.barChart("#dcReviewsChart", "reviewsRedrawGroup");
        reviewsChart
            .width(parseInt(d3.select("#dcReviewsChart").style("width")))
            .height(130)
            .dimension(reviewsMonthDimension)
            .group(reviewsMonthGroup)
            .label(function(d) { return d.key; })
            .brushOn(false)
            .title(function(d) { 
                return res.numberOfReviewsIn + " " + (formatMonthYear(d.data.key)) + ": " + formatThousands(d.data.value); 
            })
            .x(d3.time.scale())
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .margins({top: 10, right: 15, bottom: 30, left: 35})
            .gap(0)
            .elasticY(true)
            .elasticX(true)
            .xAxis().tickFormat();
        reviewsChart.yAxis().ticks(3).tickFormat(d3.format('s'));
        reviewsChart.xAxisLabel(res.date);
        reviewsChart.yAxisLabel(res.reviews);
        reviewsChart.render(); 
        $("#iconLoadingReviews").hide();
        $("#reviewsChartContainer").toggleClass("unloaded", false);
        if (FUNCTIONALITY_MAP)
            $("#playReviewsContainer").show();
    });    
};
    
function filterReviews(){
    if (reviewsListingDimension) {
        var unfilteredListings = d3.map(reduceDimension.top(Infinity), function(d) { return d.id; });
        reviewsListingDimension.filterFunction(function (d) { 
            return (unfilteredListings.has(d));
        });
        reviewsChart.redraw();
    }
};

function startReviewsAnimation(){

    ga('send', 'event', 'play', 'reviews', "start");
    animating = true;
    d3.select("#animationStatus").style("visibility", "visible");
    d3.select("#playReviews i").classed("glyphicon-play", false).classed("glyphicon-stop", true);
    //Then create a nest of the dates so we can easily animate them
    reviewsNest = d3.nest()
    .key(function(d) { return d.date_month; })
    .map(reviewsMonthDimension.top(Infinity), d3.map);
    g.classed({"animating": true});
    var animationDates = reviewsMonthGroup.top(Infinity).sort(function (a, b) {
      if ( a.key > b.key) return 1;
      if ( a.key < b.key) return -1;
      return 0;        
    });
    var firstDate = animationDates[0].key;
    var lastDate = animationDates[animationDates.length-1].key;
    animationDateRange = d3.time.day.range(firstDate, lastDate, 1);
    animationDateIndex = 0; 

    var drag = d3.behavior.drag()  
        .on('dragstart', function() { 
                animationPositionNode.style('fill', 'red');
                animatingPaused = true;
            })
        .on('drag', function() { 
                var croppedX = d3.min([d3.max([0,d3.event.x]),reviewsChart.xAxisLength()]);
                animationPositionNode.attr("transform", function(d) { return "translate("+croppedX+")"; });
                animationDateIndex = Math.floor(croppedX / reviewsChart.xAxisLength() * (animationDateRange.length - 1));
                var draggedDate = animationDateRange[animationDateIndex];
                d3.select("#animationStatusMonth").text(formatDateDayMonth(draggedDate));
                d3.select("#animationStatusYear").text(formatDateYear(draggedDate));
            })
        .on('dragend', function() { 
                animationPositionNode.style('fill', "#1f77b4"); 
                animatingPaused = false;
                reviewsController();
            });

    animationPositionNode = d3.select("#dcReviewsChart .x.axis").append("g")
        .attr("class", "animationPosition")
        .append("circle")
        .style("opacity", 0.9) 
        .attr("r", 4)
        .style("fill", "#1f77b4")
        .call(drag)
        .style("cursor", "pointer");

    animatePositionNode(firstDate);

    setTimeout(reviewsController, 0);

};

function reviewsController() {
    animationDate = animationDateRange[animationDateIndex];
    animateReviewsForDate(animationDate);
    animatePositionNode(animationDate);

    if (((animationDateIndex + 1) < animationDateRange.length) && (animating == true)) {
        if (!animatingPaused){
            animationDateIndex++;
            setTimeout(reviewsController, 25);
        }
    } else {
        //shut down animation
        endReviewsAnimation();
    }
};

function endReviewsAnimation() {
    ga('send', 'event', 'play', 'reviews', "end");
    d3.select("#animationStatus").style("visibility", "hidden");
    g.classed({"animating": false});
    animationPositionNode.remove();
    animationPositionNode = null;
    d3.select("#playReviews i").classed("glyphicon-play", true).classed("glyphicon-stop", false);
    animating = false;
}

function animatePositionNode(date) {

    var axisScale = d3.time.scale()
                           .domain(reviewsChart.x().domain())
                           .range([0,reviewsChart.xAxisLength()]);

    animationPositionNode
        .attr("transform", function() { 
            return "translate("+ 
                axisScale(date) +")";
        });
}

function animateReviewsForDate(date) {


    d3.select("#animationStatusMonth").text(formatDateDayMonth(date));
    d3.select("#animationStatusYear").text(formatDateYear(date));

    var dateReviewListings = reviewsNest.get(date);
    if (dateReviewListings) {
        var dateListings = [];
        dateReviewListings.forEach(function (d) {
            dateListings.push(d.listing);
        });
        var originalCircleRadius;

        switch(map.getZoom()) {
            case 6:                        
            case 7:                
                
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                originalCircleRadius = 2;
                break;
            case 14:
                originalCircleRadius = 3;
                break;
            case 15:
            default:
                originalCircleRadius = 4;
        }

        var hostCircles = g.selectAll("circle.unfiltered")
            .data(dateListings, function(d){ return d.id; })
            .classed({"animating": true}).transition().duration(1000).attr("r", 5).transition().delay(1100).duration(1000).attr("r", 0).each("end", function() { d3.select(this).classed({"animating": false}).attr("r", originalCircleRadius);});
    }
    
};

function debugLog(debugMessage) {
    var timeStamp = new Date();
    d3.select("#debugPanel").append("p").text(formatTimeStamp(timeStamp) + ": " + debugMessage);
    
};

window.onresize = function(event) {
    
    availability365Chart.width(parseInt(d3.select("#dcAvailability365Chart").style("width")))
        .transitionDuration(0)
        .render()
        .transitionDuration(750);
    
    listingsPerHostChart
        .width(parseInt(d3.select("#dcListingsPerHostChart").style("width")))
        .transitionDuration(0)
        .render()
        .transitionDuration(750);
    
    if (reviewsChart){
        reviewsChart
            .width(parseInt(d3.select("#dcReviewsChart").style("width")))        
            .transitionDuration(0)
            .render()
            .transitionDuration(750);        
    }
    
};

function setCurrencySymbol(symbol) {
    d3.selectAll(".dollarSign")
        .text(symbol);
};