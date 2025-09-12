from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import *

app = Flask(__name__)
CORS(app)

# Configuración de SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar base de datos
db.init_app(app)

with app.app_context():
    db.create_all()  # 🔹 Aquí se crean las tablas si no existen
