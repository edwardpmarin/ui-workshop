# ui-workshop

Aprendiendo UI automation usando Playwright.

## Requisitos
- Node.js (versión usada en el proyecto, p. ej. 21)
- npm
- Playwright (instalado con `npx playwright install`)

## Instalación
Desde la raíz del monorepo:
```bash
npm ci
npx playwright install --with-deps
```

## Ejecutar tests

Usar el runner de Playwright (todas las apps):
```bash
npx playwright test
```

Usar la UI de Playwright:
```bash
npx playwright test --ui
```

Ejecutar tests para la app `swag-labs` (usa el config local):
- Bash / WSL / Git Bash:
```bash
ENV=dev npx playwright test --config=apps/swag-labs/playwright.config.ts
```
- Windows CMD:
```bat
set ENV=dev && npx playwright test --config=apps/swag-labs/playwright.config.ts
```
- PowerShell:
```powershell
$env:ENV='dev'; npx playwright test --config=apps/swag-labs/playwright.config.ts
```

Usando el script en package.json:
```bash
# desde la raíz del repo
ENV=dev npm run test:swag-labs
```
(Windows CMD / PowerShell: ver ejemplos arriba para setear ENV)

Ejecutar un test específico:
```bash
ENV=dev npx playwright test --config=apps/swag-labs/playwright.config.ts apps/swag-labs/tests/loginUsingFixture.spec.ts
```
O pasando el path al script:
```bash
ENV=dev npm run test:swag-labs -- apps/swag-labs/tests/loginUsingFixture.spec.ts
```

Pasar opciones de Playwright desde el script (usar `--` después del script):
```bash
# ejemplo: ejecutar sólo chromium
ENV=dev npm run test:swag-labs -- --project=chromium
```

Mostrar reporte HTML generado:
```bash
npx playwright show-report reports/swag-labs
```

## Variables de entorno (config)
El proyecto usa un `global-setup` que carga archivos `.env.<ENV>` desde la carpeta `config/`.  
- Asegúrate de ejecutar los tests con la variable `ENV` (por ejemplo `dev`).  
- Ejemplo de archivo `config/.env.dev`:
```
BASE_URL=https://www.saucedemo.com
SWAG_LABS_VALID_USERNAME=standard_user
SWAG_LABS_VALID_PASSWORD=secret_sauce
```
- Si las variables no se cargan:
  1. Verifica que `ENV` esté definida al ejecutar los tests.
  2. Revisa logs del global-setup (imprime `envPath` y `process.env.ENV`).
  3. Verifica la ruta usada en `global-setup.ts` (debe apuntar a `../config` o `../../config` según la ubicación del archivo).

## Jenkins 

Correr docker compose:
```bash
docker compose -f 'docker-compose.yml' up -d --build 
```

Configurar servidor Jenkins

- Obtener contraseña:
```bash
cd /var/jenkins_home/secrets/
cat initialAdminPassword
```
- Ejemplo:
```
1a8272d0c93b4cf19a42197825f74b21
```

- Ir a http://localhost:8080 poner la contraseña para acceder a Jenkins

- Instalar plugins recomendados

- Crear Admin User
```
User: ui-workshop
Pass: workshop
Define jenkins Url
http://localhost:8080/
```

- Instalar nodesj y configurar herramienta

- Instalar HTML Reporter Plugin

## Troubleshooting rápido
- Error `Unsupported URL Type "test:"` → ejecutar scripts con `npm run <script-name>`, no `npm <script-name>`.
- Si Playwright dice “No tests found”, asegúrate de usar el `--config` correcto o de que `testDir` en el config apunte al folder correcto.
- Para depurar env vars, añade `console.error(process.env)` en un test o en `global-setup` (temporalmente).

## Notas
Mantén los archivos `.env.*` fuera del control de versiones si contienen secretos. Usa archivos de ejemplo (`.env.example`) para documentar variables necesarias.