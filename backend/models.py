from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Tabla User
class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    timetosleep = db.Column(db.String(8), nullable=True)
    timetowakeup = db.Column(db.String(8), nullable=True)

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
    asleepat = db.Column(db.String(8), nullable=True)
    awakeat = db.Column(db.String(8), nullable=True)
    note = db.Column(db.Text, nullable=True)
