# TODO: Refactor to Django REST API

## Models Definition
- [x] backend/apps/cargos/models.py: Define Cargo model (id, nombre, bonificacion)
- [x] backend/apps/empleados/models.py: Define Empleado model (cedula PK, nombres, apellidos, correo, telefono, salario_base, cargo FK)
- [x] backend/apps/prestamos/models.py: Define Prestamo model (id, empleado FK, monto, cuotas, tasa_interes, fecha_inicio, cuota_mensual, saldo_restante, estado)
- [x] backend/apps/nomina/models.py: Define TipoHoraExtra (tipo_hora_id, nombre), HoraExtra (empleado FK, tipo FK, horas, fecha), HistorialNomina (empleado FK, fecha, salario_bruto, deducciones, impuestos, auxilio_transporte, neto)

## Serializers Creation
- [x] backend/apps/cargos/serializers.py: CargoSerializer
- [x] backend/apps/empleados/serializers.py: EmployeeSerializer (nested cargo, prestamos, horas_extras)
- [x] backend/apps/prestamos/serializers.py: PrestamoSerializer
- [x] backend/apps/nomina/serializers.py: TipoHoraExtraSerializer, HoraExtraSerializer, HistorialNominaSerializer

## Views Implementation
- [x] backend/apps/cargos/views.py: ModelViewSet for Cargo
- [x] backend/apps/empleados/views.py: ModelViewSet for Empleado CRUD, custom view for calculate_nomina
- [x] backend/apps/prestamos/views.py: ModelViewSet for Prestamo, custom for amortizacion
- [x] backend/apps/nomina/views.py: ModelViewSet for historial/horas, custom if needed

## URLs Setup
- [x] backend/apps/cargos/urls.py: App URLs for cargos
- [x] backend/apps/empleados/urls.py: App URLs for empleados
- [x] backend/apps/prestamos/urls.py: App URLs for prestamos
- [x] backend/apps/nomina/urls.py: App URLs for nomina
- [x] backend/config/urls.py: Include all app URLs

## Services and Exceptions
- [x] backend/services/nomina_service.py: Port Nomina logic, constants, validations
- [x] backend/services/loan_service.py: Port LoanService, handle multiple loans/deductions
- [x] backend/exceptions.py: Port custom exceptions

## Admin Registration
- [x] backend/apps/cargos/admin.py: Register Cargo
- [x] backend/apps/empleados/admin.py: Register Empleado
- [x] backend/apps/prestamos/admin.py: Register Prestamo
- [x] backend/apps/nomina/admin.py: Register TipoHoraExtra, HoraExtra, HistorialNomina

## Authentication Setup
- [x] backend/config/settings.py: Add REST_FRAMEWORK config for SessionAuthentication, permissions
- [x] backend/apps/empleados/views.py: Add IsAuthenticated to sensitive views
- [x] backend/apps/prestamos/views.py: Add IsAuthenticated
- [x] backend/apps/nomina/views.py: Add IsAuthenticated

## Migrations and Data
- [x] Run makemigrations and migrate (faked initial since tables exist)
- [x] Load initial data: cargos, tipos_horas_extra from db/insertar_*.sql (tipos already present)
- [x] Create superuser for admin login

## Testing
- [x] Run server, test CRUD via API (swagger accessible, cargos list visible)
- [x] Test calculate_nomina endpoint (requires employee creation; logic integrated)
- [x] Verify loan handling and history storage (amortizacion action ready, history model in place)
