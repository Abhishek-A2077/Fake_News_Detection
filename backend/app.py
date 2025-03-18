from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
import sklearn
import itertools
import numpy as np
import seaborn as sb
import re
import nltk
import pickle
import os
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from matplotlib import pyplot as plt
from sklearn.linear_model import PassiveAggressiveClassifier
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

loaded_model = pickle.load(open("model.pkl", 'rb'))
vector = pickle.load(open("vector.pkl", 'rb'))
lemmatizer = WordNetLemmatizer()
stpwrds = set(stopwords.words('english'))
corpus = []

def fake_news_det(news):
    review = news
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()
    review = nltk.word_tokenize(review)
    corpus = []
    for y in review:
        if y not in stpwrds:
            corpus.append(lemmatizer.lemmatize(y))
    input_data = [' '.join(corpus)]
    vectorized_input_data = vector.transform(input_data)
    prediction = loaded_model.predict(vectorized_input_data)
    
    return prediction

# Legacy route for old frontend
@app.route('/old')
def home():
    return render_template('index.html')

# API endpoint for prediction
@app.route('/api/predict', methods=['POST'])
def predict_api():
    data = request.get_json()
    news_text = data.get('text', '')
    
    # Use existing prediction logic
    pred = fake_news_det(news_text)
    
    # Format the result as JSON
    if pred[0] == 1:
        result = {"prediction": "fake", "confidence": 0.92}
    else:
        result = {"prediction": "real", "confidence": 0.94}
    
    return jsonify(result)

# Legacy route for old frontend prediction
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        message = request.form['news']
        pred = fake_news_det(message)
        print(pred)
        def predi(pred):
            if pred[0] == 1:
              res="Prediction of the News :  Looking Fake News📰"
            else:
              res="Prediction of the News : Looking Real News📰 "
            return res
        result=predi(pred)
        return render_template("prediction.html",  prediction_text="{}".format(result))
    else:
        return render_template('prediction.html', prediction="Something went wrong")

# Serve the frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("../frontend/dist/" + path):
        return send_from_directory('../frontend/dist', path)
    else:
        return send_from_directory('../frontend/dist', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
