import os
import pandas as pd
import numpy as np
from flask import Flask, jsonify, render_template

app = Flask(__name__)
# @app.route("/")
# def index():
#     """Return the homepage."""
#     return render_template("index.html")

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("haha.html")

@app.route("/tourismYearly")
def tourismyearly():
    return render_template("tourismYearly.html")
@app.route("/visitorStatistics")
def visitorStatistics():
    return render_template("VisitorStatistics.html")


# @app.route("/tourismkaui")
# def tourismkaui():
#     return render_template("tourismkaui.html")
# @app.route("/tourismmaui")
# def tourismMaui():
#     return render_template("tourismmaui.html")
# @app.route("/tourismmolokai")
# def tourismMolokai():
#     return render_template("tourismmolokai.html")
@app.route("/tourismislandstats")
def tourismislandstats():
    return render_template("tourismisland_stats.html")


if __name__ == "__main__":
    app.run()
