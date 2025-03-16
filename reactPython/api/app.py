from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
import my_Python_file

app = Flask(__name__)

# Allow CORS for all routes, allowing requests only from localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    source = data.get("source")
    destination = data.get("destination")

    if not source or not destination:
        return jsonify({"error": "Invalid input"}), 400

    result = my_Python_file.process_coordinates(source, destination)  
    return jsonify(result)

@app.route('/schedule-ride', methods=['POST'])
def schedule_ride():
    data = request.json
    if not data or "pickup" not in data or "destination" not in data or "scheduled_time" not in data:
        return jsonify({"error": "Missing fields"}), 400

    return jsonify({"message": "Ride scheduled successfully", "data": data}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)













# from flask import Flask,request, jsonify # type: ignore

# from flask_cors import CORS # type: ignore #extra
# import my_Python_file

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) #extra



# @app.route('/api/calculate', methods=['POST'])
# def calculate():
#     data = request.json
#     source = data.get("source")
#     destination = data.get("destination")

#     if not source or not destination:
#         return jsonify({"error": "Invalid input"}), 400

#     result = my_Python_file.process_coordinates(source, destination)  
#     return jsonify(result)
    
   

# if __name__ == '__main__':
#     app.run(debug=True,host='0.0.0.0', port=5000)
#     # app.run(debug=True)
