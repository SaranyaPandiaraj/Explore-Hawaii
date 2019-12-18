import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database/FuturisticAirbnb.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Define the engine
engine = create_engine("sqlite:///database/FuturisticAirbnb.sqlite", encoding='utf8')
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

    return jsonify(security_deposit_group["security_deposit"].tolist())     

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
    
    accom_bed_bath_bed_group = bed.loc[(bed["neighbourhood_group_cleansed"] == neighborhood),:]
   
    bed_type_dictionary = accom_bed_bath_bed_group["bed_type"].value_counts().to_dict()
    
    return jsonify(bed_type_dictionary)  

@app.route("/accom_bed_bath_bed/<neighborhood>")
def accom_bed_bath_bed(neighborhood):
    
    accom_bed_bath_bed = pd.read_sql("SELECT lp.accommodates,lp.bathrooms,lp.bedrooms,lp.beds, pa.neighbourhood_group_cleansed FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id",engine)
    
    accom_bed_bath_bed_group = accom_bed_bath_bed.loc[(accom_bed_bath_bed["neighbourhood_group_cleansed"] == neighborhood),:]
   
    accommodates = accom_bed_bath_bed_group["accommodates"].value_counts().to_dict()
    bathrooms = accom_bed_bath_bed_group["bathrooms"].value_counts().to_dict()
    bedrooms = accom_bed_bath_bed_group["bedrooms"].value_counts().to_dict()
    beds = accom_bed_bath_bed_group["beds"].value_counts().to_dict()
    
    accom_bed_bath_bed_zip = [accommodates,bathrooms,bedrooms,beds]
    
    return jsonify(accom_bed_bath_bed_zip)      
    
if __name__ == "__main__":
    app.run()
