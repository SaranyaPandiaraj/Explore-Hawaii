import os

import pandas as pd
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


################################################
# Database Setup
################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Samples_Metadata = Base.classes.sample_metadata
Samples = Base.classes.samples


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])


@app.route("/samples/<sample>")
def samples(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

    # Sort by sample
    sample_data.sort_values(by=sample, ascending=False, inplace=True)

    # Format the data to send as json
    data = {
        "otu_ids": sample_data.otu_id.values.tolist(),
        "sample_values": sample_data[sample].values.tolist(),
        "otu_labels": sample_data.otu_label.tolist(),
    }
    return jsonify(data)
@app.route("/stateWide")
def stateWide():
    return render_template("stateWide.html")
@app.route("/tourismoahu")
def tourismoahu():
    return render_template("tourismoahu.html")
@app.route("/tourismkaui")
def tourismkaui():
    return render_template("tourismkaui.html")
@app.route("/tourismmaui")
def tourismMaui():
    return render_template("tourismmaui.html")
@app.route("/tourismmolokai")
def tourismMolokai():
    return render_template("tourismmolokai.html")
@app.route("/tourismLanai")
def tourismLanai():
    return render_template("tourismLanai.html")
@app.route("/tourismHawiiIsland")
def tourismHawiiIslands():
    return render_template("tourismHawiiIslands.html")
@app.route("/tourismMap")
def tourismMap():
    return render_template("tourismMaps.html")





if __name__ == "__main__":
    app.run()
