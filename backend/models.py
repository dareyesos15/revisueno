from flask_sqlalchemy import SQLAlchemy
from datetime import time

db = SQLAlchemy()

# Tabla User
class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    timetosleep = db.Column(db.Time, nullable=True)
    timetowakeup = db.Column(db.Time, nullable=True)

    # Relaciones
    routines = db.relationship("SleepRoutine", backref="user", lazy=True, cascade="all, delete-orphan")
    records = db.relationship("Record", backref="user", lazy=True, cascade="all, delete-orphan")

# Tabla SleepRoutine
class SleepRoutine(db.Model):
    __tablename__ = "sleeprutine"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userid = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    task = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=True)

# Tabla Record
class Record(db.Model):
    __tablename__ = "record"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userid = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    day = db.Column(db.Date, nullable=False)
    asleepat = db.Column(db.Time, nullable=True)
    awakeat = db.Column(db.Time, nullable=True)
    note = db.Column(db.Text, nullable=True)
    
# Tabla Advice
class Advice(db.Model):
    __tablename__ = "advice"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=True)
    
# Tabla Exercise
class Exercise(db.Model):
    __tablename__ = "exercise"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    duracion = db.Column(db.String(20), nullable=True)  # Ejemplo: "5 min", "300 seg"
    media_url = db.Column(db.String(200), nullable=True)  # audio o video
    
