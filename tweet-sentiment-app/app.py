from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

# Load the model and vectorizer
model = pickle.load(open('sentiment_model.pkl', 'rb'))
vectorizer = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    tweet = data['tweet']
    
    # Transform and predict
    transformed = vectorizer.transform([tweet])
    prediction = model.predict(transformed)[0]

    sentiment = "Positive 😊" if prediction == 1 else "Negative 😞"
    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True)
