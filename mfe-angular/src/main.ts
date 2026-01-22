import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { ApplicationRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).then((appRef: ApplicationRef) => {
  appRef.isStable.pipe(first((isStable: boolean) => isStable)).subscribe(() => {
    import('./root-config').then(module => {
      module.initializeRootConfig();
    }).catch(err => {
      console.error('Failed to load root-config:', err);
    });
  });
}).catch(err => console.error('Failed to bootstrap Angular:', err));
