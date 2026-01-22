# Micro Frontend Demo with Single-SPA

A micro frontend architecture using **Single-SPA** with Angular 20 as the shell/root application, and React + Angular as micro frontends.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│              Angular Shell (Root Config)                     │
│                    Port: 9000                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Navigation | Sidebar | SystemJS | App Registration     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                  │
│           ┌───────────────┴───────────────┐                  │
│           ▼                               ▼                  │
│  ┌─────────────────┐           ┌─────────────────┐          │
│  │  React MFE      │           │  Angular MFE    │          │
│  │  Port: 9001     │           │  Port: 9003     │          │
│  │  Route: /react  │           │  Route: /dashboard│        │
│  └─────────────────┘           └─────────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

## Project Structure

```
micro-frontend-demo/
├── mfe-angular/              # Shell/Root application (Angular 20)
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts      # Main layout with nav & sidebar
│   │   │   ├── nav.component.ts      # Navigation component
│   │   │   └── sidebar.component.ts  # Sidebar component
│   │   ├── index.html                # Import maps & SystemJS config
│   │   ├── main.ts                   # Angular bootstrap
│   │   ├── root-config.ts            # Single-SPA app registration
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
│
├── mfe-react/                # React micro frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── mfe-react.js      # Single-SPA lifecycle exports
│   ├── webpack.config.js
│   └── package.json
│
├── mfe-angular-2/            # Angular Dashboard micro frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts
│   │   │   └── empty.component.ts
│   │   ├── main.single-spa.ts
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
│
└── README.md
```

## Tech Stack

| Application | Framework | Port | Description |
|-------------|-----------|------|-------------|
| Shell | Angular 20 | 9000 | Root config with navigation |
| React MFE | React 18 | 9001 | React micro frontend |
| Dashboard MFE | Angular 20 | 9003 | Angular micro frontend |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

Install dependencies for all applications:

```bash
# Install Shell (Angular) dependencies
cd mfe-angular
npm install

# Install React MFE dependencies
cd ../mfe-react
npm install

# Install Angular Dashboard MFE dependencies
cd ../mfe-angular-2
npm install
```

### Running the Applications

Run all three applications in separate terminals:

**Terminal 1 - Shell (Angular Root):**
```bash
cd mfe-angular
npm start
# Runs on http://localhost:9000
```

**Terminal 2 - React Micro Frontend:**
```bash
cd mfe-react
npm start
# Runs on http://localhost:9001
```

**Terminal 3 - Angular Dashboard Micro Frontend:**
```bash
cd mfe-angular-2
npm start
# Runs on http://localhost:9003
```

### Accessing the Application

Open your browser and navigate to:
- **http://localhost:9000** - Main shell application
- **http://localhost:9000/react** - React micro frontend
- **http://localhost:9000/dashboard** - Angular Dashboard micro frontend

## How It Works

### Shell Application (mfe-angular)

The Angular shell serves as the root config that:
1. Loads SystemJS for dynamic module loading
2. Defines import maps for micro frontends
3. Registers micro frontends with single-spa
4. Provides navigation and layout (nav, sidebar)
5. Uses Angular Router for main app routing

### Micro Frontends

Each micro frontend:
1. Exports Single-SPA lifecycle methods (`bootstrap`, `mount`, `unmount`)
2. Runs independently on its own port
3. Is loaded dynamically when its route is activated
4. Uses standalone components (Angular 20)

### Import Maps

Defined in `mfe-angular/src/index.html`:

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@6.0.0/lib/system/single-spa.min.js",
      "react": "https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js",
      "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js",
      "@mfe/react-app": "http://localhost:9001/mfe-react.js",
      "@mfe/angular-app-2": "http://localhost:9003/main.js"
    }
  }
</script>
```

## Single-SPA Lifecycle

Each micro frontend exports these functions:

```typescript
export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
```

## Key Features

- **Angular 20** - Latest Angular with standalone components
- **React 18** - Modern React with hooks
- **Single-SPA** - Micro frontend orchestration
- **SystemJS** - Dynamic module loading
- **Independent Deployment** - Each MFE can be deployed separately
- **Framework Agnostic** - Mix different frameworks in one app

## Customization

### Adding a New Micro Frontend

1. Create a new application with single-spa lifecycle exports
2. Add it to the import map in `mfe-angular/src/index.html`
3. Register it in `mfe-angular/src/root-config.ts`

### Changing Ports

Update the port numbers in:
- Each app's `package.json` start script
- Each app's `angular.json` (for Angular apps)
- `mfe-angular/src/index.html` import map

## Troubleshooting

### CORS Errors
Ensure all dev servers have CORS headers enabled in their configs.

### Module Not Found
Verify import map URLs match the actual ports where micro frontends are running.

### Micro Frontend Not Loading
1. Check if the MFE server is running
2. Verify the route matches the `activeWhen` configuration
3. Check browser console for errors

## Technologies

- **Single-SPA 6** - Micro frontend framework
- **SystemJS 6** - Dynamic module loader
- **Angular 20** - Shell and Dashboard MFE
- **React 18** - React MFE
- **Webpack 5** - Module bundler
- **Zone.js** - Angular change detection
