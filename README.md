# 🌙 Revisueño

**Revisueño** es una aplicación web pensada para ayudar a los adultos mayores con hábitos e higiene del sueño.  
Permite registrar horas de sueño, añadir notas, consultar historial y recibir consejos de relajación antes de dormir.

## 🚀 Tecnologías utilizadas
- **Frontend:** React (Vite + JSX)
- **Backend:** Flask (Python)
- **Base de datos:** SQLite (con SQLAlchemy ORM)
- **Otros:** CORS para la conexión frontend-backend

## Comandos de ejecución

**Levantar entorno virtual de python**
- *Windows:* .\\.venv\Scripts\activate
- *Sistemas Unix:* source .venv/bin/activate

**Instalar dependencias de python**
pip install -r backend/requirements.txt

**Levantar servidor Flask**
cd backend
python app.py

**Levantar frontend**
cd frontend
npm install && npm run dev
.
## Direcciones de ejecución por defecto

**frontend:** http://localhost:5173/
**backend:** http://localhost:5000/