import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav>
      <span class="logo">MFE Demo</span>
      <div class="nav-right">
        <img src="https://ui-avatars.com/api/?name=User&background=random&size=40&rounded=true" alt="Profile" class="profile-pic" />
      </div>
    </nav>
  `,
  styles: [`
    nav {
      background: #2a2a2a;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #444;
    }
    
    .logo {
      font-weight: bold;
      font-size: 1.2rem;
      color: #fff;
    }
    
    .nav-right {
      display: flex;
      align-items: center;
    }
    
    .profile-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #555;
    }
  `]
})
export class NavComponent {}
