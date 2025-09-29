# Historias de Usuario - Liquidador de Nómina Web

Este documento describe las historias de usuario basadas en los requisitos funcionales, no funcionales y reglas de negocio del proyecto. Se han alineado con las funcionalidades actuales del sistema web desarrollado con Django REST Framework y Next.js.

## Requisitos Funcionales

### HU-01: Como administrador, quiero registrar datos básicos del empleado para gestionar su información.
- **Criterios de Aceptación**:
  - Ingresar nombre, cargo, salario base, tipo de contrato y horario laboral.
  - Validar datos obligatorios y formatos correctos.
  - Integrar con API REST para almacenamiento en base de datos.
- **Responsable**: Juan Felipe Ruiz
- **Estado**: Completada (Backend API implementada)

### HU-02: Como administrador, quiero calcular automáticamente el salario neto del empleado.
- **Criterios de Aceptación**:
  - Calcular basado en salario base, días trabajados, auxilio de transporte (si aplica), horas extras, deducciones legales (salud, pensión, FSP), préstamos vigentes.
  - Aplicar reglas de negocio RN01-RN10.
  - Retornar detalles del cálculo en JSON.
- **Responsable**: Sebastián Buitrago
- **Estado**: Completada (Backend cálculo implementado)

### HU-03: Como administrador, quiero gestionar horas extras del empleado.
- **Criterios de Aceptación**:
  - Registrar horas extras clasificadas en diurnas, nocturnas, dominicales o festivas.
  - Calcular recargos según factores (RN03).
  - Validar límite total de horas extras.
- **Responsable**: Santiago Cano
- **Estado**: Completada (Backend API para tipos y horas extras)

### HU-04: Como administrador, quiero calcular y gestionar préstamos del empleado.
- **Criterios de Aceptación**:
  - Agregar préstamos con monto, cuotas, interés (6%).
  - Calcular deducción mensual con amortización Francesa.
  - Gestionar pagos y actualizar saldo.
- **Responsable**: Luis Carlos Guerra
- **Estado**: Completada (Backend API de préstamos)

### HU-05: Como administrador, quiero aplicar deducciones legales automáticamente.
- **Criterios de Aceptación**:
  - Deducir salud (4%), pensión (4%), FSP (según RN06) del salario.
  - Aplicar según normatividad colombiana.
- **Responsable**: Sebastián Buitrago
- **Estado**: Completada (Integrado en cálculo de nómina)

### HU-06: Como administrador, quiero generar reportes de liquidación.
- **Criterios de Aceptación**:
  - Generar reportes en PDF (individual) y Excel (consolidado).
  - Incluir detalles de cálculo, fechas, totales.
- **Responsable**: Santiago Cano
- **Estado**: Pendiente (Backend listo, frontend pendiente)

### HU-07: Como administrador, quiero visualizar y exportar resultados de liquidación.
- **Criterios de Aceptación**:
  - Visualizar resultado en interfaz web.
  - Exportar en formatos PDF y Excel.
- **Responsable**: Juan Felipe Ruiz
- **Estado**: Pendiente (Frontend en desarrollo)

### HU-08: Como administrador, quiero una interfaz gráfica web amigable para el sistema.
- **Criterios de Aceptación**:
  - Interfaz clara para ingresar datos, realizar cálculos y ver resultados.
  - Implementada con Next.js, Tailwind CSS, responsiva.
- **Responsable**: Luis Carlos Guerra
- **Estado**: Pendiente (Frontend en desarrollo)

## Requisitos No Funcionales

### HU-09: Como desarrollador, quiero que el sistema sea portable en Windows, macOS y Linux.
- **Criterios de Aceptación**:
  - Compatible mediante Python y tecnologías web.
  - Ejecutable en múltiples OS sin modificaciones.
- **Responsable**: Juan Felipe Ruiz
- **Estado**: Completada (Python y web)

### HU-10: Como usuario, quiero que las operaciones sean rápidas.
- **Criterios de Aceptación**:
  - Cálculos y reportes en menos de 2 segundos para hasta 50 empleados.
- **Responsable**: Sebastián Buitrago
- **Estado**: Completada (Optimizado en backend)

### HU-11: Como usuario, quiero una interfaz usable sin conocimientos técnicos avanzados.
- **Criterios de Aceptación**:
  - Interfaz intuitiva, clara, fácil de navegar.
- **Responsable**: Luis Carlos Guerra
- **Estado**: Pendiente (Frontend en desarrollo)

### HU-12: Como desarrollador, quiero código mantenible y modular.
- **Criterios de Aceptación**:
  - Estructura modular (src/, test/, sql/).
  - Fácil modificación futura.
- **Responsable**: Santiago Cano
- **Estado**: Completada (Estructura actual)

### HU-13: Como administrador, quiero seguridad en el acceso a datos.
- **Criterios de Aceptación**:
  - No almacenar contraseñas en texto plano.
  - Acceso restringido localmente.
  - Autenticación en admin.
- **Responsable**: Juan Felipe Ruiz
- **Estado**: Completada (Django auth)

### HU-14: Como usuario, quiero funcionamiento offline.
- **Criterios de Aceptación**:
  - Funcionar sin conexión a internet (local).
- **Responsable**: Sebastián Buitrago
- **Estado**: Completada (Aplicación local con Docker)

### HU-15: Como proyecto, quiero licencia abierta MIT.
- **Criterios de Aceptación**:
  - Disponible bajo MIT para uso libre con atribución.
- **Responsable**: Luis Carlos Guerra
- **Estado**: Pendiente (Agregar licencia al repo)

## Reglas de Negocio

Las reglas de negocio RN01-RN10 se integran como criterios de aceptación en las HU correspondientes, especialmente en HU-02, HU-03, HU-04, HU-05.

- **RN01-RN03**: Integradas en HU-02 y HU-03 (cálculos de día, hora, recargos).
- **RN04-RN07**: Integradas en HU-02 y HU-05 (auxilio, deducciones, FSP, préstamos).
- **RN08-RN10**: Integradas en HU-02, HU-06, HU-07 (redondeo, reportes, salario neto).

## Notas Generales
- Backend completado con API REST, cálculos automáticos, validaciones.
- Frontend pendiente: interfaz web, reportes, autenticación frontend.
- Base de datos PostgreSQL en Neon Tech. (para desarrollo local)
- Documentación API en /swagger/ y /redoc/.
- Asignación de responsables basada en contribuciones actuales.
