/// <reference path="./systemjs.d.ts" />
import { registerApplication, start } from "single-spa";


function createDomElementGetter(elementId: string) {
  return () => {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Container element with id "${elementId}" not found`);
    }
    return element;
  };
}


function registerApp(name: string, importPath: string, activeWhen: string[], elementId: string) {
  registerApplication({
    name,
    app: () => System.import(importPath),
    activeWhen,
    customProps: {
      domElementGetter: createDomElementGetter(elementId)
    }
  });
}

export function initializeRootConfig() {
  try {
    if (typeof System === 'undefined' || typeof System.import !== 'function') {
      console.error('SystemJS is not available');
      return;
    }

    registerApp(
      "mfe-react-app",
      "@mfe/react-app",
      ["/react"],
      "single-spa-application:mfe-react-app"
    );

    registerApp(
      "mfe-angular-app-2",
      "@mfe/angular-app-2",
      ["/dashboard"],
      "single-spa-application:mfe-angular-app-2"
    );

    start({
      urlRerouteOnly: true,
    });
  } catch (error) {
    console.error('Error initializing root-config:', error);
  }
}
