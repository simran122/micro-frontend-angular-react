import 'zone.js';
import { NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router, NavigationStart, provideRouter, Routes } from '@angular/router';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { AppComponent } from './app/app.component';
import { EmptyComponent } from './app/empty.component';

const routes: Routes = [
  {
    path: '**',
    component: EmptyComponent,
  },
];

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    return bootstrapApplication(AppComponent, {
      providers: [
        getSingleSpaExtraProviders(),
        provideRouter(routes),
      ],
    });
  },
  template: '<dashboard-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
