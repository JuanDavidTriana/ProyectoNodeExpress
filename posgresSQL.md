-- Crear tabla de clientes
CREATE TABLE cliente(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL, -- nombre del cliente
    email VARCHAR(100) NOT NULL UNIQUE, -- email del cliente
    telefono VARCHAR(20) NOT NULL -- telefono del cliente
);

-- Insertar registros iniciales
INSERT INTO cliente (nombre,email, telefono) VALUES 
('Ana Maria', 'Ana@gmail.com','3100000001'),
('Pedro Perez', 'Pedro@gmail.com','3000000002'),
('Luisa Lopez', 'Luisa@gmail.com','3200000003'),
('Sara Sanchez', 'Sara@gmail.com','3010000004'),
('Juan Carlos', 'JuanCarlos@gmail.com','3100000005'),
('Martha Gomez', 'Martha@gmail.com','3200000006'),
('Fernando Rodriguez', 'Fernando@gmail.com','3000000007'),
('Cristina Sanchez', 'Cristina@gmail.com','3010000008'),
('Rafael Lopez', 'Rafael@gmail.com','3100000009'),
('Sofia Gomez', 'Sofia@gmail.com','3200000010');

-- Consultar todos los clientes
SELECT * FROM cliente;

-- Consultar clientes que contengan el nombre 'Juan'
SELECT * FROM cliente WHERE nombre LIKE '%Juan%';

-- Consultar clientes con id par
SELECT * FROM cliente WHERE id % 2 = 0;

-- Actualizar o Modificar un registro
UPDATE cliente SET telefono='3011111111' WHERE id = 5;

-- Actualizar multiples columnas
UPDATE CLIENTE
SET EMAIL = 'Sanchez@gmail.com', TELEFONO = '301111222' WHERE ID = 5

-- Eliminar registros
DELETE FROM cliente WHERE id % 2 = 0;
DELETE FROM cliente WHERE nombre = 'Juan David'
    
