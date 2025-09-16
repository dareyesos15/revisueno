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

## Guía de instalación

### **Nota:** Se debe tener instalado Node.js y Python 3.

**Página de instalación de Node.js:** https://nodejs.org/es/download
**Página de instalación Python 3:** https://www.python.org/downloads

**1. Crear entorno virtual de python**
    *python -m venv venv*

    *source venv/bin/activate* en Linux/Mac
    *.venv\Scripts\activate * en Windows

**2. Clonar el repositorio. Si es desde una bash de git se puede hacer usando el comando desde la ruta donde se desea clonar:**
    *Git clone https://github.com/dareyesos15/revisueno.git*

**3. Cambiar la ruta al del proyecto:**
    *cd revisueno*

**4. Para la instalación de dependencias se usan los siguientes comandos:**
- Dependencias de python. Desde la ruta revisueno/backend:
    *pip install -r requirements.txt*

- Dependencias de javascript y react. Desde la ruta revisueno/frontend:
    *npm install*

**5. Incializar el backend (cambiar al directorio revisueno/backend):**
- Crear base de datos: 
    *python app.py*

- Agregar datos precargados a la base de datos:
    *python seed.py*

- Iniciar servicio de backend:
    *flask --app app run*

**6. Inicializar el frontend (cambiar al directorio revisueno/frontend):**
- Iniciar servicio de frontend:
	*npm run dev*

## Direcciones de ejecución por defecto

**frontend:** http://localhost:5173/
**backend:** http://localhost:5000/