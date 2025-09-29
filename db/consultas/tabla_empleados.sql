-- Crear tabla empleados basada en el modelo Django Empleado
CREATE TABLE IF NOT EXISTS empleados (
    cedula VARCHAR(11) PRIMARY KEY,
    nombres VARCHAR(25) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
    correo VARCHAR(254),  -- EmailField default max_length
    telefono VARCHAR(15),
    salario_base FLOAT NOT NULL,
    cargo BIGINT NOT NULL,
    FOREIGN KEY (cargo) REFERENCES cargos(id)
);
