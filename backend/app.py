from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite conexión con React

# Configuración de SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo de sueño
class SleepRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50), nullable=False)
    hours_slept = db.Column(db.Float, nullable=False)
    notes = db.Column(db.String(200), nullable=True)

# Crear BD
with app.app_context():
    db.create_all()

@app.route('/api/records', methods=['GET'])
def get_records():
    records = SleepRecord.query.all()
    return jsonify([{
        'id': r.id,
        'date': r.date,
        'hours_slept': r.hours_slept,
        'notes': r.notes
    } for r in records])

@app.route('/api/records', methods=['POST'])
def add_record():
    data = request.get_json()
    new_record = SleepRecord(
        date=data['date'],
        hours_slept=data['hours_slept'],
        notes=data.get('notes', '')
    )
    db.session.add(new_record)
    db.session.commit()
    return jsonify({"message": "Registro agregado con éxito"}), 201

if __name__ == '__main__':
    app.run(debug=True)
