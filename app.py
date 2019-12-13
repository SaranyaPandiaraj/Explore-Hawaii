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
    # Run a query to find all unique neighborhoods and return a list of those neighborhoods
    neighborhoods = pd.read_sql("SELECT neighbourhood_group_cleansed FROM Futuristic_Airbnb_Property_Address ",engine)
    neighborhoods_list = neighborhoods['neighbourhood_group_cleansed'].unique()  
    print(neighborhoods_list)
    return jsonify(neighborhoods_list.tolist())
	
@app.route("/price/<neighborhood>")
def price(neighborhood):

    price = pd.read_sql("SELECT * FROM Futuristic_Airbnb_Listings_Property lp inner join Futuristic_Airbnb_Property_Address pa on lp.listing_id = pa.listing_id  WHERE price < 500",engine)
    price_group = price.loc[(price["neighbourhood_group_cleansed"] == neighborhood),:]

    return jsonify(price_group["price"].tolist())	

if __name__ == "__main__":
    app.run()
