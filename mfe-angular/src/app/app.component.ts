import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, SidebarComponent],
  template: `
    <app-nav></app-nav>
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      <div class="content-area">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .main-layout {
      display: flex;
      min-height: calc(100vh - 60px);
    }
    
    .content-area {
      flex: 1;
      padding: 2rem;
    }
  `]
})
export class AppComponent {}
