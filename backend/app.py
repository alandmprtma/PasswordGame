from flask import Flask, Response, jsonify, request, abort
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Koneksi ke database MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="passwordgame",
        port=3306
    )

@app.route('/bulan', methods=['GET'])
def get_bulan_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM bulan")
        bulan_data = cursor.fetchall()
        conn.close()
        return jsonify(bulan_data)
    
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    
@app.route('/country', methods=['GET'])
def get_country_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, nama_negara FROM country")
        bulan_data = cursor.fetchall()
        conn.close()
        return jsonify(bulan_data)
    
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500

@app.route('/flag/<int:id>', methods=['GET'])
def get_flag_image(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT bendera_negara FROM country WHERE id = %s", (id,))
        image_data = cursor.fetchone()
        conn.close()

        if image_data is None:
            abort(404, description="Image not found")

        return Response(image_data[0], mimetype='image/jpeg')
    
    except mysql.connector.Error as err:
        return f"Database error: {err}", 500
    

@app.route('/textcaptcha', methods=['GET'])
def get_captcha_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, text_captcha FROM captcha")
        captcha_data = cursor.fetchall()
        conn.close()
        return jsonify(captcha_data)
    
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500

@app.route('/captcha/<int:id>', methods=['GET'])
def get_captcha_image(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT gambar_captcha FROM captcha WHERE id = %s", (id,))
        image_data = cursor.fetchone()
        conn.close()

        if image_data is None:
            abort(404, description="Image not found")

        return Response(image_data[0], mimetype='image/jpeg')
    
    except mysql.connector.Error as err:
        return f"Database error: {err}", 500
    
@app.route('/irk', methods=['GET'])
def get_irk_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM irk")
        irk_data = cursor.fetchall()
        conn.close()
        return jsonify(irk_data)
    
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
