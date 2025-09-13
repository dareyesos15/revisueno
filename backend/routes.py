from datetime import datetime, time
from flask import Blueprint, jsonify, request
from models import db, User, SleepRoutine, Record, Advice, Exercise

api = Blueprint("api", __name__)

# =========================
# ADVICE
# =========================
@api.route('/advice', methods=['GET'])
def get_advice():
    advice_list = Advice.query.all()
    return jsonify([
        {"id": a.id, "title": a.title, "description": a.description}
        for a in advice_list
    ])

# =========================
# EXERCISES
# =========================
@api.route('/exercises', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    return jsonify([
        {
            "id": e.id,
            "nombre": e.nombre,
            "descripcion": e.descripcion,
            "duracion": e.duracion,
            "media_url": e.media_url
        }
        for e in exercises
    ])

# =========================
# USERS
# =========================
@api.route('/users', methods=['POST'])
def create_user():
    data = request.json

    # Convertir fecha
    birthdate = None
    if data.get("birthdate"):
        birthdate = datetime.strptime(data["birthdate"], "%Y-%m-%d").date()

    # Convertir horas
    timetosleep = None
    if data.get("timetosleep"):
        timetosleep = datetime.strptime(data["timetosleep"], "%H:%M").time()

    timetowakeup = None
    if data.get("timetowakeup"):
        timetowakeup = datetime.strptime(data["timetowakeup"], "%H:%M").time()

    user = User(
        name=data.get("name"),
        birthdate=birthdate,
        timetosleep=timetosleep,
        timetowakeup=timetowakeup
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "✅ Usuario creado", "id": user.id}), 201

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "birthdate": u.birthdate.isoformat() if u.birthdate else None,
            "timetosleep": u.timetosleep,
            "timetowakeup": u.timetowakeup
        }
        for u in users
    ])

# =========================
# SLEEP ROUTINES
# =========================
@api.route('/routines', methods=['POST'])
def create_routine():
    data = request.json
    routine = SleepRoutine(
        userid=data.get("userid"),
        task=data.get("task"),
        description=data.get("description")
    )
    db.session.add(routine)
    db.session.commit()
    return jsonify({"message": "Rutina creada", "id": routine.id})

@api.route('/routines/<int:userid>', methods=['GET'])
def get_routines(userid):
    routines = SleepRoutine.query.filter_by(userid=userid).all()
    return jsonify([
        {"id": r.id, "task": r.task, "description": r.description}
        for r in routines
    ])

# =========================
# SLEEP RECORDS (Diario del sueño)
# =========================
@api.route('/records', methods=['POST'])
def create_record():
    data = request.json

    # convertir fecha
    day = None
    if data.get("day"):
        day = datetime.strptime(data["day"], "%Y-%m-%d").date()

    # convertir horas
    asleepat = None
    if data.get("asleepat"):
        asleepat = datetime.strptime(data["asleepat"], "%H:%M").time()

    awakeat = None
    if data.get("awakeat"):
        awakeat = datetime.strptime(data["awakeat"], "%H:%M").time()

    record = Record(
        userid=data.get("userid"),
        day=day,
        asleepat=asleepat,
        awakeat=awakeat,
        note=data.get("note")
    )
    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "✅ Registro de sueño creado", "id": record.id})

@api.route('/records/<int:userid>', methods=['GET'])
def get_records(userid):
    records = Record.query.filter_by(userid=userid).all()
    return jsonify([
        {
            "id": r.id,
            "day": r.day.isoformat() if r.day else None,
            "asleepat": r.asleepat.strftime("%H:%M") if r.asleepat else None,
            "awakeat": r.awakeat.strftime("%H:%M") if r.awakeat else None,
            "note": r.note
        }
        for r in records
    ])

