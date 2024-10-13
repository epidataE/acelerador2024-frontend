# Sistema de Gestión de Inscripciones - Acelerador 2024

Este proyecto es un sistema de gestión de inscripciones diseñado para facilitar la organización y participación en actividades del Acelerador 2024. Permite vincular automáticamente mentores técnicos con egresados, gestionar la comunicación vía e-mail y hacer seguimiento durante la mentoría.

### Backend
El backend está construido con Java, Spring Boot, y utiliza Swagger para la documentación de la AP
### Frontend
El frontend está desarrollado con Node.js, React, y utiliza Bootstrap para los estilos.

## Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- **Java 17**
- **Gradle v8.8** 
- **Node.js v**
- **MySQL** 

## Instalación
### Clonación del Repositorio

Para clonar el repositorio, abre tu terminal y ejecuta:
### Backend
```bash
git clone https://gitlab.com/acelerador2024/backend.git

```

### Frontend
```bash
git clone https://gitlab.com/acelerador2024/frontend.git

``` 
### Configuración de la Base de Datos 
#### modificar el archivo: application.properties
Ubicación del archivo: Abre el archivo src/main/resources/application.properties en tu proyecto.
Agregar las propiedades necesarias: Debes incluir las siguientes líneas, ajustando los valores según tu configuración de base de datos:
#### Credenciales de acceso
``` bash
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña

```


## Iniciar el Backend
Navega al directorio del backend:
``` bash
cd backend  
```

### Inicia el backend usando Gradle:
``` bash
./gradlew bootRun --args='--spring.profiles.active=dev'

```
#### Swagger
Ingresa a la documentacion de la API
[Acceder a Swagger UI](http://localhost:8080/swagger-ui/index.html)

## Iniciar el Frontend
Navega al directorio del frontend:
``` bash
cd frontend  
```

### Instala las dependencias necesarias:
``` bash
npm install

```

### Inicia el frontend:
```bash
npm run dev
```

## UX
#### Diseño de Pantallas: 
[Acceso a Figma](https://www.figma.com/design/nGRyHeN4pLFayc3XWnQEMs/Acelerador-Polo-IT-wireframe-baja?node-id=8-5&node-type=frame&t=AKRzzeTBU7G1K6gY-0)
