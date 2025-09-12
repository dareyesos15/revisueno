from app import app, db
from models import Advice, Exercise

# ==========================
# Seeds para consejos (Advice)
# ==========================
advice_list = [
    {"title": "Evita cafeína", "description": "No consumas café, té o refrescos con cafeína al menos 6 horas antes de dormir."},
    {"title": "Rutina fija", "description": "Intenta acostarte y levantarte a la misma hora todos los días, incluso fines de semana."},
    {"title": "Ambiente relajado", "description": "Mantén tu habitación oscura, fresca y silenciosa para favorecer el sueño."},
    {"title": "Desconexión digital", "description": "Evita usar dispositivos electrónicos al menos 30 minutos antes de acostarte."},
    {"title": "Ejercicio moderado", "description": "Realiza actividad física durante el día, pero evita entrenar justo antes de dormir."},
    {"title": "Relajación", "description": "Practica técnicas de respiración o meditación ligera antes de acostarte."}
]

# ==========================
# Seeds para ejercicios (Exercise)
# ==========================
exercises_list = [
    {
        "nombre": "Respiración 4-7-8",
        "descripcion": (
            "1. Inhala por la nariz contando hasta 4.\n"
            "2. Mantén la respiración contando hasta 7.\n"
            "3. Exhala lentamente por la boca contando hasta 8.\n"
            "4. Repite el ciclo 4 veces."
        ),
        "duracion": 60,
        "media_url": None
    },
    {
        "nombre": "Relajación muscular progresiva",
        "descripcion": (
            "1. Siéntate o recuéstate en un lugar cómodo.\n"
            "2. Tensa los músculos de los pies durante 5 segundos y suéltalos.\n"
            "3. Sube por piernas, abdomen, brazos y rostro, relajando cada grupo muscular.\n"
            "4. Respira profundo al final."
        ),
        "duracion": 180,
        "media_url": None
    },
    {
        "nombre": "Visualización guiada",
        "descripcion": (
            "1. Cierra los ojos y respira profundamente.\n"
            "2. Imagina un lugar tranquilo (playa, bosque, montaña).\n"
            "3. Concéntrate en los sonidos, olores y sensaciones de ese lugar.\n"
            "4. Mantén la visualización durante algunos minutos."
        ),
        "duracion": 120,
        "media_url": None
    }
]

# ==========================
# Ejecución de seeds
# ==========================
with app.app_context():
    # Limpiar datos previos (útil en desarrollo)
    db.session.query(Advice).delete()
    db.session.query(Exercise).delete()

    # Insertar consejos
    for item in advice_list:
        consejo = Advice(title=item["title"], description=item["description"])
        db.session.add(consejo)

    # Insertar ejercicios
    for item in exercises_list:
        ejercicio = Exercise(
            nombre=item["nombre"],
            descripcion=item["descripcion"],
            duracion=item["duracion"],
            media_url=item["media_url"]
        )
        db.session.add(ejercicio)

    db.session.commit()
    print("✅ Base de datos inicializada con consejos y ejercicios de relajación.")
