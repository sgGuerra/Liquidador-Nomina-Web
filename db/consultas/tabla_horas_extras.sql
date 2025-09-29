-- Crear tabla horas_extras basada en el modelo Django HoraExtra
CREATE TABLE IF NOT EXISTS horas_extras (
    id_hora_extra BIGSERIAL PRIMARY KEY,
    id_empleado VARCHAR(11) NOT NULL,
    id_tipo_hora VARCHAR(20) NOT NULL,
    numero_de_horas INTEGER NOT NULL,
    fecha_registro DATE NOT NULL,
    FOREIGN KEY (id_empleado) REFERENCES empleados(cedula),
    FOREIGN KEY (id_tipo_hora) REFERENCES tipos_horas_extra(tipo_hora_id)
);
