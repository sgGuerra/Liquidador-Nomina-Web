# Liquidador de Nómina Web

Sistema web para la liquidación de nómina desarrollado con Django, utilizando Docker para contenerización y scripts SQL para la base de datos.

## Tecnologías Utilizadas

- **Backend**: Django 5.2.6, Django REST Framework 3.16.1, Python 3.12+
- **Base de Datos**: PostgreSQL 16
- **Contenerización**: Docker, Docker Compose
- **Lenguajes**: Python, SQL

## Estructura del Proyecto

- **backend/**: Aplicación Django con las siguientes apps:
  - `cargos/`: Gestión de cargos.
  - `empleados/`: Gestión de empleados.
  - `nomina/`: Lógica de cálculo de nómina.
  - `prestamos/`: Gestión de préstamos.
  - `controladores_python/`: Controladores adicionales en Python.
  - `model/`: Clases de modelo personalizadas.
- **db/**: Scripts SQL para crear tablas y datos iniciales.
- **frontend/**: Dockerfile para el frontend (aún en desarrollo).
- **docker-compose.yml**: Configuración para ejecutar el proyecto con Docker.

## Requisitos Previos

- Docker y Docker Compose
- Git

## Descarga del Proyecto

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/sgGuerra/Liquidador-Nomina-Web.git
cd Liquidador-Nomina-Web
```

## Instalación y Configuración

1. Copia el archivo de ejemplo de entorno:
   ```bash
   cp backend/env_example backend/.env
   ```
   Edita `backend/.env` con tus configuraciones (ej. credenciales de DB si no usas Docker).

2. Construye y ejecuta con Docker Compose:
   ```bash
   docker-compose up --build
   ```

Esto iniciará el backend en http://localhost:8000 y la base de datos PostgreSQL local.

## Configuración de la Base de Datos

El proyecto incluye scripts SQL en la carpeta `db/` para inicializar la base de datos:

- `tabla_*.sql`: Crean las tablas principales (cargos, empleados, nómina, préstamos, etc.).
- `insertar_*.sql`: Insertan datos iniciales.
- `borrar_*.sql`: Scripts para limpiar datos.
- `actualizar_*.sql`: Actualizaciones de tablas.

Después de iniciar Docker Compose, conecta a la DB y ejecuta estos scripts si es necesario para poblar datos iniciales.

## Migraciones de Django

Una vez que el contenedor esté corriendo, ejecuta las migraciones:

```bash
docker-compose exec backend python manage.py migrate
```

## Ejecución del Proyecto

- Accede al backend en http://localhost:8000.
- Para desarrollo, puedes modificar el código y recargar con `docker-compose restart backend`.

## Desarrollo Sin Docker

Si prefieres ejecutar sin Docker:

1. Instala dependencias:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. Configura la base de datos (PostgreSQL local o externa) en `backend/.env`.

3. Ejecuta migraciones y servidor:
   ```bash
   cd backend
   python manage.py migrate
   python manage.py runserver
   ```

## Notas Importantes

- Nunca subas los archivos `.env` al control de versiones.
- Los scripts en `db/` son útiles para inicialización manual de la DB.
- El frontend está en desarrollo; actualmente solo tiene un Dockerfile.
