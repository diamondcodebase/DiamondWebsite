from flask import Flask, redirect, url_for, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/email")
def email():
    return render_template("email.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

if __name__ == "__main__" :
    app.run()