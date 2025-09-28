# Historias de Usuario - Liquidador de Nómina Web

Este documento describe las historias de usuario implementadas en el sistema de liquidación de nómina, basado en las funcionalidades desarrolladas durante la refactorización a una API REST con Django.

## 1. Gestión de Cargos

### HU-01: Como administrador, quiero gestionar cargos para asignar bonificaciones a empleados.
- **Criterios de Aceptación**:
  - Crear, leer, actualizar y eliminar cargos.
  - Cada cargo tiene nombre y bonificación (ej. "Empleado nuevo": 50,000 COP).
  - Validación de datos obligatorios.
- **Funcionalidades**: API REST /api/cargos/, admin Django, autenticación requerida para escritura.
- **Responsable**: Felipe

### HU-02: Como administrador, quiero ver la lista de cargos disponibles.
- **Criterios de Aceptación**:
  - Listar todos los cargos con bonificaciones.
  - Acceso de solo lectura sin autenticación.
- **Funcionalidades**: GET /api/cargos/, admin interface.
- **Responsable**: Felipe

## 2. Gestión de Empleados

### HU-03: Como administrador, quiero crear empleados con datos completos.
- **Criterios de Aceptación**:
  - Crear empleado con cédula (única, 8-10 dígitos), nombres, apellidos, correo, teléfono, cargo, salario base.
  - Validaciones: Cédula numérica, nombres alfabéticos, salario >=1,423,500 COP.
  - Error 400 en datos inválidos.
- **Funcionalidades**: POST /api/empleados/, admin, autenticación requerida.
- **Responsable**: Sebastian

### HU-04: Como administrador, quiero consultar y modificar datos de empleados.
- **Criterios de Aceptación**:
  - Leer lista de empleados con datos anidados (cargo).
  - Actualizar empleado existente.
  - Eliminar empleado.
- **Funcionalidades**: GET/PUT/DELETE /api/empleados/{cedula}, admin.
- **Responsable**: Luis Carlos Guerra

### HU-05: Como administrador, quiero calcular la nómina de un empleado.
- **Criterios de Aceptación**:
  - Calcular salario bruto (base + bonificación + horas extra).
  - Aplicar deducciones (salud 4%, pensión 4%, préstamos desde el más antiguo, límite 50% post-legal).
  - Calcular impuestos (basado en UVT), auxilio transporte si <=2*min.
  - Agregar horas extra al empleado, guardar historial de nómina.
  - Retornar detalles del cálculo.
- **Funcionalidades**: POST /api/empleados/{cedula}/calculate_nomina/, admin, autenticación requerida.
- **Responsable**: Luis Carlos Guerra

## 3. Gestión de Préstamos

### HU-06: Como administrador, quiero crear préstamos para empleados.
- **Criterios de Aceptación**:
  - Crear préstamo con monto, cuotas, tasa interés, fecha inicio.
  - Calcular cuota mensual usando amortización Francesa.
  - Inicializar saldo restante = monto, estado = 'ACTIVO'.
  - Validar monto >0, cuotas >0.
- **Funcionalidades**: POST /api/prestamos/, admin, autenticación requerida.
- **Responsable**: Sebastian

### HU-07: Como administrador, quiero gestionar pagos de préstamos.
- **Criterios de Aceptación**:
  - Procesar pago mensual, actualizar saldo/interés/capital.
  - Marcar como completado si saldo =0.
  - Guardar historial de pagos.
  - Error si pago excede saldo.
- **Funcionalidades**: POST /api/prestamos/{id}/amortizacion/, admin.
- **Responsable**: Cano

### HU-08: Como administrador, quiero consultar préstamos de empleados.
- **Criterios de Aceptación**:
  - Listar préstamos con saldo y estado.
  - Ver detalles de un préstamo.
- **Funcionalidades**: GET /api/prestamos/, admin.
- **Responsable**: Cano

## 4. Gestión de Nómina y Horas Extra

### HU-09: Como administrador, quiero gestionar tipos de horas extra.
- **Criterios de Aceptación**:
  - CRUD para tipos (Diurnas, Nocturnas, Festivas).
- **Funcionalidades**: API /api/tipos_horas_extra/, admin.

### HU-10: Como administrador, quiero registrar horas extra para empleados.
- **Criterios de Aceptación**:
  - Crear horas extra con tipo, cantidad (<=50 total), fecha.
  - Asociar a empleado.
- **Funcionalidades**: API /api/horas_extras/, admin, autenticación requerida.
- **Responsable**: Luis Carlos Guerra

### HU-11: Como administrador, quiero consultar historial de nóminas.
- **Criterios de Aceptación**:
  - Listar historiales por empleado o general.
  - Ver detalles: bruto, deducciones, impuestos, auxilio, neto, fecha.
- **Funcionalidades**: GET /api/historial_nomina/, admin.
- **Responsable**: Cano

## 5. Autenticación y Seguridad

### HU-12: Como administrador, quiero acceder al sistema de forma segura.
- **Criterios de Aceptación**:
  - Login/logout en /admin/.
  - Sesiones para autenticación en API.
  - Operaciones de escritura requieren autenticación (403 si no).
- **Funcionalidades**: Django admin, session auth.
- **Responsable**: Felipe

## 6. Validaciones y Reglas de Negocio

### HU-13: Como sistema, quiero validar datos de entrada.
- **Criterios de Aceptación**:
  - Cédula: 8-10 dígitos numéricos.
  - Nombres/apellidos: Solo letras y espacios.
  - Salario: >= mínimo legal (1,423,500 COP).
  - Horas extra: <=50 mensuales.
  - Préstamos: Deducción <=50% después de deducciones legales.
  - Errores claros en API (400).
- **Funcionalidades**: Model validators, service exceptions.
- **Responsable**: Sebastian

### HU-14: Como sistema, quiero calcular nómina automáticamente.
- **Criterios de Aceptación**:
  - Usar constantes: UVT=49,799, auxilio=200,000, salud/pensión=4%.
  - Factores horas extra: Diurnas 1.25x, Nocturnas 1.75x, Festivas 2.5x.
  - Amortización Francesa para préstamos.
- **Funcionalidades**: NominaService, LoanService.
- **Responsable**: Sebastian

## Notas Generales
- Todas las historias requieren acceso de administrador para modificaciones.
- La API es RESTful con JSON responses.
- Documentación en /swagger/.
- Base de datos PostgreSQL en Neon Tech.
- Funcionalidades probadas: CRUD, cálculos, validaciones, autenticación.
