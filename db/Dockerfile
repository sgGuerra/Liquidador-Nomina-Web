FROM postgres:17-trixie

ENV POSTGRES_DB=liquidador_nomina
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Copiar los archivos SQL en el orden correcto para respetar dependencias de claves foráneas
COPY consultas/tabla_cargos.sql /docker-entrypoint-initdb.d/01_tabla_cargos.sql
COPY consultas/tabla_tipos_horas_extra.sql /docker-entrypoint-initdb.d/02_tabla_tipos_horas_extra.sql
COPY consultas/tabla_empleados.sql /docker-entrypoint-initdb.d/03_tabla_empleados.sql
COPY consultas/tabla_horas_extras.sql /docker-entrypoint-initdb.d/04_tabla_horas_extras.sql
COPY consultas/tabla_prestamos.sql /docker-entrypoint-initdb.d/05_tabla_prestamos.sql
COPY consultas/tabla_historial_nomina.sql /docker-entrypoint-initdb.d/06_tabla_historial_nomina.sql

# Copiar los archivos de inserción de datos después de crear las tablas
COPY consultas/insertar_cargos.sql /docker-entrypoint-initdb.d/07_insertar_cargos.sql
COPY consultas/insertar_tipo_de_horas_extra.sql /docker-entrypoint-initdb.d/08_insertar_tipo_de_horas_extra.sql
