# 🌙 Revisueño

**Revisueño** es una aplicación web diseñada para adultos mayores, con el objetivo de ayudarlos a mejorar y mantener hábitos de sueño saludables.
La aplicación proporciona un entorno simple, accesible y práctico para acompañar a los usuarios en sus rutinas antes de dormir y en el seguimiento de su descanso.

## ✨ Funcionalidades principales

- **📝 Lista de consejos**
Recomendaciones fáciles de seguir para mejorar la higiene del sueño y crear un ambiente más adecuado para descansar.

- **🧘 Rutinas de ejercicios de relajación**
Una serie de ejercicios suaves y guiados para relajarse antes de dormir y reducir el estrés acumulado del día.

- **📖 Registro del sueño (Diario del Sueño)**
Permite al usuario guardar la hora en que se acuesta, se despierta y anotar observaciones.
Además, calcula automáticamente el tiempo total de descanso de cada noche.

- **🌙 Rutina antes de dormir**
El usuario puede definir y seguir una lista personalizada de actividades que desea realizar cada noche (por ejemplo: meditar, leer, tomar agua).
Cada paso puede marcarse como completado, y al finalizar todos, la aplicación felicita al usuario por cumplir su rutina.

## 🚀 Tecnologías utilizadas
- **Frontend:** React (Vite + JSX)
- **Backend:** Flask (Python)
- **Base de datos:** SQLite (con SQLAlchemy ORM)
- **Otros:** CORS para la conexión frontend-backend

## Comandos de ejecución

**Levantar entorno virtual de python**
- *Windows* -> .\\.venv\Scripts\activate
- *Sistemas Unix* -> source .venv/bin/activate

**Instalar dependencias de python** ->
pip install -r backend/requirements.txt

**Levantar servidor Flask** ->
- cd backend
- python app.py

**Levantar frontend** ->
- cd frontend
- npm install && npm run dev
.
## Direcciones de ejecución por defecto

**frontend:** http://localhost:5173/
**backend:** http://localhost:5000/