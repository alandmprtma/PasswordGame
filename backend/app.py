from flask import Flask, Response, jsonify, request, abort
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

# Koneksi ke database MySQL menggunakan variabel lingkungan
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "passwordgame"),
        port=int(os.getenv("DB_PORT", 3306))
    )

@app.route('/bulan', methods=['GET'])
def get_bulan_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM bulan")
        bulan_data = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        cursor.close()
        conn.close()
    return jsonify(bulan_data)

@app.route('/country', methods=['GET'])
def get_country_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, nama_negara FROM country")
        country_data = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        cursor.close()
        conn.close()
    return jsonify(country_data)

@app.route('/flag/<int:id>', methods=['GET'])
def get_flag_image(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT bendera_negara FROM country WHERE id = %s", (id,))
        image_data = cursor.fetchone()
        if image_data is None:
            abort(404, description="Image not found")
    except mysql.connector.Error as err:
        return f"Database error: {err}", 500
    finally:
        cursor.close()
        conn.close()
    return Response(image_data[0], mimetype='image/jpeg')

@app.route('/textcaptcha', methods=['GET'])
def get_captcha_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, text_captcha FROM captcha")
        captcha_data = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        cursor.close()
        conn.close()
    return jsonify(captcha_data)

@app.route('/captcha/<int:id>', methods=['GET'])
def get_captcha_image(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT gambar_captcha FROM captcha WHERE id = %s", (id,))
        image_data = cursor.fetchone()
        if image_data is None:
            abort(404, description="Image not found")
    except mysql.connector.Error as err:
        return f"Database error: {err}", 500
    finally:
        cursor.close()
        conn.close()
    return Response(image_data[0], mimetype='image/jpeg')

@app.route('/irk', methods=['GET'])
def get_irk_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM irk")
        irk_data = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        cursor.close()
        conn.close()
    return jsonify(irk_data)

# Function to get current score from database
def get_current_score():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT score FROM score LIMIT 1")
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    return row[0] if row else 0

# Function to update score in the database
def update_score(new_score):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE score SET score = %s WHERE score < %s and id = 1", (new_score, new_score))
    conn.commit()
    cursor.close()
    conn.close()

@app.route('/update-score', methods=['POST'])
def update_score_route():
    data = request.get_json()
    new_score = data.get('score')
    if new_score is not None:
        print("dapet : ", new_score)
        current_score = get_current_score()
        if new_score > current_score:
            update_score(new_score)
        return jsonify({"message": "Score updated successfully"}), 200
    return jsonify({"message": "Invalid data"}), 400

@app.route('/get-score', methods=['GET'])
def get_score_route():
    current_score = get_current_score()
    return jsonify({"score": current_score}), 200

if __name__ == '__main__':
    app.run(debug=True)
