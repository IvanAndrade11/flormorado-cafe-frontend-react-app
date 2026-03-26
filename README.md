# Flormorado Café - Frontend

Este es el repositorio del frontend para **Flormorado Café**, una aplicación web desarrollada con React y TypeScript.

## 🛠️ Tecnologías utilizadas

- **React 19** - Biblioteca para construir interfaces de usuario.
- **TypeScript** - Superconjunto de JavaScript que añade tipado estático.
- **Redux Toolkit** - Manejo del estado global de la aplicación.
- **React Router** - Enrutamiento para la navegación o Single Page Application (SPA).
- **Bootstrap 5 & React Bootstrap** - Framework de diseño y componentes UI.
- **Webpack** - Empaquetador de módulos.
- **Sass / CSS** - Estilos personalizados.
- **ConfigCat** - Feature flags y gestión de configuración.

## 🚀 Instalación y uso local

### Requisitos previos
- [Node.js](https://nodejs.org/) (versión recomendada 18+ o 20+).
- `npm` (gestor de paquetes de Node).

### Pasos para levantar el proyecto

1. **Clonar el repositorio y acceder a la carpeta:**

```bash
cd flormorado-cafe-frontend-react-app
```

2. **Instalar las dependencias:**

```bash
npm install
```

3. **Ejecutar el servidor de desarrollo:**

```bash
npm start
```
Esto iniciará la aplicación en modo desarrollo. Por lo general, estará disponible en `http://localhost:8080` o `http://localhost:3000` (el puerto configurado en Webpack).

### Otros comandos disponibles

- **Construir para producción (Build):**
  ```bash
  npm run build
  ```
  Genera los archivos optimizados dentro de la carpeta `dist/`.

- **Previsualizar la versión de producción:**
  ```bash
  npm run preview
  ```
  Levanta un servidor local sirviendo la carpeta `dist/`.

- **Formatear el código:**
  ```bash
  npm run prettier
  ```
  Revisa y formatea el código utilizando Prettier.

- **Despliegue a producción (Deploy):**
  ```bash
  npm run deploy
  ```
  Sube los archivos estáticos de la carpeta `dist` a GitHub Pages. *(Incluye un paso `predeploy` que configura el dominio personalizado `flormoradocafe.com` en `dist/CNAME`).*

## 👤 Autor

**Iván Andrade - CO**
