import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .card {
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
      width: 455px;
      padding: 40px;
      border-radius: 15px;
    }

    [slot=header] {
      color: var(--font-color-primary);
    }

    [slot=content] {
    }

    [slot=footer] {
      padding: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  `],
  template: `
    <div class="card">
      <ng-content select="[slot=header]"></ng-content>
      <ng-content select="[slot=content]"></ng-content>
      <ng-content select="[slot=footer]"></ng-content>
    </div>
  `
})
export class CardComponent {

}
