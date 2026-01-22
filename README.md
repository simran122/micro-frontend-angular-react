# Micro Frontend Demo with Single-SPA

A micro frontend architecture demo using **Single-SPA** with Angular as the root config shell, and React + Angular as micro frontends.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Root Config (Shell)                       │
│                    Port: 9000                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Navigation | Import Maps | Application Registration    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                  │
│           ┌───────────────┴───────────────┐                  │
│           ▼                               ▼                  │
│  ┌─────────────────┐           ┌─────────────────┐          │
│  │  React MFE      │           │  Angular MFE    │          │
│  │  Port: 9001     │           │  Port: 9002     │          │
│  │  Route: /react  │           │  Route: /angular│          │
│  └─────────────────┘           └─────────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

## Project Structure

```
micro-frontend-demo/
├── root-config/          # Shell application (orchestrator)
│   ├── src/
│   │   ├── index.html    # Main HTML with import maps
│   │   └── index.js      # Single-SPA registration
│   └── package.json
│
├── mfe-react/            # React micro frontend
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Scoped styles
│   │   └── mfe-react.js  # Single-SPA lifecycle exports
│   └── package.json
│
├── mfe-angular/          # Angular micro frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.module.ts
│   │   │   └── app.component.ts
│   │   ├── main.single-spa.ts
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

Install dependencies for all applications:

```bash
# Install root-config dependencies
cd root-config
npm install

# Install React MFE dependencies
cd ../mfe-react
npm install

# Install Angular MFE dependencies
cd ../mfe-angular
npm install
```

### Running the Applications

You need to run all three applications simultaneously in separate terminals:

**Terminal 1 - Root Config (Shell):**
```bash
cd root-config
npm start
# Runs on http://localhost:9000
```

**Terminal 2 - React Micro Frontend:**
```bash
cd mfe-react
npm start
# Runs on http://localhost:9001
```

**Terminal 3 - Angular Micro Frontend:**
```bash
cd mfe-angular
npm start
# Runs on http://localhost:9002
```

### Accessing the Application

Open your browser and navigate to:
- **http://localhost:9000** - Main application
- **http://localhost:9000/react** - React micro frontend
- **http://localhost:9000/angular** - Angular micro frontend

## How It Works

### Root Config (Shell)

The root config is the entry point that:
1. Loads SystemJS for dynamic module loading
2. Defines import maps for shared dependencies and micro frontends
3. Registers micro frontends with their activation routes
4. Manages navigation and layout

### Micro Frontends

Each micro frontend:
1. Exports Single-SPA lifecycle methods (bootstrap, mount, unmount)
2. Runs independently on its own port
3. Is loaded dynamically when its route is activated
4. Can use its own framework and dependencies

### Shared Dependencies

React and Single-SPA are shared via CDN to avoid bundling them in each micro frontend:
- `single-spa` - Core library
- `react` and `react-dom` - Shared for React MFE

## Key Concepts

### Single-SPA Lifecycle

Each micro frontend must export these functions:

```javascript
export function bootstrap(props) {
  // One-time initialization
}

export function mount(props) {
  // Render the application
}

export function unmount(props) {
  // Cleanup when navigating away
}
```

### Route-Based Activation

Micro frontends are activated based on URL patterns:

```javascript
registerApplication({
  name: 'mfe-react-app',
  app: () => System.import('@mfe/react-app'),
  activeWhen: ['/react'],  // Activates for /react/* routes
});
```

## Customization

### Adding a New Micro Frontend

1. Create a new directory with Single-SPA lifecycle exports
2. Add it to the import map in `root-config/src/index.html`
3. Register it in `root-config/src/index.js`

### Changing Ports

Update the port numbers in:
- Each app's `package.json` start script
- `root-config/src/index.html` import map
- `root-config/webpack.config.js` (for root-config itself)

## Troubleshooting

### CORS Errors
Make sure all dev servers have CORS headers enabled. Check webpack config:
```javascript
devServer: {
  headers: { "Access-Control-Allow-Origin": "*" }
}
```

### Module Not Found
Verify the import map URLs match the actual ports where micro frontends are running.

### Angular Not Loading
Ensure Zone.js is properly configured and the Angular build output is set correctly.

## Technologies Used

- **Single-SPA** - Micro frontend framework
- **SystemJS** - Dynamic module loader
- **React 18** - React micro frontend
- **Angular 18** - Angular micro frontend
- **Webpack 5** - Module bundler
