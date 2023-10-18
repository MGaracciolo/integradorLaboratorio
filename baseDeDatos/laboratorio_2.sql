-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2023 a las 00:54:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laboratorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id_departamento` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id_departamento`, `descripcion`) VALUES
(1, 'Recepcion'),
(2, 'Tecnica'),
(3, 'Bioquimica'),
(4, 'Servicio Tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `determinacion`
--

CREATE TABLE `determinacion` (
  `id_determinacion` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `unidad_medida` int(11) NOT NULL COMMENT 'id_parametro',
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `id_referencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `determinacion`
--

INSERT INTO `determinacion` (`id_determinacion`, `nombre`, `unidad_medida`, `estado`, `id_referencia`) VALUES
(1, 'Hemoglobina', 0, 0, 1),
(2, 'Hemoglobina', 0, 0, 3),
(3, 'Hematocrito', 0, 0, 2),
(4, 'Hematocrito', 0, 0, 4),
(5, 'glóbulos blancos', 0, 0, 1),
(6, 'plaquetas', 0, 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `id_direccion` int(11) NOT NULL,
  `calle` varchar(25) NOT NULL,
  `numero` int(11) NOT NULL,
  `piso` int(11) DEFAULT NULL,
  `departamento` varchar(10) DEFAULT NULL,
  `ciudad` varchar(25) NOT NULL,
  `provincia` varchar(25) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`id_direccion`, `calle`, `numero`, `piso`, `departamento`, `ciudad`, `provincia`, `estado`) VALUES
(1, 'San Martin', 4330, 4, 'A', 'Mar del Plata', 'Buenos Aires', 1),
(2, '25 de Mayo', 1868, NULL, '3', 'San Luis', 'San Luis', 1),
(3, 'Buenos Aires', 1771, 1, '6', 'San Luis', 'San Luis', 1),
(4, 'Modulo 9 Manzana 13', 13, NULL, NULL, 'La Punta', 'San Luis', 1),
(5, 'Chacabuco', 935, NULL, NULL, 'Godoy Cruz', 'Mendoza', 1),
(6, 'Chacabuco', 3562, NULL, '4', 'Mar del Plata', 'Buenos Aires', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `nombre_empleado` varchar(25) NOT NULL,
  `apellido_empleado` varchar(25) NOT NULL,
  `id_departamento` int(11) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `nombre_empleado`, `apellido_empleado`, `id_departamento`, `id_user`) VALUES
(1, 'Mario', 'Perez', 2, 1),
(2, 'Profe', 'Pedro', 4, 1),
(3, 'Profe', 'Jorge', 4, 1),
(4, 'Marianela', 'Garacciolo', 1, 1),
(5, 'Juan', 'Perez', 1, 1),
(6, 'Maria', 'Perez', 2, 1),
(7, 'Micaela', 'Perez', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `id_examen` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examen`
--

INSERT INTO `examen` (`id_examen`, `id_tipo`, `id_orden`, `id_empleado`) VALUES
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestra`
--

CREATE TABLE `muestra` (
  `id_muestra` int(11) NOT NULL,
  `fecha_recoleccion` date NOT NULL,
  `hora_recoleccion` time NOT NULL,
  `tipo_muestra` varchar(25) NOT NULL COMMENT 'id_parametro',
  `precedencia` int(11) NOT NULL COMMENT 'id_parametro',
  `id_orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `muestra`
--

INSERT INTO `muestra` (`id_muestra`, `fecha_recoleccion`, `hora_recoleccion`, `tipo_muestra`, `precedencia`, `id_orden`) VALUES
(1, '2023-10-01', '14:03:00', 'Sangre', 12, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `id_orden` int(11) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `diagnostico` varchar(40) DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `doctor` varchar(40) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'id_parametro',
  `observacion` varchar(250) DEFAULT NULL,
  `id_paciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden`
--

INSERT INTO `orden` (`id_orden`, `fecha_ingreso`, `diagnostico`, `fecha_entrega`, `doctor`, `estado`, `observacion`, `id_paciente`) VALUES
(1, '2023-10-01', 'Control', '2023-10-05', 'Rocio Saileg', 1, NULL, 1),
(2, '2023-10-01', 'Diabetes', '2023-10-06', 'Daniel Rios', 1, NULL, 2),
(3, '2023-10-02', 'Control', '2023-10-05', 'Roberto Vera', 1, NULL, 3),
(4, '2023-10-02', 'Infeccion Urinaria', '2023-10-10', 'Sergio Herrera', 1, NULL, 4),
(5, '2023-10-04', 'Pre-quirurgico', '2023-10-09', 'Nelson Algarbe', 1, NULL, 5),
(6, '2023-10-04', 'Test Voluntario', '2023-10-08', 'Ariel Estrada', 1, NULL, 6),
(7, '2023-10-05', 'Grupo Sanguineo', '2023-10-06', 'Juana Diaz', 1, NULL, 7),
(8, '2023-10-08', 'control', '2023-10-15', 'Luz Barrera', 1, NULL, 8),
(9, '2023-10-10', 'control', '2023-10-16', 'Rocio Saileg', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `sexo` int(11) NOT NULL COMMENT 'id_parametro',
  `fecha_nacimiento` date NOT NULL,
  `obra_social` varchar(25) DEFAULT NULL,
  `numero_afiliado` int(11) DEFAULT NULL,
  `telefono` bigint(11) NOT NULL,
  `id_direccion` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `dni`, `nombre`, `apellido`, `sexo`, `fecha_nacimiento`, `obra_social`, `numero_afiliado`, `telefono`, `id_direccion`, `id_user`) VALUES
(1, 22223033, 'Maria', 'Rinaldis', 2, '1949-10-29', 'Swiss Medical', 222222, 223112212, 1, 1),
(2, 19000021, 'Nela', 'Garacciolo', 2, '1998-02-17', 'Medife', 40730583, 2236699496, 2, 1),
(3, 36660000, 'Nelo', 'Posse', 3, '1996-04-17', 'Dosep', 4366600, 117794623, 3, 1),
(4, 19000021, 'Micaela', 'Ferreyra', 2, '1997-07-31', 'Osde', 1900, 226445941, 4, 1),
(5, 44000444, 'Mia', 'Funes', 2, '2014-01-14', 'Osde', 440000, 0, 4, 1),
(6, 39366633, 'Carina', 'Aloi', 2, '1965-01-19', 'Osde', 1900, 3331992, 5, 1),
(7, 94949494, 'Luis', 'Garacciolo', 1, '1997-01-22', 'Andes', 407, 966663332, 5, 1),
(8, 32132132, 'Wilson', 'Ortiz', 1, '1994-01-01', 'Medisalud', 231, 2235656565, 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro`
--

CREATE TABLE `parametro` (
  `id_parametro` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `valor` varchar(25) NOT NULL,
  `descripcion` varchar(20) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `observacion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `parametro`
--

INSERT INTO `parametro` (`id_parametro`, `nombre`, `valor`, `descripcion`, `estado`, `observacion`) VALUES
(1, 'Sexo', 'M', 'Masculino', 1, NULL),
(2, 'Sexo', 'F', 'Femenino', 1, NULL),
(3, 'Sexo', 'X', 'No binario', 1, NULL),
(6, 'Estado', 'Esperando toma de muestra', 'Estado orden', 1, 'Falta tomar una muestra'),
(7, 'Estado', 'Analitica', 'Estado orden', 1, 'Las muestras son recibidas y analizadas'),
(8, 'Estado', 'Pre Informe', 'Estado orden', 1, 'El tecnico registra los valores'),
(9, 'Estado', 'Para Validar', 'Estado orden', 1, 'El bioquimico recibe los valores para validar'),
(10, 'Estado', 'Informada', 'Estado orden', 1, 'El bioquimico ya validó los resultados'),
(11, 'Precedencia', 'Local', NULL, 1, NULL),
(12, 'Precedencia', 'Externa', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `referencia`
--

CREATE TABLE `referencia` (
  `id_referencia` int(11) NOT NULL,
  `edad_max` int(11) NOT NULL,
  `edad_min` int(11) NOT NULL,
  `sexo` int(11) NOT NULL COMMENT 'id_parametro',
  `minimo` float NOT NULL,
  `maximo` float NOT NULL,
  `patologia` varchar(40) DEFAULT NULL,
  `observacion` varchar(250) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `referencia`
--

INSERT INTO `referencia` (`id_referencia`, `edad_max`, `edad_min`, `sexo`, `minimo`, `maximo`, `patologia`, `observacion`, `estado`) VALUES
(1, 50, 18, 1, 500, 1500, NULL, NULL, 1),
(2, 50, 18, 1, 10, 100, NULL, NULL, 1),
(3, 50, 18, 2, 500, 1500, NULL, NULL, 1),
(4, 50, 18, 2, 10, 150, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_examen`
--

CREATE TABLE `tipo_examen` (
  `id_tipo` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_examen`
--

INSERT INTO `tipo_examen` (`id_tipo`, `descripcion`) VALUES
(1, 'Hemograma'),
(2, 'ADN'),
(3, 'Determinacion VIH'),
(4, 'Coagulacion'),
(5, 'Monitoreo de Drogas de Abuso'),
(6, 'Citometría de Flujo'),
(7, 'Fibrosis Quística'),
(8, 'Estudio de Proteínas'),
(9, 'Sedimento Urinario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `usuario` varchar(25) NOT NULL,
  `clave` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `usuario`, `clave`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor`
--

CREATE TABLE `valor` (
  `id_examen` int(11) NOT NULL,
  `id_determinacion` int(11) NOT NULL,
  `cifra` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valor`
--

INSERT INTO `valor` (`id_examen`, `id_determinacion`, `cifra`) VALUES
(1, 1, 715);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id_departamento`);

--
-- Indices de la tabla `determinacion`
--
ALTER TABLE `determinacion`
  ADD PRIMARY KEY (`id_determinacion`),
  ADD KEY `id_referencia` (`id_referencia`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`id_direccion`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_departamento` (`id_departamento`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`id_examen`),
  ADD KEY `id_tipo` (`id_tipo`,`id_orden`,`id_empleado`),
  ADD KEY `id_empleado` (`id_empleado`),
  ADD KEY `id_orden` (`id_orden`);

--
-- Indices de la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD PRIMARY KEY (`id_muestra`),
  ADD KEY `id_orden` (`id_orden`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `id_direccion` (`id_direccion`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `parametro`
--
ALTER TABLE `parametro`
  ADD PRIMARY KEY (`id_parametro`);

--
-- Indices de la tabla `referencia`
--
ALTER TABLE `referencia`
  ADD PRIMARY KEY (`id_referencia`);

--
-- Indices de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `valor`
--
ALTER TABLE `valor`
  ADD KEY `id_examen` (`id_examen`,`id_determinacion`),
  ADD KEY `id_determinacion` (`id_determinacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `determinacion`
--
ALTER TABLE `determinacion`
  MODIFY `id_determinacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `examen`
--
ALTER TABLE `examen`
  MODIFY `id_examen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `muestra`
--
ALTER TABLE `muestra`
  MODIFY `id_muestra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `parametro`
--
ALTER TABLE `parametro`
  MODIFY `id_parametro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `referencia`
--
ALTER TABLE `referencia`
  MODIFY `id_referencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `determinacion`
--
ALTER TABLE `determinacion`
  ADD CONSTRAINT `determinacion_ibfk_1` FOREIGN KEY (`id_referencia`) REFERENCES `referencia` (`id_referencia`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE,
  ADD CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `examen_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON UPDATE CASCADE,
  ADD CONSTRAINT `examen_ibfk_2` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`) ON UPDATE CASCADE,
  ADD CONSTRAINT `examen_ibfk_3` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_examen` (`id_tipo`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD CONSTRAINT `muestra_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_ibfk_2` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `valor`
--
ALTER TABLE `valor`
  ADD CONSTRAINT `valor_ibfk_1` FOREIGN KEY (`id_determinacion`) REFERENCES `determinacion` (`id_determinacion`) ON UPDATE CASCADE,
  ADD CONSTRAINT `valor_ibfk_2` FOREIGN KEY (`id_examen`) REFERENCES `examen` (`id_examen`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
