-- Crear tabla tipos_horas_extra basada en el modelo Django TipoHoraExtra
CREATE TABLE IF NOT EXISTS tipos_horas_extra (
    tipo_hora_id VARCHAR(20) PRIMARY KEY,
    nombre_tipo_hora VARCHAR(50) NOT NULL
);
