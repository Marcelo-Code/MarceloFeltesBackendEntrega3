import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import mongoose from "mongoose";
import { productModel } from "../models/product.model.js";

const uriMongo = process.env.URI_MONGO;

const products = [
  {
    title: "Smartphone Samsung Galaxy S23",
    description: "Teléfono inteligente con pantalla AMOLED y cámara de 50MP",
    price: 899.99,
    category: "Telefonía",
    stock: 15,
  },
  {
    title: "Laptop ASUS ROG Strix G15",
    description: "Portátil gamer con procesador Ryzen 7 y GPU RTX 3060",
    price: 1499.99,
    category: "Computación",
    stock: 8,
  },
  {
    title: "Monitor LG UltraGear 27''",
    description: "Monitor gamer 144Hz con 1ms de respuesta y panel IPS",
    price: 299.99,
    category: "Periféricos",
    stock: 12,
  },
  {
    title: "Teclado Mecánico HyperX Alloy",
    description:
      "Teclado mecánico RGB con switches rojos y estructura de aluminio",
    price: 129.99,
    category: "Periféricos",
    stock: 20,
  },
  {
    title: "Mouse Logitech G502 HERO",
    description: "Mouse gamer con sensor HERO 25K y peso ajustable",
    price: 79.99,
    category: "Periféricos",
    stock: 25,
  },
  {
    title: "Auriculares Sony WH-1000XM5",
    description:
      "Auriculares inalámbricos con cancelación de ruido y 30h de batería",
    price: 349.99,
    category: "Audio",
    stock: 10,
  },
  {
    title: "Tablet Apple iPad Air",
    description:
      "Pantalla Retina de 10.9'', chip M1 y compatibilidad con Apple Pencil",
    price: 599.99,
    category: "Tablets",
    stock: 18,
  },
  {
    title: "Disco Duro Externo Seagate 2TB",
    description: "Almacenamiento portátil USB 3.0 para respaldos rápidos",
    price: 89.99,
    category: "Almacenamiento",
    stock: 30,
  },
  {
    title: "Tarjeta Gráfica NVIDIA RTX 4070",
    description: "GPU con 12GB GDDR6X y soporte para Ray Tracing",
    price: 799.99,
    category: "Componentes",
    stock: 5,
  },
  {
    title: "Procesador Intel Core i7-13700K",
    description: "Procesador de 16 núcleos y 24 hilos para alto rendimiento",
    price: 419.99,
    category: "Componentes",
    stock: 7,
  },
  {
    title: "Memoria RAM Corsair Vengeance 32GB",
    description: "DDR5 6000MHz para rendimiento extremo",
    price: 179.99,
    category: "Componentes",
    stock: 20,
  },
  {
    title: "Placa Madre ASUS ROG Strix Z790",
    description: "Compatible con Intel 13th Gen, DDR5 y PCIe 5.0",
    price: 399.99,
    category: "Componentes",
    stock: 10,
  },
  {
    title: "Fuente de Poder EVGA 750W 80+ Gold",
    description: "Fuente modular con certificación de eficiencia",
    price: 129.99,
    category: "Energía",
    stock: 15,
  },
  {
    title: "Gabinete NZXT H510",
    description: "Chasis minimalista con ventana de vidrio templado",
    price: 99.99,
    category: "Componentes",
    stock: 18,
  },
  {
    title: "Router TP-Link AX3000",
    description: "WiFi 6 de alta velocidad con MU-MIMO y OFDMA",
    price: 149.99,
    category: "Redes",
    stock: 22,
  },
  {
    title: "Smartwatch Apple Watch Series 8",
    description: "Reloj inteligente con sensor de temperatura",
    price: 499.99,
    category: "Wearables",
    stock: 12,
  },
  {
    title: "Cámara GoPro HERO11 Black",
    description: "Cámara de acción 5.3K con estabilización HyperSmooth",
    price: 399.99,
    category: "Fotografía",
    stock: 14,
  },
  {
    title: "Consola PlayStation 5",
    description: "Consola de nueva generación con SSD ultrarrápido",
    price: 499.99,
    category: "Videojuegos",
    stock: 6,
  },
  {
    title: "Impresora HP LaserJet Pro",
    description: "Impresora láser monocromática rápida",
    price: 199.99,
    category: "Impresión",
    stock: 12,
  },
  {
    title: "Dron DJI Mini 3 Pro",
    description: "Dron compacto con cámara 4K",
    price: 799.99,
    category: "Drones",
    stock: 5,
  },
  {
    title: "Kit Arduino Uno",
    description: "Kit de desarrollo para electrónica y robótica",
    price: 69.99,
    category: "Electrónica",
    stock: 25,
  },
  {
    title: "Osciloscopio Rigol DS1054Z",
    description: "Osciloscopio digital de 50 MHz",
    price: 349.99,
    category: "Instrumentación",
    stock: 5,
  },
  {
    title: "Multímetro Fluke 117",
    description: "Multímetro digital de alta precisión",
    price: 149.99,
    category: "Instrumentación",
    stock: 10,
  },
  {
    title: "Fuente de alimentación regulable Korad 3005D",
    description: "Fuente de laboratorio de 30V y 5A",
    price: 99.99,
    category: "Instrumentación",
    stock: 8,
  },
  {
    title: "Raspberry Pi 4",
    description: "Minicomputadora con 4GB de RAM",
    price: 89.99,
    category: "Computación",
    stock: 12,
  },
  {
    title: "Cámara térmica FLIR ONE Pro",
    description: "Cámara de detección térmica para smartphones",
    price: 349.99,
    category: "Instrumentación",
    stock: 4,
  },
  {
    title: "Repetidor WiFi TP-Link AC1200",
    description: "Extensor de señal con doble banda",
    price: 49.99,
    category: "Redes",
    stock: 18,
  },
  {
    title: "Tarjeta de captura Elgato HD60 X",
    description: "Captura video en 4K para streaming",
    price: 199.99,
    category: "Streaming",
    stock: 6,
  },
  {
    title: "Proyector Xiaomi Mi Smart Projector 2",
    description: "Proyector Full HD con Android TV",
    price: 499.99,
    category: "Proyección",
    stock: 7,
  },
  {
    title: "UPS APC Back-UPS Pro 1500VA",
    description: "Sistema de respaldo de energía",
    price: 249.99,
    category: "Energía",
    stock: 10,
  },
  {
    title: "Sensor de temperatura DHT22",
    description: "Sensor de temperatura y humedad digital",
    price: 12.99,
    category: "Sensores",
    stock: 50,
  },
  {
    title: "Kit de sensores para Arduino",
    description: "Módulos de sensores variados",
    price: 59.99,
    category: "Sensores",
    stock: 20,
  },
  {
    title: "Micrófono Shure SM7B",
    description: "Micrófono dinámico profesional",
    price: 399.99,
    category: "Audio",
    stock: 8,
  },
  {
    title: "Cerradura inteligente Yale",
    description: "Cerradura digital con control remoto",
    price: 229.99,
    category: "Domótica",
    stock: 5,
  },
  {
    title: "Mini PC Intel NUC 11",
    description: "Mini PC compacto con Core i7",
    price: 699.99,
    category: "Computación",
    stock: 9,
  },
  {
    title: "Controlador MIDI Akai MPK Mini",
    description: "Teclado controlador de 25 teclas con pads retroiluminados",
    price: 129.99,
    category: "Audio",
    stock: 12,
  },
  {
    title: "Cámara de seguridad TP-Link Tapo C200",
    description:
      "Cámara de vigilancia con detección de movimiento y visión nocturna",
    price: 49.99,
    category: "Seguridad",
    stock: 20,
  },
  {
    title: "Termostato inteligente Nest",
    description: "Controlador de temperatura programable con WiFi",
    price: 199.99,
    category: "Domótica",
    stock: 10,
  },
  {
    title: "Disco SSD NVMe Samsung 980 Pro 1TB",
    description:
      "Unidad de estado sólido con velocidad de lectura de 7000 MB/s",
    price: 149.99,
    category: "Almacenamiento",
    stock: 18,
  },
  {
    title: "Switch de red Netgear 8 Puertos",
    description: "Switch Gigabit con administración avanzada",
    price: 89.99,
    category: "Redes",
    stock: 15,
  },
  {
    title: "Batería portátil Anker 20,000mAh",
    description: "Power bank de carga rápida con USB-C y Power Delivery",
    price: 49.99,
    category: "Energía",
    stock: 30,
  },
  {
    title: "Antena WiFi Alfa Network AWUS036ACH",
    description: "Antena de alta potencia para redes inalámbricas",
    price: 59.99,
    category: "Redes",
    stock: 14,
  },
  {
    title: "Placa de sonido Focusrite Scarlett 2i2",
    description: "Interfaz de audio USB de alta fidelidad",
    price: 169.99,
    category: "Audio",
    stock: 8,
  },
  {
    title: "Cinta LED RGB Philips Hue",
    description: "Tira LED inteligente con control por app",
    price: 99.99,
    category: "Iluminación",
    stock: 25,
  },
  {
    title: "Control remoto universal Logitech Harmony",
    description: "Control programable para múltiples dispositivos",
    price: 129.99,
    category: "Domótica",
    stock: 10,
  },
  {
    title: "Gafas de Realidad Virtual Meta Quest 2",
    description: "Casco VR con pantalla 120Hz y 128GB de almacenamiento",
    price: 399.99,
    category: "Realidad Virtual",
    stock: 6,
  },
  {
    title: "Tarjeta de sonido Creative Sound BlasterX G6",
    description: "DAC y amplificador para audio de alta resolución",
    price: 149.99,
    category: "Audio",
    stock: 12,
  },
  {
    title: "Estación de carga inalámbrica Belkin",
    description: "Cargador inalámbrico 3 en 1 para móviles y smartwatch",
    price: 79.99,
    category: "Energía",
    stock: 18,
  },
  {
    title: "Módulo Bluetooth HC-05",
    description: "Módulo de comunicación inalámbrica para proyectos Arduino",
    price: 9.99,
    category: "Electrónica",
    stock: 50,
  },
  {
    title: "Sensor de proximidad infrarrojo E18-D80NK",
    description: "Sensor óptico para detección de objetos",
    price: 14.99,
    category: "Sensores",
    stock: 40,
  },
  {
    title: "Auriculares Bose QuietComfort 45",
    description: "Auriculares inalámbricos con cancelación activa de ruido",
    price: 329.99,
    category: "Audio",
    stock: 7,
  },
  {
    title: "Teclado Logitech G915 TKL",
    description: "Teclado mecánico con switches GX y RGB",
    price: 229.99,
    category: "Periféricos",
    stock: 5,
  },
  {
    title: "Monitor Dell U2720Q",
    description: "Monitor 4K de 27'' con panel IPS y USB-C",
    price: 499.99,
    category: "Periféricos",
    stock: 6,
  },
  {
    title: "Cámara de seguridad Arlo Pro 4",
    description: "Cámara de seguridad exterior inalámbrica 4K",
    price: 219.99,
    category: "Seguridad",
    stock: 8,
  },
  {
    title: "Smartphone iPhone 14 Pro",
    description: "Smartphone con pantalla OLED y cámaras de 48MP",
    price: 1099.99,
    category: "Telefonía",
    stock: 4,
  },
  {
    title: "Laptop MacBook Pro M1 Pro 16''",
    description: "Portátil profesional con chip M1 Pro y pantalla Retina",
    price: 2399.99,
    category: "Computación",
    stock: 3,
  },
  {
    title: "Cámara Sony Alpha 7C",
    description: "Cámara sin espejo con sensor full-frame",
    price: 1799.99,
    category: "Fotografía",
    stock: 5,
  },
  {
    title: "Proyector Epson Home Cinema 3800",
    description: "Proyector 4K con soporte para HDR y 2400 lúmenes",
    price: 1299.99,
    category: "Proyección",
    stock: 4,
  },
  {
    title: "Estación meteorológica Netatmo",
    description:
      "Estación meteorológica conectada con monitorización en tiempo real",
    price: 179.99,
    category: "Sensores",
    stock: 10,
  },
  {
    title: "Router Netgear Nighthawk AX12",
    description: "Router WiFi 6 de alto rendimiento con 12 antenas",
    price: 399.99,
    category: "Redes",
    stock: 6,
  },
  {
    title: "SSD Kingston A2000 1TB",
    description:
      "Unidad de estado sólido NVMe con velocidad de lectura de 2200 MB/s",
    price: 109.99,
    category: "Almacenamiento",
    stock: 15,
  },
  {
    title: "Monitor ASUS TUF Gaming VG27AQ",
    description: "Monitor 1440p de 27'' con 165Hz y G-SYNC",
    price: 399.99,
    category: "Periféricos",
    stock: 10,
  },
  {
    title: "Cámara de seguridad Wyze Cam V3",
    description: "Cámara de seguridad con visión nocturna y grabación en 1080p",
    price: 35.99,
    category: "Seguridad",
    stock: 25,
  },
  {
    title: "Proyector Nebula Capsule Max",
    description:
      "Proyector portátil con Android TV integrado y 200 ANSI lúmenes",
    price: 349.99,
    category: "Proyección",
    stock: 6,
  },
  {
    title: "Silla gaming DXRacer Formula",
    description: "Silla ergonómica para gaming con soporte lumbar",
    price: 299.99,
    category: "Periféricos",
    stock: 5,
  },
  {
    title: "Kit de robótica LEGO Mindstorms Robot Inventor",
    description: "Kit de robótica con motor y sensores programables",
    price: 359.99,
    category: "Electrónica",
    stock: 8,
  },
  {
    title: "Smartwatch Garmin Fenix 7",
    description: "Reloj deportivo con GPS y medición de frecuencia cardíaca",
    price: 699.99,
    category: "Wearables",
    stock: 5,
  },
  {
    title: "Consola Xbox Series X",
    description: "Consola de videojuegos con soporte para 4K y 120Hz",
    price: 499.99,
    category: "Videojuegos",
    stock: 3,
  },
  {
    title: "Placa base MSI MAG Z590 TOMAHAWK WIFI",
    description:
      "Placa base para Intel 10ª y 11ª generación con WiFi integrado",
    price: 189.99,
    category: "Componentes",
    stock: 6,
  },
  {
    title: "Cámara web Logitech StreamCam",
    description: "Cámara web Full HD con enfoque automático para streaming",
    price: 169.99,
    category: "Streaming",
    stock: 10,
  },
  {
    title: "Smartphone Xiaomi Mi 11",
    description:
      "Teléfono inteligente con Snapdragon 888 y pantalla AMOLED 120Hz.",
    price: 749.99,
    category: "Telefonía",
    stock: 15,
  },
  {
    title: "Laptop Dell XPS 13",
    description:
      "Portátil ultra delgado con procesador Intel i7 y pantalla 4K.",
    price: 1399.99,
    category: "Computación",
    stock: 10,
  },
  {
    title: "Monitor ASUS TUF 27''",
    description: "Monitor gaming 165Hz con FreeSync y panel IPS.",
    price: 379.99,
    category: "Periféricos",
    stock: 8,
  },
  {
    title: "Teclado Logitech G413",
    description: "Teclado mecánico con switches Romer-G y retroiluminación.",
    price: 89.99,
    category: "Periféricos",
    stock: 25,
  },
  {
    title: "Auriculares Sony WH-1000XM4",
    description:
      "Auriculares inalámbricos con cancelación de ruido y batería de 30 horas.",
    price: 349.99,
    category: "Audio",
    stock: 20,
  },
  {
    title: "Smartwatch Apple Watch Series 6",
    description: "Reloj inteligente con monitoreo de oxígeno en sangre y ECG.",
    price: 399.99,
    category: "Tecnología",
    stock: 12,
  },
  {
    title: "Cámara Canon EOS 90D",
    description: "Cámara réflex digital con 32.5 MP y grabación en 4K.",
    price: 1299.99,
    category: "Fotografía",
    stock: 10,
  },
  {
    title: "Router TP-Link Archer AX6000",
    description:
      "Router Wi-Fi 6 con 8 puertos LAN y velocidad de hasta 6 Gbps.",
    price: 249.99,
    category: "Redes",
    stock: 30,
  },
  {
    title: "Altavoces JBL Charge 4",
    description: "Altavoces portátiles Bluetooth con 20 horas de batería.",
    price: 149.99,
    category: "Audio",
    stock: 18,
  },
  {
    title: "Silla Gaming Secretlab Titan",
    description: "Silla ergonómica con soporte lumbar y cojín de memoria.",
    price: 429.99,
    category: "Muebles",
    stock: 5,
  },
  {
    title: "Tableta Wacom Intuos Pro",
    description: "Tableta gráfica profesional con 8192 niveles de presión.",
    price: 399.99,
    category: "Creatividad",
    stock: 15,
  },
  {
    title: "Lámpara LED Philips Hue White",
    description: "Lámpara inteligente compatible con Alexa y Google Assistant.",
    price: 49.99,
    category: "Hogar",
    stock: 50,
  },
  {
    title: "Cafetera Nespresso VertuoPlus",
    description:
      "Cafetera automática con cápsulas de café y 4 tamaños de taza.",
    price: 199.99,
    category: "Electrodomésticos",
    stock: 30,
  },
  {
    title: "Bicicleta Estática ProForm 225 CSX",
    description:
      "Bicicleta estática con 18 niveles de resistencia y pantalla LCD.",
    price: 349.99,
    category: "Deportes",
    stock: 12,
  },
  {
    title: "Consola Nintendo Switch",
    description:
      "Consola híbrida con pantalla táctil de 6.2 pulgadas y Joy-Cons removibles.",
    price: 299.99,
    category: "Videojuegos",
    stock: 40,
  },
  {
    title: "Juego The Last of Us Part II",
    description:
      "Juego de acción y aventura para PlayStation 4, continuando la historia de Ellie.",
    price: 59.99,
    category: "Videojuegos",
    stock: 50,
  },
  {
    title: "Licuadora Oster 2L",
    description: "Licuadora de 700 W con 10 velocidades y jarra de vidrio.",
    price: 69.99,
    category: "Electrodomésticos",
    stock: 25,
  },
  {
    title: "Cámara GoPro HERO9 Black",
    description:
      "Cámara de acción con 5K y estabilización de imagen HyperSmooth.",
    price: 399.99,
    category: "Fotografía",
    stock: 8,
  },
  {
    title: "Refrigerador Samsung 520L",
    description:
      "Refrigerador de 520L con tecnología No Frost y compresor Digital Inverter.",
    price: 899.99,
    category: "Electrodomésticos",
    stock: 6,
  },
  {
    title: "Estufa Eléctrica DeLonghi",
    description:
      "Estufa de 2000W con termostato regulable y 3 niveles de calor.",
    price: 119.99,
    category: "Hogar",
    stock: 40,
  },
  {
    title: "Placa Base ASUS ROG Strix B550-F",
    description:
      "Placa base ATX con soporte para procesadores AMD Ryzen y Wi-Fi 6.",
    price: 189.99,
    category: "Computación",
    stock: 15,
  },
  {
    title: "Auriculares Razer Kraken V3",
    description:
      "Auriculares gaming con sonido envolvente 7.1 y micrófono cardioide.",
    price: 99.99,
    category: "Audio",
    stock: 30,
  },
  {
    title: "SSD Samsung 970 EVO Plus 1TB",
    description:
      "Unidad de estado sólido NVMe M.2 con velocidad de lectura hasta 3500 MB/s.",
    price: 129.99,
    category: "Computación",
    stock: 40,
  },
  {
    title: "Ventilador Rowenta Turbo Silence Extreme",
    description:
      "Ventilador con 5 velocidades y tecnología de silencio extremo.",
    price: 99.99,
    category: "Hogar",
    stock: 12,
  },
  {
    title: "Microondas LG 25L",
    description: "Microondas con 1000 W de potencia y 10 niveles de cocina.",
    price: 149.99,
    category: "Electrodomésticos",
    stock: 10,
  },
  {
    title: "Tablet Samsung Galaxy Tab S6",
    description:
      "Tableta con pantalla de 10.5 pulgadas y procesador Snapdragon 855.",
    price: 549.99,
    category: "Tecnología",
    stock: 15,
  },
  {
    title: "Sistema de sonido Bose SoundLink Revolve",
    description:
      "Altavoz Bluetooth con sonido 360° y hasta 12 horas de autonomía.",
    price: 199.99,
    category: "Audio",
    stock: 20,
  },
  {
    title: "Batería externa Anker PowerCore 26800mAh",
    description: "Batería externa con carga rápida y capacidad de 26800 mAh.",
    price: 69.99,
    category: "Accesorios",
    stock: 60,
  },
  {
    title: "Auriculares Bose QuietComfort 35 II",
    description: "Auriculares inalámbricos con cancelación activa de ruido.",
    price: 299.99,
    category: "Audio",
    stock: 8,
  },
  {
    title: "Cámara de seguridad Nest Cam",
    description:
      "Cámara de seguridad con visión nocturna y audio bidireccional.",
    price: 129.99,
    category: "Hogar",
    stock: 25,
  },
];

// console.log(products);

mongoose
  .connect(uriMongo)
  .then(async () => {
    try {
      await productModel.insertMany(products);
      console.log("Productos creados correctamente");
    } catch (error) {
      console.error("Error al crear productos: ", error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((error) =>
    console.error("Error al conectar a MongoDB Atlas: ", error)
  );
