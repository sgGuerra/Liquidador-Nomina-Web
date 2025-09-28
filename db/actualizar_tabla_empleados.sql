-- Agregar columnas adicionales para empleados
ALTER TABLE empleados
ADD COLUMN IF NOT EXISTS correo varchar(50),
ADD COLUMN IF NOT EXISTS telefono varchar(15);
