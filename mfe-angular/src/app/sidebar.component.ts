import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { NavigationService } from './navigation.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar">
      <a [class.active]="(isHome$ | async)" (click)="navigateTo('/', $event)">Home</a>
      <a [class.active]="(isReact$ | async)" (click)="navigateTo('/react', $event)">React</a>
      <a [class.active]="(isAngular$ | async)" (click)="navigateTo('/dashboard', $event)">Angular</a>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 200px;
      background: #1a1a1a;
      padding: 2rem 1rem;
      min-height: calc(100vh - 60px);
      border-right: 1px solid #444;
    }
    
    .sidebar a {
      display: block;
      color: #ccc;
      text-decoration: none;
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .sidebar a:hover {
      background: #2a2a2a;
      color: #fff;
    }
    
    .sidebar a.active {
      background: #333;
      color: #fff;
      font-weight: bold;
    }
  `]
})
export class SidebarComponent {
  private currentPath$ = this.navigationService.currentPath$;
  
  isHome$ = this.currentPath$.pipe(map(path => path === '/' || path === ''));
  isReact$ = this.currentPath$.pipe(map(path => path === '/react'));
  isAngular$ = this.currentPath$.pipe(map(path => path === '/dashboard'));

  constructor(private navigationService: NavigationService) {}

  navigateTo(path: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.navigationService.navigateTo(path);
  }
}
