-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.1.72-community - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para test-db
CREATE DATABASE IF NOT EXISTS `test-db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test-db`;

-- Volcando estructura para tabla test-db.poligonos
CREATE TABLE IF NOT EXISTS `poligonos` (
  `id_poligono` int(11) NOT NULL AUTO_INCREMENT,
  `name_poligono` varchar(50) DEFAULT NULL,
  `info_poligono` varchar(50) DEFAULT NULL,
  `hora_poligono` varchar(50) DEFAULT NULL,
  `coordinates` text,
  `id_estado` int(11) NOT NULL DEFAULT '1',
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_poligono`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla test-db.poligonos: 2 rows
/*!40000 ALTER TABLE `poligonos` DISABLE KEYS */;
INSERT INTO `poligonos` (`id_poligono`, `name_poligono`, `info_poligono`, `hora_poligono`, `coordinates`, `id_estado`, `url`) VALUES
	(3, 'SAGO NORTE', 'SAGO RRHH', '10:00 AM - 05:00 PM', '{\r\n    "type": "FeatureCollection",\r\n    "features": [\r\n        {\r\n            "type": "Feature",\r\n            "properties": {},\r\n            "geometry": {\r\n                "coordinates": [\r\n                    [\r\n                        [\r\n                            -73.10971285659441,\r\n                            -40.57338270430579\r\n                        ],\r\n                        [\r\n                            -73.10947254093477,\r\n                            -40.57400886604943\r\n                        ],\r\n                        [\r\n                            -73.10945100110143,\r\n                            -40.57402849916776\r\n                        ],\r\n                        [\r\n                            -73.1094208453346,\r\n                            -40.574032862082674\r\n                        ],\r\n                        [\r\n                            -73.10890819730285,\r\n                            -40.57392160767608\r\n                        ],\r\n                        [\r\n                            -73.10924805293443,\r\n                            -40.57301869853525\r\n                        ],\r\n                        [\r\n                            -73.10936149605656,\r\n                            -40.57326520647576\r\n                        ],\r\n                        [\r\n                            -73.10969320948878,\r\n                            -40.573339376828706\r\n                        ],\r\n                        [\r\n                            -73.10971618531116,\r\n                            -40.573357919403264\r\n                        ],\r\n                        [\r\n                            -73.10971285659441,\r\n                            -40.57338270430579\r\n                        ]\r\n                    ]\r\n                ],\r\n                "type": "Polygon"\r\n            }\r\n        }\r\n    ]\r\n}', 1, NULL),
	(4, 'SAGO SUR', 'SAGO COPETE', '11:00 PM - 5:00 AM', '{\r\n    "type": "FeatureCollection",\r\n    "features": [\r\n        {\r\n            "type": "Feature",\r\n            "properties": {},\r\n            "geometry": {\r\n                "coordinates": [\r\n                    [\r\n                        [\r\n                            -73.10971285659441,\r\n                            -40.57338270430579\r\n                        ],\r\n                        [\r\n                            -73.10947254093477,\r\n                            -40.57400886604943\r\n                        ],\r\n                        [\r\n                            -73.10945100110143,\r\n                            -40.57402849916776\r\n                        ],\r\n                        [\r\n                            -73.1094208453346,\r\n                            -40.574032862082674\r\n                        ],\r\n                        [\r\n                            -73.10890819730285,\r\n                            -40.57392160767608\r\n                        ],\r\n                        [\r\n                            -73.10924805293443,\r\n                            -40.57301869853525\r\n                        ],\r\n                        [\r\n                            -73.10936149605656,\r\n                            -40.57326520647576\r\n                        ],\r\n                        [\r\n                            -73.10969320948878,\r\n                            -40.573339376828706\r\n                        ],\r\n                        [\r\n                            -73.10971618531116,\r\n                            -40.573357919403264\r\n                        ],\r\n                        [\r\n                            -73.10971285659441,\r\n                            -40.57338270430579\r\n                        ]\r\n                    ]\r\n                ],\r\n                "type": "Polygon"\r\n            },\r\n            "id": 0\r\n        },\r\n        {\r\n            "type": "Feature",\r\n            "properties": {},\r\n            "geometry": {\r\n                "coordinates": [\r\n                    [\r\n                        [\r\n                            -73.10888086074463,\r\n                            -40.57391751263306\r\n                        ],\r\n                        [\r\n                            -73.10866694923774,\r\n                            -40.57386822086124\r\n                        ],\r\n                        [\r\n                            -73.10902732335877,\r\n                            -40.572969764879986\r\n                        ],\r\n                        [\r\n                            -73.10903955967137,\r\n                            -40.572977419121706\r\n                        ],\r\n                        [\r\n                            -73.10922022522577,\r\n                            -40.57301897070293\r\n                        ],\r\n                        [\r\n                            -73.10888086074463,\r\n                            -40.57391751263306\r\n                        ]\r\n                    ]\r\n                ],\r\n                "type": "Polygon"\r\n            }\r\n        },\r\n        {\r\n            "type": "Feature",\r\n            "properties": {},\r\n            "geometry": {\r\n                "coordinates": [\r\n                    [\r\n                        [\r\n                            -73.1090471310986,\r\n                            -40.572804944738266\r\n                        ],\r\n                        [\r\n                            -73.10900329141222,\r\n                            -40.57292630373005\r\n                        ],\r\n                        [\r\n                            -73.10900718827315,\r\n                            -40.5729477635285\r\n                        ],\r\n                        [\r\n                            -73.10864056333892,\r\n                            -40.573860475253525\r\n                        ],\r\n                        [\r\n                            -73.10858405885448,\r\n                            -40.57384271566314\r\n                        ],\r\n                        [\r\n                            -73.10793507304136,\r\n                            -40.57363076694068\r\n                        ],\r\n                        [\r\n                            -73.10790352288421,\r\n                            -40.573378596602744\r\n                        ],\r\n                        [\r\n                            -73.10812243142385,\r\n                            -40.57298036529591\r\n                        ],\r\n                        [\r\n                            -73.10840443660385,\r\n                            -40.572236273753276\r\n                        ],\r\n                        [\r\n                            -73.10843728866213,\r\n                            -40.57219648225788\r\n                        ],\r\n                        [\r\n                            -73.10849411384315,\r\n                            -40.5721681560927\r\n                        ],\r\n                        [\r\n                            -73.10871710158446,\r\n                            -40.57209813694726\r\n                        ],\r\n                        [\r\n                            -73.10916763849832,\r\n                            -40.571959986650874\r\n                        ],\r\n                        [\r\n                            -73.10922749854058,\r\n                            -40.57209314594135\r\n                        ],\r\n                        [\r\n                            -73.1093818555404,\r\n                            -40.57246298532416\r\n                        ],\r\n                        [\r\n                            -73.10937343675317,\r\n                            -40.572496013489115\r\n                        ],\r\n                        [\r\n                            -73.10934270568055,\r\n                            -40.57253054140025\r\n                        ],\r\n                        [\r\n                            -73.10906398095717,\r\n                            -40.57265272412054\r\n                        ],\r\n                        [\r\n                            -73.10903645103636,\r\n                            -40.57266536804246\r\n                        ],\r\n                        [\r\n                            -73.10909535225926,\r\n                            -40.57277041038086\r\n                        ],\r\n                        [\r\n                            -73.1090471310986,\r\n                            -40.572804944738266\r\n                        ]\r\n                    ]\r\n                ],\r\n                "type": "Polygon"\r\n            }\r\n        }\r\n    ]\r\n}', 1, NULL);
/*!40000 ALTER TABLE `poligonos` ENABLE KEYS */;

-- Volcando estructura para tabla test-db.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `rut` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla test-db.usuarios: 5 rows
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id_usuario`, `rut`, `password`) VALUES
	(1, '12345678-9', 'password123'),
	(2, '98765432-1', 'mypassword'),
	(3, '11223344-5', 'secretpass'),
	(4, '55667788-2', 'anotherpass'),
	(5, '1', '1');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
