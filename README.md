# Sistema Médico Preventivo
##Descripción
Este proyecto es una aplicación móvil diseñada para mejorar la gestion hospitalaria, reduciendo los teiempos de espera de los pacientes y optimizando los procesos internos. La aplicación permite la gestión de citas, administración de roles de usuaario, y la visualización de reportes detallados sobre la utilización de los recursos del hospital.

## Tecnologías Utilizadas
- **Backend**: Node.js con JavaScript
- **Frontend**: React Native con Javascript
- **Base de datos**: MongoDB

## Requisitos Previos
- Node.js v.20 o superior
- npm v.10 o superior
- MongoDB

## Instalación
1. **Clonar el repositorio:**
```bash
git clone https://github.com/Darkpool645/SIMEPREV.git
```
2. **Configurar la base dfe datos:**
Abrir MongoDBCompass y crear una base de datos para el proyecto.

Actualizar el archivo '.env' con las credenciales de tu base de datos.

3. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

4. **Iniciar el backend**
```bash
npm run dev
```

5. **Instalar dependencias del frontend**
```bash
cd ../frontend
npm install
```

6. **Iniciar el frontend**
```bash
npm start
```

## Uso
- **Administrador**
    - Gestión de usuarios y roles
    - Configuración de recursos hospitalarios

- **Médicos**
    - Visualización de citas
    - Actualización de estaado de los pacientes

- **Pacientes**
    - Solicitud de citas
    - Visualización de historial médico

## Contribución

1. Hacer un fork del proyecto.
2. Crear una nueva rama (feature/nueva-funcionalidad).
3. Realizar los cambios necesarios y hacer commit.
4. Enviar un pull request.

## Licencia
Este proyecto esta licenciado bajo la Licencia MIT. consulta el archivo [LICENSE](LICENSE) para más detalles.