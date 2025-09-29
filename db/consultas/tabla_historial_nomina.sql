-- Crear tabla historial_nomina basada en el modelo Django HistorialNomina
CREATE TABLE IF NOT EXISTS historial_nomina (
    id BIGSERIAL PRIMARY KEY,
    cedula VARCHAR(11) NOT NULL,
    fecha_calculo TIMESTAMP NOT NULL,
    salario_bruto FLOAT NOT NULL,
    deducciones FLOAT NOT NULL,
    impuestos FLOAT NOT NULL,
    auxilio_transporte FLOAT NOT NULL,
    neto FLOAT NOT NULL
);
