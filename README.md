# Liquidador de Nómina Web

API REST para la gestión de empleados, cálculo de nómina, préstamos y administración de sistema, desarrollado con Django REST Framework. Incluye autenticación de administrador, cálculo automático de deducciones, manejo de préstamos múltiples y historial de nóminas.

## Tecnologías Utilizadas

- **Backend**: Django 5.2.6, Django REST Framework 3.16.1, DRF-YASG (Swagger), Python 3.12+
- **Frontend**: Next.js 14+, React, Tailwind CSS, JavaScript/TypeScript
- **Base de Datos**: PostgreSQL (local via Docker)
- **Contenerización**: Docker, Docker Compose
- **Autenticación**: Sesiones de Django (admin-only para operaciones de escritura)
- **Lenguajes**: Python, SQL, JavaScript

## Estructura del Proyecto

- **backend/**: Aplicación Django con las siguientes apps:
  - `cargos/`: Modelo y API para cargos (con bonificación).
  - `empleados/`: Modelo y API para empleados (CRUD, cálculo de nómina).
  - `nomina/`: Modelos para tipos de horas extra, horas extra, historial de nómina.
  - `prestamos/`: Modelo y API para préstamos (con amortización).
  - `services/`: Lógica de negocio portada de clases antiguas (NominaService, LoanService).
  - `exceptions/`: Excepciones personalizadas para validaciones.
- **db/**: Scripts SQL actualizados para esquemas de tablas (incluyendo columnas adicionales como correo, teléfono, cuota_mensual, etc.).
- **frontend/**: Dockerfile para el frontend (aún en desarrollo).
- **docker-compose.yml**: Configuración para ejecutar el proyecto con Docker.

## Funcionalidades Principales

- **Gestión de Empleados**: CRUD completo con validaciones (cédula, salario mínimo, etc.).
- **Cálculo de Nómina**: Automático con bonificaciones, horas extra, deducciones (salud 4%, pensión 4%), impuestos UVT, auxilio transporte, préstamos (múltiples, deducción del más antiguo, límite 50% post-deducción legal).
- **Préstamos**: Creación con amortización Francesa, pagos con actualización de saldo, historial.
- **Admin**: Interfaz Django para gestión de datos, login requerido para operaciones sensibles.
- **API**: Endpoints REST con documentación Swagger (/swagger/), autenticación de sesión.

## Requisitos Previos

- Docker y Docker Compose (para Opción 1)
- Git
- Python 3.12+ y pip (para Opción 2)
- Node.js y npm (para Opción 2)

## Descarga del Proyecto

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/sgGuerra/Liquidador-Nomina-Web.git
cd Liquidador-Nomina-Web
```

## Instalación y Configuración

### Opción 1: Con Docker (Recomendado - Base de datos local incluida)

Ejecuta el proyecto con Docker Compose (las imágenes se descargarán automáticamente de Docker Hub):

```bash
docker-compose up
```

Esto iniciará:
- Backend en http://localhost:8000
- Frontend en http://localhost:3000
- Base de datos PostgreSQL local (inicializada automáticamente con tablas y datos de ejemplo)

No se requiere configuración adicional de base de datos.

Las imágenes Docker están disponibles en Docker Hub:
- [lcguerra/liquidador-frontend](https://hub.docker.com/r/lcguerra/liquidador-frontend)
- [lcguerra/liquidador-backend](https://hub.docker.com/r/lcguerra/liquidador-backend)
- [lcguerra/liquidador-db](https://hub.docker.com/r/lcguerra/liquidador-db)

## Configuración de la Base de Datos

La base de datos PostgreSQL se inicializa automáticamente con las tablas y datos de ejemplo al ejecutar `docker-compose up`. Los scripts SQL están en `db/` para referencia:

- `tabla_*.sql`: Esquemas de tablas.
- `insertar_*.sql`: Datos iniciales (cargos, tipos de horas extra).

## Migraciones de Django

Ejecuta migraciones (aunque las tablas existen, para compatibilidad):

```bash
docker-compose exec backend python manage.py migrate
```

## Ejecución del Proyecto

- Accede al backend en http://localhost:8000.
- Admin: http://localhost:8000/admin/ (login con superusuario).
- Documentación API Swagger: http://localhost:8000/swagger/
- Documentación API ReDoc: http://localhost:8000/redoc/
- Para desarrollo, modifica código y recarga con `docker-compose restart backend`.

### Opción 2: Desarrollo Local (Backend y Frontend en local, Base de datos en Neon Tech)

Si deseas desarrollar localmente sin Docker, instala las dependencias y configura una base de datos en Neon Tech:

1. **Instala dependencias del backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Instala dependencias del frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configura la base de datos:**
   - Crea una cuenta en [Neon Tech](https://neon.tech/).
   - Crea un nuevo proyecto de PostgreSQL.
   - Copia la URL de conexión (DATABASE_URL).
   - Crea el archivo `backend/.env` y agrega:
     ```
     DATABASE_URL=postgresql://usuario:password@host/dbname
     ```

4. **Ejecuta las migraciones de Django:**
   ```bash
   cd backend
   python manage.py migrate
   ```

5. **Ejecuta el backend:**
   ```bash
   python manage.py runserver
   ```
   Accede en http://localhost:8000.

6. **Ejecuta el frontend (en otra terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   Accede en http://localhost:3000.

## Uso de la API

La API es RESTful y acepta/envía JSON. Para testing, autenticación deshabilitada temporalmente. Usa herramientas como curl, Postman o el frontend en /frontend.

### Cargos
- **Listar**: GET /api/cargos/
- **Crear**: POST /api/cargos/  
  ```json
  {"nombre": "Nuevo Cargo", "bonificacion": 50000}
  ```
- **Detalle**: GET /api/cargos/{id}/
- **Actualizar**: PUT /api/cargos/{id}/  
  ```json
  {"nombre": "Cargo Actualizado", "bonificacion": 60000}
  ```
- **Eliminar**: DELETE /api/cargos/{id}/

### Empleados
- **Listar**: GET /api/empleados/
- **Crear**: POST /api/empleados/  
  ```json
  {"cedula": "1234567890", "nombres": "Juan", "apellidos": "Pérez", "correo": "juan@example.com", "telefono": "3001234567", "salario_base": 1500000, "cargo_id": 1}
  ```
- **Detalle**: GET /api/empleados/{cedula}/
- **Actualizar**: PUT /api/empleados/{cedula}/  
  ```json
  {"nombres": "Juan Carlos", "salario_base": 1600000, "cargo_id": 2}
  ```
- **Eliminar**: DELETE /api/empleados/{cedula}/
- **Calcular Nómina**: POST /api/empleados/{cedula}/calculate_nomina/

### Préstamos
- **Listar**: GET /api/prestamos/
- **Crear**: POST /api/prestamos/  
  ```json
  {"empleado": 1, "monto": 1000000, "cuotas": 12, "tasa_interes": 0.02, "fecha_inicio": "2023-01-01"}
  ```
- **Detalle**: GET /api/prestamos/{id}/
- **Actualizar**: PUT /api/prestamos/{id}/  
  ```json
  {"estado": "COMPLETADO"}
  ```
- **Eliminar**: DELETE /api/prestamos/{id}/
- **Amortización (Pago)**: POST /api/prestamos/{id}/amortizacion/  
  ```json
  {"monto_pago": 85000}
  ```

### Tipos de Hora Extra
- **Listar**: GET /api/tipos-hora-extra/
- **Crear**: POST /api/tipos-hora-extra/  
  ```json
  {"nombre": "Nocturna", "factor": 1.75}
  ```
- **Detalle/Actualizar/Eliminar**: Similar a Cargos, con {id}

### Horas Extra
- **Listar**: GET /api/horas-extra/
- **Crear**: POST /api/horas-extra/  
  ```json
  {"empleado": 1, "tipo": 1, "cantidad": 5, "fecha": "2023-10-01"}
  ```
- **Detalle/Actualizar/Eliminar**: Similar, con {id}

### Historial de Nómina
- **Listar**: GET /api/historial-nomina/
- Solo lectura, no crear/actualizar/eliminar directamente.

## Notas Importantes

- Autenticación: Solo admin puede crear/modificar datos; login en /admin/.
- Validaciones: Salario >=1,423,500 COP, cédula 8-10 dígitos, horas extra <=50, préstamos <=50% deducción.
- Cálculo: Incluye constantes legales (UVT, auxilio), amortización Francesa.
- Nunca subas `.env` al repo.
- Frontend en desarrollo.
