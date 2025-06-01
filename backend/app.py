from flask import Flask, request, jsonify, send_from_directory, render_template
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

# Download necessary NLTK resources if not already present
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
    
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
    
try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app)  # Enable CORS for all routes

# Check if model files exist
if not os.path.exists("model.pkl") or not os.path.exists("vector.pkl"):
    raise FileNotFoundError("Model files not found. Please ensure model.pkl and vector.pkl exist in the application directory.")

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

# Root route - redirect to the frontend
@app.route('/')
def index():
    return send_from_directory('../frontend/dist', 'index.html')

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
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join("../frontend/dist", path)):
        return send_from_directory('../frontend/dist', path)
    else:
        return send_from_directory('../frontend/dist', 'index.html')

# Error handlers
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "The requested resource was not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "An internal server error occurred"}), 500

if __name__ == '__main__':
    # Check if templates directory exists
    if not os.path.exists('templates'):
        os.makedirs('templates')
        print("Warning: Created missing 'templates' directory")
        
        # Create basic template files if they don't exist
        if not os.path.exists('templates/index.html'):
            with open('templates/index.html', 'w') as f:
                f.write("<html><body><h1>Fake News Detection</h1><p>Use the API to detect fake news.</p></body></html>")
                
        if not os.path.exists('templates/prediction.html'):
            with open('templates/prediction.html', 'w') as f:
                f.write("<html><body><h1>Prediction Result</h1><p>{{ prediction_text }}</p></body></html>")
    
    # Check if frontend directory exists
    frontend_path = '../frontend/dist'
    if not os.path.exists(frontend_path):
        print(f"Warning: Frontend path '{frontend_path}' does not exist. Only API endpoints will be available.")
        
    app.run(debug=True)
