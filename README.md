# Proyecto de Titulación: Aplicación Web Progresiva para el Recinto SAGO

## Descripción
Este proyecto de titulación consiste en el desarrollo de una **Aplicación Web Progresiva (PWA)** para el **Recinto SAGO** en Osorno, Chile. La aplicación utiliza tecnologías avanzadas de **georreferenciación** y **mapas interactivos** para mejorar la accesibilidad y conectividad en áreas con limitaciones de internet, como el propio recinto. 

### Objetivos del Proyecto
El proyecto tiene como objetivo principal resolver problemas de señalización y orientación dentro del Recinto SAGO, proporcionando a los usuarios una solución innovadora y replicable en entornos similares. Esto se logra mediante el uso de tecnologías como **service workers** y la incorporación de **datos geográficos** detallados, que permiten el acceso a la información relevante incluso en condiciones de conectividad limitada.

## Tecnologías Utilizadas
- **React**: Utilizado para la construcción del frontend interactivo de la PWA.
- **Vite**: Herramienta de construcción rápida y ligera que optimiza el rendimiento de la aplicación.
- **Leaflet**: Biblioteca de JavaScript para la renderización de mapas interactivos.
- **Service Workers**: Permiten el funcionamiento de la aplicación en modo offline y la mejora de la experiencia del usuario en áreas con conectividad limitada.
- **Node.js** y **Nest.js**: Para la implementación del backend que gestiona los datos geográficos y otras funcionalidades.

## Instalación y Ejecución
    ### Frontend

Sigue estos pasos para instalar y ejecutar el frontend de la aplicación:

1. Navega al directorio del frontend:
    ```bash
    cd SAGO_APP-main/frontend
    ```

2. Instala las dependencias necesarias:
    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

### Backend

Sigue estos pasos para instalar y ejecutar el backend de la aplicación:

1. Navega al directorio del backend:
    ```bash
    cd SAGO_APP-main/backend
    ```

2. Si el backend usa Node.js:
    - Instala las dependencias necesarias:
      ```bash
      npm install
      ```

    - Inicia el servidor del backend:
      ```bash
      npm run start
      ```

### Base de Datos

1. En el archivo `test-db.sql`, encontrarás el esquema de la base de datos de prueba. Usa este archivo para configurar tu base de datos local.

2. Puedes importar el archivo en tu motor de base de datos preferido ejecutando:
    ```bash
    mysql -u tu_usuario -p tu_base_de_datos < test-db.sql
    ```

## Uso
La PWA permite a los usuarios acceder a la información del Recinto SAGO y orientarse dentro del espacio utilizando el mapa interactivo. Funciona incluso sin conexión a internet, gracias a la implementación de service workers.
