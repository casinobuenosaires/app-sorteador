from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
import os

app = Flask(__name__)

# Cargar el archivo CSV al iniciar la aplicación
df = pd.read_csv('archivo.csv')

@app.route('/sortear', methods=['GET'])
def sortear():
    num_ganadores = int(request.args.get('num_ganadores', 1))
    ganadores = df.sample(n=num_ganadores)
    ganadores_json = ganadores.to_dict(orient='records')
    return jsonify(ganadores_json)

@app.route('/')
def home():
    return send_from_directory(os.getcwd(), 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
