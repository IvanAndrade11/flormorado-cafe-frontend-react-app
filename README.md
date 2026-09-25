# ☕ Flormorado Café — Frontend

> Aplicación web e-commerce para **Flormorado Café**, una marca colombiana de café de especialidad y productos artesanales. Desplegada en producción en [flormoradocafe.com](https://flormoradocafe.com).

---

## 📋 Tabla de contenido

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Tecnologías principales](#-tecnologías-principales)
- [Arquitectura del proyecto](#-arquitectura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y configuración](#-instalación-y-configuración)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Estructura de carpetas](#-estructura-de-carpetas)
- [Rutas de la aplicación](#-rutas-de-la-aplicación)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## 🧾 Descripción del proyecto

**Flormorado Café** es una Single Page Application (SPA) que permite a los usuarios explorar y comprar café de especialidad colombiano y productos artesanales como harina de sagú. La aplicación incluye:

- **Landing page** con carruseles de productos y categorías.
- **Tienda** con catálogo de productos, filtros avanzados (tipo, marca, tamaño, origen, variedad) y ordenamiento.
- **Detalle de producto** con configurador de molienda, cantidad y carrito de compras.
- **Blog** con artículos dinámicos y contenido HTML sanitizado (DOMPurify).
- **Páginas institucionales**: Sobre nosotros, Orígenes y Términos y condiciones.
- **Carrito de compras** con agrupación inteligente de productos por tipo de molienda y persistencia en `localStorage`.
- **Checkout** en 3 pasos (contacto, entrega y pago) con guardado opcional de datos para compras futuras. Al confirmar, envía el pedido al backend de pedidos y muestra una pantalla de confirmación con el número de pedido.
- **Contacto** con formulario de un solo paso (nombre, teléfono opcional, correo, asunto y mensaje) que envía el mensaje al backend, el cual lo guarda y lo reenvía por correo al negocio.
- **Panel de control** (`/panel`, `FMC-0020`) protegido por clave: pedidos con búsqueda (número, documento, celular, correo o nombre) y cambio de estado, clientes con búsqueda, filtro por novedades, historial y baja de novedades por WhatsApp, y mensajes de contacto con seguimiento. Cada fila abre su detalle en un modal. Consume la API del backend de pedidos.
- **Feature flags** con ConfigCat para habilitar o deshabilitar funcionalidades de forma remota.
- **Diseño responsive** optimizado para desktop y dispositivos móviles.

---

## 🛠️ Tecnologías principales

| Categoría            | Tecnología                                                     |
| -------------------- | -------------------------------------------------------------- |
| **Framework UI**     | React 19                                                       |
| **Lenguaje**         | TypeScript 5                                                   |
| **Estado global**    | Redux Toolkit + React Redux                                    |
| **Enrutamiento**     | React Router DOM v7 (HashRouter)                               |
| **Estilos**          | Bootstrap 5, React Bootstrap, Sass/SCSS                        |
| **Tipografía**       | Source Sans 3 (`@fontsource`), Economica (local)               |
| **Bundler**          | Webpack 5 (con ts-loader, sass-loader, dotenv-webpack)         |
| **Feature Flags**    | ConfigCat (auto-polling)                                       |
| **Device Detection** | react-device-detect                                            |
| **Sanitización HTML**| DOMPurify (contenido del blog)                                 |
| **Formateo**         | Prettier                                                       |
| **Linter**           | ESLint 9 (flat config) + typescript-eslint + eslint-plugin-react/react-hooks |
| **Testing**          | Jest + Testing Library (`@testing-library/react`)               |
| **CI**               | GitHub Actions (type-check, lint, formato, tests y build en cada PR a `main`) |
| **Deploy**           | GitHub Pages (`gh-pages`) con dominio personalizado             |

---

## 🏗️ Arquitectura del proyecto

La aplicación sigue una arquitectura modular basada en componentes con separación clara de responsabilidades:

```
src/
├── app/              → Configuración de la aplicación (router, providers, Redux store)
├── assets/           → Recursos estáticos (imágenes, íconos, fuentes, videos)
├── components/       → Componentes reutilizables organizados por capa
│   ├── common/       → Componentes genéricos (Loader, ScrollToTop, Toast)
│   ├── layout/       → Estructura de página (Navbar, NavbarStore, Footer)
│   ├── section/      → Secciones de contenido (Banner, Carruseles)
│   └── ui/           → Componentes de interfaz (Cards, Product, ShoppingCart, etc.)
├── hooks/            → Custom hooks (useFlags, useInit)
├── pages/            → Vistas/páginas de la aplicación
├── services/         → Integraciones externas (envío de pedidos y de mensajes de contacto al backend)
├── styles/           → Estilos globales y variables SCSS
├── types/            → Definiciones de tipos TypeScript
└── utils/            → Utilidades y constantes
```

**Flujo de datos:**

```
ConfigCat (Feature Flags)
        ↓
  Redux Store ← → Componentes React
        ↓
  React Router (HashRouter) → Páginas
```

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) **v18+** o **v20+** (LTS recomendado).
- **npm** (viene incluido con Node.js).

Puedes verificar la instalación con:

```bash
node -v
npm -v
```

---

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/IvanAndrade11/flormorado-cafe-frontend-react-app.git
cd flormorado-cafe-frontend-react-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea los archivos `.env.development` y `.env.production` en la raíz del proyecto (ver sección [Variables de entorno](#-variables-de-entorno)).

### 4. Iniciar el servidor de desarrollo

```bash
npm start
```

La aplicación estará disponible en **http://localhost:3000** con recarga en caliente (HMR).

---

## 🔐 Variables de entorno

Las variables de entorno se gestionan a través de [`dotenv-webpack`](https://www.npmjs.com/package/dotenv-webpack). Webpack selecciona automáticamente el archivo según el modo de compilación.

| Variable         | Descripción                                            | Archivo   |
| ---------------- | ------------------------------------------------------ | --------- |
| `NODE_ENV`       | Entorno de ejecución                                   | `.env.*`  |
| `SDK_CNFCT`      | SDK Key de ConfigCat (feature flags)                   | `.env.*`  |
| `ORDERS_API_URL` | URL del [backend de pedidos](https://github.com/IvanAndrade11/flormorado-cafe-backend-orders), usado tanto por el checkout como por el formulario de contacto | `.env.*`  |

`ORDERS_API_URL` es opcional: si falta, el checkout y el formulario de contacto usan la URL de producción. En `.env.development` conviene apuntarla a `http://localhost:8787` para probar contra el backend corriendo en local con `wrangler dev`.

**Archivos de entorno:**

- `.env.development` → Usado al ejecutar `npm start`.
- `.env.production` → Usado al ejecutar `npm run build`.

> ⚠️ Los archivos `.env.*` están incluidos en `.gitignore` para proteger claves sensibles. Solicita las credenciales al administrador del proyecto.

---

## 📜 Scripts disponibles

| Script               | Comando                | Descripción                                                                                                 |
| -------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| **`start`**          | `npm start`            | Inicia el servidor de desarrollo en `localhost:3000` con HMR.                                               |
| **`build`**          | `npm run build`        | Genera el bundle optimizado para producción en la carpeta `dist/`.                                          |
| **`preview`**        | `npm run preview`      | Sirve la carpeta `dist/` localmente para previsualizar el build de producción.                              |
| **`deploy`**         | `npm run deploy`       | Despliega la carpeta `dist/` a GitHub Pages (ejecuta `predeploy` automáticamente).                          |
| **`predeploy`**      | *(automático)*         | Ejecuta `build` y crea `dist/CNAME` con el dominio `flormoradocafe.com`.                                    |
| **`prettier`**       | `npm run prettier`     | Formatea todo el código fuente con Prettier.                                                                |
| **`prettier:check`** | `npm run prettier:check` | Verifica que el código cumpla con las reglas de formato de Prettier (sin modificar archivos).              |
| **`lint`**           | `npm run lint`         | Corre ESLint sobre `src/**/*.{ts,tsx}`.                                                                      |
| **`lint:fix`**       | `npm run lint:fix`     | Corre ESLint con `--fix` para corregir automáticamente lo que se pueda.                                     |
| **`test`**           | `npm test`             | Corre la suite de pruebas con Jest una sola vez.                                                             |
| **`test:watch`**     | `npm run test:watch`   | Corre Jest en modo watch, re-ejecutando las pruebas al guardar cambios.                                     |

---

## 🌐 Despliegue

La aplicación se despliega en **GitHub Pages** con un dominio personalizado.

### Proceso de despliegue

```bash
npm run deploy
```

Este comando ejecuta automáticamente:

1. `npm run build` — Compila el proyecto en modo producción.
2. Crea el archivo `dist/CNAME` con el valor `flormoradocafe.com`.
3. Publica los archivos estáticos de `dist/` en la rama `gh-pages` usando el paquete [`gh-pages`](https://www.npmjs.com/package/gh-pages).

### Dominio personalizado

La aplicación utiliza **HashRouter** (`/#/ruta`) para garantizar compatibilidad con GitHub Pages, que no soporta enrutamiento del lado del servidor.

| Entorno     | URL                                                                                     |
| ----------- | --------------------------------------------------------------------------------------- |
| Producción  | [https://flormoradocafe.com](https://flormoradocafe.com)                                |
| GitHub Pages| [https://ivanandrade11.github.io/flormorado-cafe-frontend-react-app](https://ivanandrade11.github.io/flormorado-cafe-frontend-react-app) |

---

## 📂 Estructura de carpetas

```
flormorado-cafe-frontend-react-app/
│
├── public/                     # Archivos estáticos públicos
│   ├── index.html              # Plantilla HTML principal
│   └── icon.svg                # Favicon SVG
│
├── src/
│   ├── __mocks__/               # Stubs de assets/estilos para Jest (fileMock.js)
│   │
│   ├── app/
│   │   ├── providers/
│   │   │   └── redux/          # Redux store (con persistencia del carrito en localStorage), reducers y acciones
│   │   └── router/             # Configuración de rutas (React Router, páginas cargadas con React.lazy)
│   │
│   ├── assets/
│   │   ├── fonts/              # Fuentes personalizadas (Economica)
│   │   ├── icons/              # Íconos del proyecto
│   │   ├── images/             # Imágenes estáticas
│   │   └── videos/             # Videos para banners y secciones
│   │
│   ├── components/
│   │   ├── common/             # Loader, ScrollToTop, Toast
│   │   ├── layout/             # Navbar, NavbarStore, Footer
│   │   ├── section/            # Banner, CategoryCarousel, InfiniteCarousel, ProductCarousel
│   │   └── ui/                 # CarouselMessage, CategoryCard, Product, ShoppingCart,
│   │                           #   StoreCard, Title, WhatsAppButton, PopDropdown, ListItemWithIcon
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useFlags.ts         # Hook para feature flags (ConfigCat)
│   │   ├── useInit.ts          # Hook de inicialización de la app
│   │   └── useDocumentMeta.ts  # Hook para aplicar título/meta tags SEO por página
│   │
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── Landing/            # Página principal
│   │   ├── Store/              # Catálogo de productos con filtros
│   │   │   ├── Categories/     # Vista por categorías
│   │   │   └── ProductDetail/  # Detalle y configurador de producto
│   │   ├── About/              # Sobre nosotros
│   │   ├── Origins/            # Orígenes del café
│   │   ├── Contact/            # Página de contacto
│   │   ├── Blog/               # Lista de artículos
│   │   │   └── BlogPost/       # Artículo individual (con sanitización DOMPurify)
│   │   ├── Checkout/           # Flujo de checkout (contacto → entrega → pago)
│   │   ├── Terms/              # Términos y condiciones (contenido de ejemplo)
│   │   └── Panel/              # Panel de control (pedidos, clientes, mensajes de contacto)
│   │
│   ├── services/               # Integraciones externas (orders: envío de pedidos; contact: envío de mensajes; admin: API del panel)
│   │
│   ├── styles/
│   │   ├── globals.scss        # Variables SCSS (colores, gradientes, tipografía)
│   │   └── styles.scss         # Estilos globales de la aplicación
│   │
│   ├── types/                  # Definiciones de tipos TypeScript
│   │   ├── components/         # Tipos para props de componentes
│   │   ├── configCat/          # Tipos para feature flags y productos
│   │   ├── store/              # Tipos del estado Redux
│   │   └── ui/                 # Tipos para componentes UI
│   │
│   ├── utils/
│   │   └── constants/          # Constantes de la aplicación
│   │       ├── common/         # URLs, menú de navegación, campos de formularios, utilidades
│   │       ├── media/          # Rutas a íconos, imágenes y videos
│   │       ├── redux/          # Estado inicial del store y setters tipados
│   │       ├── storage/        # Claves de localStorage (carrito, checkout)
│   │       └── store/          # Datos, filtros y ordenamiento de tienda
│   │
│   ├── App.tsx                 # Componente raíz
│   ├── index.tsx               # Punto de entrada de la aplicación
│   └── typings.d.ts            # Declaraciones de tipos para módulos
│
├── docs/                       # Documentación del proyecto
│   └── configCat/              # Documentación de feature flags
│
├── .github/
│   └── workflows/ci.yml        # CI: type-check, lint, formato, tests y build en cada PR a main
│
├── webpack.config.js           # Configuración de Webpack
├── tsconfig.json               # Configuración de TypeScript
├── eslint.config.js            # Configuración de ESLint (flat config)
├── jest.config.js              # Configuración de Jest
├── jest.setup.ts               # Setup de Jest (matchers de @testing-library/jest-dom)
├── package.json                # Dependencias y scripts del proyecto
└── .gitignore                  # Archivos ignorados por Git
```

---

## 🗺️ Rutas de la aplicación

| Ruta                    | Página            | Descripción                                 |
| ----------------------- | ----------------- | ------------------------------------------- |
| `/`                     | Landing           | Página principal con carruseles y hero       |
| `/tienda`               | Store             | Catálogo de productos con filtros            |
| `/tienda/:productId`    | ProductDetail     | Detalle y configurador de un producto        |
| `/tienda/categorias`    | Categories        | Vista por categorías                         |
| `/sobre-nosotros`       | About             | Información sobre Flormorado Café            |
| `/origenes`             | Origins           | Historia y orígenes del café                 |
| `/contacto`             | Contact           | Formulario de contacto (envía el mensaje al backend, que lo reenvía por correo) |
| `/blog`                 | Blog              | Lista de artículos del blog                  |
| `/blog/:slug`           | BlogPost          | Artículo individual del blog                 |
| `/checkout`             | Checkout          | Flujo de compra: contacto, entrega y pago    |
| `/terminos-y-condiciones` | Terms           | Términos y condiciones (contenido de ejemplo) |
| `/panel`                | Panel             | Panel de control (pedidos, clientes, mensajes de contacto), protegido por clave |

> **Nota:** Al usar HashRouter, las rutas en producción se acceden como `https://flormoradocafe.com/#/tienda`. Cada página se carga de forma diferida (`React.lazy`), en su propio chunk de JavaScript.

---

## 📄 Licencia

Este proyecto utiliza la licencia **ISC**.

---

## 👤 Autor

**Iván Andrade** — Colombia 🇨🇴

- GitHub: [@IvanAndrade11](https://github.com/IvanAndrade11)
