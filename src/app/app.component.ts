import { Component } from '@angular/core';
import {HeaderComponent} from './layout/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent {}
