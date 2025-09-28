# Liquidador de nómina web 

Sistema web para la liquidación de nómina desarrollado con Django y PostgreSQL.

## Configuración del Entorno

### Requisitos Previos
- Python 3.12+
- Docker y Docker Compose (para desarrollo local)
- PostgreSQL (proporcionado por NeonTech en producción o Docker en desarrollo)

### Instalación de Dependencias
```bash
pip install -r backend/requirements.txt
```

## Configuración de la Base de Datos

El proyecto está configurado para trabajar con dos entornos de base de datos:

### 1. Entorno de Producción (NeonTech)
Para usar la base de datos de producción en NeonTech, necesitas configurar las siguientes variables de entorno en tu archivo `.env`:

```env
PGHOST=tu-host-neontech
PGDATABASE=tu-base-datos
PGUSER=tu-usuario
PGPASSWORD=tu-contraseña
PGSSLMODE=verify-full
PGCHANNELBINDING=require
```

### 2. Entorno de Desarrollo Local (Docker)
Para desarrollo local, el proyecto incluye una configuración de Docker Compose que proporciona una base de datos PostgreSQL local.

1. Inicia la base de datos local:
```bash
docker-compose up -d
```

2. Usa el archivo `.env.local` con la siguiente configuración:
```env
PGHOST=localhost
PGDATABASE=liquidador_nomina
PGUSER=postgres
PGPASSWORD=postgres
PGSSLMODE=disable
PGCHANNELBINDING=disable
```

### Cambiar entre Entornos

Para cambiar entre entornos de desarrollo y producción:

1. Para desarrollo local:
```bash
cp backend/.env.local backend/.env
```

2. Para producción:
```bash
# Restaura tu archivo .env de producción con las credenciales de NeonTech
cp backend/.env.production backend/.env
```

## Migraciones de Base de Datos

Después de configurar tu entorno, ejecuta las migraciones:

```bash
cd backend
python manage.py migrate
```

## Respaldo y Restauración de Datos

Para respaldar la base de datos de producción y restaurarla localmente:

1. Hacer backup de la base de datos de producción:
```bash
pg_dump -h tu-host-neontech -U tu-usuario -d tu-base-datos > backup.sql
```

2. Restaurar en local:
```bash
psql -h localhost -U postgres -d liquidador_nomina < backup.sql
```

## Ejemplo de Uso

### 1. Configuración Inicial
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd Liquidador-Nomina-Web

# Instalar dependencias
pip install -r backend/requirements.txt

# Configurar el entorno (desarrollo local o producción)
cp backend/.env.local backend/.env  # Para desarrollo local
# O usa tus credenciales de producción

# Iniciar la base de datos local (solo para desarrollo)
docker-compose up -d

# Aplicar migraciones
cd backend
python manage.py migrate
```

### 2. Ejecución del Proyecto
```bash
# Desde el directorio backend
python manage.py runserver
```

El proyecto estará disponible en http://localhost:8000/

## Notas Importantes

- Nunca subas los archivos `.env` o `.env.local` al control de versiones
- Para desarrollo local, asegúrate de que Docker esté corriendo antes de iniciar el proyecto
- En producción, asegúrate de tener las credenciales correctas de NeonTech