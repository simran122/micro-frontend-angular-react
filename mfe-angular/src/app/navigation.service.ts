import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private pathSubject = new BehaviorSubject<string>(window.location.pathname);
  public currentPath$: Observable<string> = this.pathSubject.asObservable();

  constructor(private router: Router, private ngZone: NgZone) {
    this.setupRouterListener();
    this.setupPopstateListener();
  }

  get currentPath(): string {
    return this.pathSubject.value;
  }


  private setupRouterListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pathSubject.next(event.url);
      });
  }

 
  private setupPopstateListener(): void {
    window.addEventListener('popstate', () => {
      this.ngZone.run(() => {
        const currentUrl = window.location.pathname;
        this.pathSubject.next(currentUrl);
        if (this.router.url !== currentUrl) {
          this.router.navigateByUrl(currentUrl, { skipLocationChange: true });
        }
      });
    });
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
