# Proyecto Vue

## Descripción
Aplicación web desarrollada con Vue.js que [describe brevemente qué hace tu aplicación].

## Requisitos del Sistema

### Node.js
- **Versión requerida:** Node.js 22.x
- Puedes verificar tu versión actual con: `node --version`
- Si necesitas instalar Node.js 22, visita: https://nodejs.org/

### Verificar Compatibilidad
```bash
# Verificar versión de Node.js
node --version

# Verificar versión de npm
npm --version
```

## Instalación

1. **Clona el repositorio:**
```bash
git clone [URL_DEL_REPOSITORIO]
cd football-frontend
```

2. **Instala las dependencias:**
```bash
npm install
```

## Scripts Disponibles

### Desarrollo
```bash
# Inicia el servidor de desarrollo
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Producción
```bash
# Construye la aplicación para producción
npm run build

# Previsualiza la build de producción
npm run preview
```

### Linting y Formateo
```bash
# Ejecuta el linter
npm run lint

# Corrige automáticamente problemas de linting
npm run lint:fix
```

## Estructura del Proyecto
```
├── public/          # Archivos estáticos
├── src/
│   ├── components/  # Componentes Vue reutilizables
│   ├── views/       # Páginas/vistas de la aplicación
│   ├── router/      # Configuración de rutas
│   ├── stores/      # Gestión de estado (Pinia)
│   ├── assets/      # Recursos (imágenes, estilos, etc.)
│   └── main.js      # Punto de entrada de la aplicación
├── package.json
└── README.md
```

## Tecnologías Utilizadas
- **Vue.js 3** - Framework principal
- **Vite** - Herramienta de build y desarrollo
- **Vue Router** - Enrutamiento
- **Pinia** - Gestión de estado
- **[Otras librerías que uses]**

## Configuración del Entorno

### Variables de Entorno
1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Configura las variables según tu entorno en el archivo `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Nota:** El archivo `.env.example` contiene todas las variables necesarias con valores por defecto. Nunca commitees el archivo `.env` al repositorio.

## Despliegue

### Build para Producción
```bash
npm run build
```
Los archivos generados estarán en la carpeta `dist/`