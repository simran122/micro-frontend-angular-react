import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { NavigationService } from './navigation.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentPath$ = this.navigationService.currentPath$;
  
  showHomeContent$ = this.currentPath$.pipe(
    map(path => path === '/' || path === '')
  );
  
  showReactApp$ = this.currentPath$.pipe(
    map(path => path === '/react')
  );
  
  showDashboardApp$ = this.currentPath$.pipe(
    map(path => path === '/dashboard')
  );

  constructor(private navigationService: NavigationService) {}
}
