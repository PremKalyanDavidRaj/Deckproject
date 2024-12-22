import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>Card Deck Manager</span>
    </mat-toolbar>
  `
})
export class ToolbarComponent {}