-- Crear tabla prestamos basada en el modelo Django Prestamo
CREATE TABLE IF NOT EXISTS prestamos (
    id_prestamo BIGSERIAL PRIMARY KEY,
    id_empleado VARCHAR(11) NOT NULL,
    monto FLOAT NOT NULL,
    numero_de_cuotas INTEGER NOT NULL,
    tasa_interes FLOAT NOT NULL,
    fecha_inicio DATE NOT NULL,
    cuota_mensual FLOAT,
    saldo_restante FLOAT,
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    FOREIGN KEY (id_empleado) REFERENCES empleados(cedula)
);
