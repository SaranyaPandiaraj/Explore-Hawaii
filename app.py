import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask import send_file

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database/Futuristic_Airbnb.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Define the engine
engine = create_engine("sqlite:///database/Futuristic_Airbnb.sqlite", encoding='utf8')
conn = engine.connect()
session = Session(engine)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("Hawaii.html")
    
@app.route("/Kauai")    
def Kauai():    
    return render_template("Kauai.html")

@app.route("/Oahu") 
def Oahu(): 
    return render_template("Oahu.html")

@app.route("/Maui") 
def Maui(): 
    return render_template("Maui.html")

@app.route("/lanai")    
def lanai():    
    return render_template("lanai.html")

@app.route("/bigisland")    
def bigisland():    
    return render_template("bigisland.html")

@app.route("/more") 
def more(): 
    return render_template("more.html")

    
@app.route("/Airbnb")   
def Airbnb():   
    return render_template("Airbnb.html")
	
@app.route("/Airbnb_Map")   
def Airbnb_Map():   
    return render_template("Airbnb_Map.html")

@app.route("/neighborhoods")
def neighborhoods():
   
    neighborhoods = pd.read_sql("SELECT neighbourhood_group_cleansed FROM Futuristic_Airbnb_Property_Address ",engine)
    neighborhoods_list = neighborhoods['neighbourhood_group_cleansed'].unique()  
    print(neighborhoods_list)
    return jsonify(neighborhoods_list.tolist())
    
@app.route("/price/<neighborhood>")
def price(neighborhood):

    price = pd.read_sql("SELECT lp.price, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id  WHERE price < 500",engine)
    price_group = price.loc[(price["neighbourhood_group_cleansed"] == neighborhood),:]

    return jsonify(price_group["price"].tolist())  

@app.route("/security_deposit/<neighborhood>")
def security_deposit(neighborhood):

    security_deposit = pd.read_sql("SELECT lp.security_deposit, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id  WHERE security_deposit < 500",engine)
    security_deposit_group = security_deposit.loc[(security_deposit["neighbourhood_group_cleansed"] == neighborhood),:]
    
    security_deposit_group = security_deposit_group["security_deposit"].value_counts().to_dict()

    return jsonify(security_deposit_group)     

@app.route("/amenities/<neighborhood>")
def amenities(neighborhood):
    
    amenities = pd.read_sql("SELECT lp.amenities, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id",engine)
    
    amenities_group = amenities.loc[(amenities["neighbourhood_group_cleansed"] == neighborhood),:]
    
    Amenities_List = []

    for x in amenities_group["amenities"]:

        Amenities_List += x.split(',')
    
    Amenities_List.remove('translation missing: en.hosting_amenity_50')
    Amenities_List.remove('translation missing: en.hosting_amenity_49')
    Amenities_New= pd.DataFrame(Amenities_List)
    Amenities_New = Amenities_New.rename(columns = {0:"Amenities"})

    Amenities_Group = Amenities_New.groupby('Amenities')
    Amenities_Count = Amenities_Group["Amenities"].count()
    Amenities_Count = Amenities_Count.sort_values(ascending=False)
    Amenities_List = Amenities_Count[0:50]

    Amenities_Dict = Amenities_List.to_dict()
    Amenities_Dict = sorted(Amenities_Dict.items(), key = lambda kv:(kv[1], kv[0]))
    return jsonify(Amenities_Dict)

@app.route("/property_type/<neighborhood>")
def property_type(neighborhood):
   
    property = pd.read_sql("SELECT lp.property_type, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id where lp.property_type in ('Apartment','House','Condominium','Guest suite','Guesthouse','Villa','Cottage','Townhouse','Resort')",engine)
   
    property_group = property.loc[(property["neighbourhood_group_cleansed"] == neighborhood),:]
    
    property_type_dictionary = property_group["property_type"].value_counts().to_dict()
   
    return jsonify(property_type_dictionary)

# Define the route to "/roomtype/<neighborhood>"
@app.route("/room_type/<neighborhood>")
def room_type(neighborhood):
    
    room = pd.read_sql("SELECT lp.room_type, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id",engine)
    
    room_group = room.loc[(room["neighbourhood_group_cleansed"] == neighborhood),:]
    
    room_type_dictionary = room_group["room_type"].value_counts().to_dict()
    
    return jsonify(room_type_dictionary)

@app.route("/bed_type/<neighborhood>")
def bed_type(neighborhood):
    
    bed = pd.read_sql("SELECT lp.bed_type, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id",engine)
    
    bed_group = bed.loc[(bed["neighbourhood_group_cleansed"] == neighborhood),:]
   
    bed_type_dictionary = bed_group["bed_type"].value_counts().to_dict()
    
    return jsonify(bed_type_dictionary)

@app.route("/Cancellation/<neighborhood>")
def Cancellation(neighborhood):
    
    Cancellation = pd.read_sql("SELECT lp.cancellation_policy, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id",engine)
    
    Cancellation_group = Cancellation.loc[(Cancellation["neighbourhood_group_cleansed"] == neighborhood),:]
   
    Cancellation_dictionary = Cancellation_group["cancellation_policy"].value_counts().to_dict()
    
    return jsonify(Cancellation_dictionary) 

@app.route("/accom_bath_bedroom_beds/<neighborhood>")
def accom_bath_bedroom_beds(neighborhood):
    
    accom_bath_bedroom_beds = pd.read_sql("SELECT lp.accommodates,lp.bathrooms,lp.bedrooms,lp.beds, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id",engine)
    
    accom_bath_bedroom_beds_group = accom_bath_bedroom_beds.loc[(accom_bath_bedroom_beds["neighbourhood_group_cleansed"] == neighborhood),:]
   
    accommodates = accom_bath_bedroom_beds_group["accommodates"].value_counts().to_dict()
    bathrooms = accom_bath_bedroom_beds_group["bathrooms"].value_counts().to_dict()
    bedrooms = accom_bath_bedroom_beds_group["bedrooms"].value_counts().to_dict()
    beds = accom_bath_bedroom_beds_group["beds"].value_counts().to_dict()
    
    accom_bath_bedroom_beds_zip = [accommodates,bathrooms,bedrooms,beds]
    
    return jsonify(accom_bath_bedroom_beds_zip)   

@app.route("/host_listing/<neighborhood>")
def host_listing(neighborhood):
  
    host_listing_data = pd.read_sql("SELECT ah.host_listings_count, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Hosts ah INNER JOIN Futuristic_Airbnb_Listings_Property lp ON ah.host_id = lp.host_id INNER JOIN Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id WHERE ah.host_listings_count<30 and ah.host_listings_count <> 0",engine)
    
    host_listing_grouped = host_listing_data.loc[(host_listing_data["neighbourhood_group_cleansed"] == neighborhood),:]
   
    return jsonify(host_listing_grouped["host_listings_count"].tolist())    
    
@app.route("/host_visual/<neighborhood>")
def host_visual(neighborhood):
  
    host_visual_data = pd.read_sql("SELECT ah.host_is_superhost , ah.host_identity_verified, ah.host_response_time ,ah.host_response_rate, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Hosts ah INNER JOIN Futuristic_Airbnb_Listings_Property lp ON ah.host_id = lp.host_id INNER JOIN Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id WHERE ah.host_response_time not in ('Information Not Available')",engine)
    
    host_visual_grouped = host_visual_data.loc[(host_visual_data["neighbourhood_group_cleansed"] == neighborhood),:]
   
    host_is_superhost = host_visual_grouped["host_is_superhost"].value_counts().to_dict()
    host_identity_verified = host_visual_grouped["host_identity_verified"].value_counts().to_dict()
    host_response_time = host_visual_grouped["host_response_time"].value_counts().to_dict()
    host_response_rate = host_visual_grouped["host_response_rate"].value_counts().to_dict()
    
    host_visual_zip = [host_is_superhost,host_identity_verified,host_response_time,host_response_rate]
    
    return jsonify(host_visual_zip) 

@app.route("/reviews_rating/<neighborhood>")
def reviews_rating(neighborhood):
    reviews_rating_data = pd.read_sql("SELECT distinct pr.review_scores_rating,pa.listing_id ,pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Property_Reviews pr INNER JOIN Futuristic_Airbnb_Property_Address pa on pr.listing_id = pa.listing_id WHERE pr.review_scores_rating > 50",engine)
    
    reviews_rating_data_group = reviews_rating_data.loc[(reviews_rating_data["neighbourhood_group_cleansed"] == neighborhood),:]
   
    review_scores_rating = reviews_rating_data_group["review_scores_rating"].tolist()
    
    return jsonify(review_scores_rating)    

@app.route("/reviews_comments/<neighborhood>")
def reviews_comments(neighborhood):
    reviews_comments_data = pd.read_sql("SELECT distinct pr.comments,pa.listing_id ,pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Property_Reviews pr INNER JOIN Futuristic_Airbnb_Property_Address pa on pr.listing_id = pa.listing_id WHERE pr.review_scores_rating > 50",engine)
    
    reviews_comments_data_group = reviews_comments_data.loc[(reviews_comments_data["neighbourhood_group_cleansed"] == neighborhood),:]
   
    review_comments = reviews_comments_data_group["comments"].tolist()
    
    return jsonify(review_comments)  

#Tourism Routes

@app.route("/Tourism")
def Tourism():
    """Return the homepage."""
    return render_template("Tourism_Statistics.html")


@app.route("/TourismYearly")
def tourismyearly():
    return render_template("TourismYearly.html")
	
@app.route("/visitorStatistics")

def visitorStatistics():
    return render_template("VisitorStatistics.html")
	
@app.route("/Tourismislandstats")
def tourismislandstats():
    return render_template("Tourismisland_stats.html")
    
if __name__ == "__main__":
    app.run()
