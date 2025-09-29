-- Crear tabla cargos basada en el modelo Django Cargo
CREATE TABLE IF NOT EXISTS cargos (
    id BIGSERIAL PRIMARY KEY,
    cargo_empleado VARCHAR(255) UNIQUE NOT NULL,
    bonificacion FLOAT DEFAULT 0.0
);
