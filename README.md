# AI Agent Builder

Aplicación web completa para crear, configurar y probar agentes de inteligencia artificial conectados con la API de OpenAI. Incluye un backend Node.js + Express con autenticación JWT y base de datos MongoDB, y un frontend React + Vite + TailwindCSS.

## Características principales

- Registro e inicio de sesión de usuarios con contraseñas cifradas y tokens JWT.
- CRUD completo de agentes: nombre, rol, descripción, temperatura, modelo y prompt base.
- Editor de configuración en tiempo real y panel de chat para probar al agente.
- Persistencia en MongoDB para usuarios, agentes y mensajes de chat.
- Capa de servicios y controladores que separa la lógica de negocio del transporte HTTP.
- Cliente React con diseño oscuro y componentes reutilizables.
- Comunicación segura con la API de OpenAI desde el backend (las claves nunca salen del servidor).

## Estructura del proyecto

```
clientex/
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── config/
│       │   ├── db.js
│       │   └── env.js
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── services/
├── frontend/
│   ├── package.json
│   ├── .env.example
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── components/
│       ├── context/
│       ├── hooks/
│       └── pages/
└── README.md
```

## Requisitos previos

- Node.js 18+
- npm o pnpm
- MongoDB en ejecución (local o remoto)
- Cuenta y clave API de OpenAI

## Configuración del backend

1. Copia el archivo de ejemplo de variables de entorno y edítalo:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Ajusta los valores en `.env`:

   ```env
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   MONGODB_URI=mongodb://localhost:27017/ai_agent_builder
   JWT_SECRET=define-un-secreto-seguro
   JWT_EXPIRES_IN=7d
   OPENAI_API_KEY=sk-...
   OPENAI_DEFAULT_MODEL=gpt-4-turbo
   ```

3. Instala dependencias y ejecuta el servidor:

   ```bash
   npm install
   npm run dev
   ```

   El servidor se levantará en `http://localhost:5000` y expondrá los endpoints REST:

   - `POST /auth/register`
   - `POST /auth/login`
   - `GET /agents`
   - `POST /agents`
   - `GET /agents/:id`
   - `PUT /agents/:id`
   - `DELETE /agents/:id`
   - `GET /chat/:agentId`
   - `POST /chat/:agentId`

## Configuración del frontend

1. Copia las variables de entorno de ejemplo:

   ```bash
   cd ../frontend
   cp .env.example .env
   ```

2. Instala dependencias y arranca el cliente de desarrollo:

   ```bash
   npm install
   npm run dev
   ```

   La app estará disponible en `http://localhost:5173`.

## Flujo de uso

1. Regístrate con nombre, correo y contraseña.
2. Accede con tus credenciales.
3. Crea un nuevo agente desde el botón "Nuevo agente".
4. Configura su prompt base, modelo y temperatura.
5. Guarda los cambios y conversa con él desde el panel de chat integrado.

Los mensajes se almacenan en MongoDB para mantener el contexto en conversaciones posteriores.

## Ejemplos de llamadas REST

Registrar un usuario:

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@example.com","password":"segura123"}'
```

Crear un agente (requiere token JWT):

```bash
curl -X POST http://localhost:5000/agents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Asistente de Marketing",
    "role": "Estratega",
    "description": "Ayuda a diseñar campañas creativas",
    "model": "gpt-4-turbo",
    "temperature": 0.8,
    "basePrompt": "Eres un estratega creativo que responde con ideas accionables."
  }'
```

Enviar un mensaje al agente:

```bash
curl -X POST http://localhost:5000/chat/<AGENT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"message":"Genera un slogan para una app de finanzas"}'
```

## Despliegue

- **Backend:** Puede desplegarse en Render, Railway o servicios similares. Define las variables de entorno y usa `npm run start`.
- **Frontend:** Compatible con Vercel o Netlify. Define `VITE_API_URL` apuntando al backend desplegado.
- Configura CORS (`CLIENT_ORIGIN`) para permitir el dominio del frontend en producción.
- Mantén la clave de OpenAI únicamente en el backend; nunca la expongas en el cliente.

## Seguridad y buenas prácticas

- Las contraseñas se cifran con bcrypt.
- Los tokens JWT se generan con caducidad configurable (`JWT_EXPIRES_IN`).
- Validaciones en cada endpoint mediante `express-validator`.
- Manejo centralizado de errores y respuestas consistentes.
- Historial de chat limitado para evitar cargas excesivas de contexto.

## Scripts útiles

- `npm run dev`: levanta el servidor Express o el cliente React en modo desarrollo.
- `npm run start`: modo producción (backend).
- `npm run build`: compila el frontend listo para producción.

## Licencia

Proyecto de referencia educativo. Puedes adaptarlo libremente para tus necesidades.
