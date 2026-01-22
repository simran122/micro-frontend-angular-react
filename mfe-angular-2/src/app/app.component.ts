import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'dashboard-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-app">
      <h1>This is Angular page</h1>
    </div>
  `,
})
export class AppComponent {
  stats = [
    { icon: '💰', value: '$12,450', label: 'Revenue' },
    { icon: '📦', value: '284', label: 'Orders' },
    { icon: '👥', value: '1,420', label: 'Customers' },
    { icon: '📈', value: '+24%', label: 'Growth' },
  ];

  products: Product[] = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 149 },
    { id: 2, name: 'Smart Watch Pro', category: 'Wearables', price: 299 },
    { id: 3, name: 'Laptop Stand', category: 'Accessories', price: 79 },
    { id: 4, name: 'USB-C Hub', category: 'Electronics', price: 59 },
  ];

  activities: Activity[] = [
    { id: 1, type: 'sale', message: 'New sale completed - $299', time: '2 min ago', icon: '💵' },
    { id: 2, type: 'order', message: 'Order #1234 shipped', time: '15 min ago', icon: '📦' },
    { id: 3, type: 'user', message: 'New customer registered', time: '1 hour ago', icon: '👤' },
    { id: 4, type: 'sale', message: 'New sale completed - $149', time: '2 hours ago', icon: '💵' },
  ];
}
