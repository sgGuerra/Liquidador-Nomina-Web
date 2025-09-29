# Liquidador de Nómina Web

API REST para la gestión de empleados, cálculo de nómina, préstamos y administración de sistema, desarrollado con Django REST Framework. Incluye autenticación de administrador, cálculo automático de deducciones, manejo de préstamos múltiples y historial de nóminas.

## Tecnologías Utilizadas

- **Backend**: Django 5.2.6, Django REST Framework 3.16.1, DRF-YASG (Swagger), Python 3.12+
- **Frontend**: Next.js 14+, React, Tailwind CSS, JavaScript/TypeScript
- **Base de Datos**: PostgreSQL (Neon Tech en la nube)
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

- Docker y Docker Compose
- Git
- Credenciales de base de datos Neon Tech (configuradas en .env)

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
   Edita `backend/.env` con DATABASE_URL de Neon Tech.

2. Construye y ejecuta con Docker Compose:
   ```bash
   docker-compose up --build
   ```

Esto iniciará el backend en http://localhost:8000.

## Configuración de la Base de Datos

La DB en Neon Tech ya tiene las tablas creadas. Scripts en `db/` para referencia:

- `tabla_*.sql`: Esquemas actualizados.
- `insertar_*.sql`: Datos iniciales (cargos, tipos horas extra).
- `actualizar_*.sql`: Agregan columnas adicionales.

Si necesitas reinicializar, ejecuta los scripts en la DB.

## Migraciones de Django

Ejecuta migraciones (aunque las tablas existen, para compatibilidad):

```bash
docker-compose exec backend python manage.py migrate
```

## Ejecución del Proyecto

- Accede al backend en http://localhost:8000.
- Admin: /admin/ (login con superusuario).
- API Docs: /swagger/ (Swagger UI) y /redoc/ (ReDoc).
- Para desarrollo, modifica código y recarga con `docker-compose restart backend`.

## Desarrollo Sin Docker

1. Instala dependencias:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. Configura DATABASE_URL en `backend/.env`.

3. Ejecuta servidor:
   ```bash
   cd backend
   python manage.py runserver
   ```

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
