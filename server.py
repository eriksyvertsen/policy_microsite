
from flask import Flask, request, jsonify
import csv
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        email = request.json.get('email')
        if not email:
            return jsonify({'error': 'Email is required'}), 400
            
        
            
        # Save to CSV with timestamp
        with open('subscribers.csv', 'a', newline='') as file:
            writer = csv.writer(file)
            if os.path.getsize('subscribers.csv') == 0:
                writer.writerow(['Email', 'Timestamp'])
            writer.writerow([email, datetime.now()])
            
        return jsonify({'message': 'Subscription successful'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
