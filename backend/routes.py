from datetime import datetime, time
from flask import Blueprint, jsonify, request
from models import *

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
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "birthdate": u.birthdate.isoformat() if u.birthdate else None,
            "timetosleep": u.timetosleep.strftime("%H:%M") if u.timetosleep else None,
            "timetowakeup": u.timetowakeup.strftime("%H:%M") if u.timetowakeup else None
        }
        for u in users
    ])
    
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
    return jsonify({"message": "Usuario creado", "id": user.id}), 201
    
@api.route('/users/<int:userid>', methods=['PUT'])
def update_user(userid):
    user = User.query.get(userid)
    if not user:
        return jsonify({"message": "❌ Usuario no encontrado"}), 404

    data = request.json

    # actualizar datos
    if "name" in data:
        user.name = data["name"]

    if "birthdate" in data and data["birthdate"]:
        user.birthdate = datetime.strptime(data["birthdate"], "%Y-%m-%d").date()

    if "timetosleep" in data and data["timetosleep"]:
        user.timetosleep = datetime.strptime(data["timetosleep"], "%H:%M").time()

    if "timetowakeup" in data and data["timetowakeup"]:
        user.timetowakeup = datetime.strptime(data["timetowakeup"], "%H:%M").time()

    db.session.commit()
    
    # Devolver el objeto del usuario actualizado
    return jsonify({
        "id": user.id,
        "name": user.name,
        "birthdate": user.birthdate.isoformat() if user.birthdate else None,
        "timetosleep": user.timetosleep.strftime("%H:%M") if user.timetosleep else None,
        "timetowakeup": user.timetowakeup.strftime("%H:%M") if user.timetowakeup else None
    })


@api.route('/users/<int:userid>', methods=['DELETE'])
def delete_user(userid):
    user = User.query.get(userid)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    db.session.delete(user)  # gracias a cascade="all, delete-orphan" se eliminan registros asociados
    db.session.commit()
    return jsonify({"message": f"Usuario {user.name} eliminado correctamente"})


# =========================
# SLEEP ROUTINES
# =========================
@api.route('/routines/<int:userid>', methods=['GET'])
def get_routines(userid):
    routines = SleepRoutine.query.filter_by(userid=userid).all()
    return jsonify([
        {"id": r.id, "task": r.task, "description": r.description}
        for r in routines
    ])
    
@api.route('/routines', methods=['POST'])
def create_routine():
    data = request.json
    try:
        routine = SleepRoutine(
            userid=int(data.get("userid")),
            task=data.get("task"),
            description=data.get("description")
        )
        db.session.add(routine)
        db.session.commit()
        return jsonify({"message": "Rutina creada ✅", "id": routine.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api.route('/routines/<int:routine_id>', methods=['PUT'])
def update_routine(routine_id):
    data = request.json
    try:
        routine = SleepRoutine.query.get(routine_id)
        if not routine:
            return jsonify({"error": "Rutina no encontrada"}), 404

        routine.task = data.get("task", routine.task)
        routine.description = data.get("description", routine.description)

        db.session.commit()
        return jsonify({"message": "Rutina actualizada ✏️"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api.route('/routines/<int:routine_id>', methods=['DELETE'])
def delete_routine(routine_id):
    try:
        routine = SleepRoutine.query.get(routine_id)
        if not routine:
            return jsonify({"error": "Rutina no encontrada"}), 404

        db.session.delete(routine)
        db.session.commit()
        return jsonify({"message": "Rutina eliminada 🗑️"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# =========================
# SLEEP RECORDS (Diario del sueño)
# =========================
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
    
@api.route('/records', methods=['POST'])
def create_record():
    from datetime import datetime
    data = request.get_json(force=True)  # asegura que sea un dict

    if not isinstance(data, dict):
        return jsonify({"error": "Formato JSON inválido, se esperaba un objeto."}), 400

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
        userid=int(data.get("userid")),
        day=day,
        asleepat=asleepat,
        awakeat=awakeat,
        note=data.get("note")
    )
    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "Registro de sueño creado", "id": record.id}), 201

# 🟡 Actualizar un registro de sueño
@api.route('/records/<int:record_id>', methods=['PUT'])
def update_record(record_id):
    record = Record.query.get(record_id)
    if not record:
        return jsonify({"error": "Registro no encontrado"}), 404

    data = request.json

    if "day" in data:
        record.day = datetime.strptime(data["day"], "%Y-%m-%d").date()
    if "asleepat" in data:
        record.asleepat = datetime.strptime(data["asleepat"], "%H:%M").time()
    if "awakeat" in data:
        record.awakeat = datetime.strptime(data["awakeat"], "%H:%M").time()
    if "note" in data:
        record.note = data["note"]

    db.session.commit()
    return jsonify({"message": "Registro actualizado"})


# 🔴 Eliminar un registro de sueño
@api.route('/records/<int:record_id>', methods=['DELETE'])
def delete_record(record_id):
    record = Record.query.get(record_id)
    if not record:
        return jsonify({"error": "Registro no encontrado"}), 404

    db.session.delete(record)
    db.session.commit()
    return jsonify({"message": "Registro eliminado"})


