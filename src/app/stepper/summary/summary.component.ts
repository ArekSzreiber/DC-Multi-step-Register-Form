import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`

    .summary-item {
      line-height: 24px;

      &:last-of-type {
        margin-top: 18px;
      }
    }

    .field-name {
      color: var(--font-color-secondary)
    }

    .field-value {
      color: var(--font-color-primary)
    }


    .topics-list {
      list-style: none;
      padding-left: 10px;
      margin: 0;
    }

    .topics-list-element:before {
      color: var(--font-color-primary);
      line-height: 24px;

    }

    .bullet {
      color: var(--font-color-primary);
      padding-right: 5px;
    }

  `],
  template: `
    <div class="summary-item body-text">
      <span class="field-name">Name: </span>
      <span class="field-value">{{ name }}</span>
    </div>
    <div class="summary-item body-text">
      <span class="field-name">Email: </span>
      <span class="field-value">{{ email }}</span>
    </div>
    <div class="summary-item body-text">
      <span class="field-name">Topics:</span>
      <ul class="topics-list">
        @for (topic of topics; track topic) {
          <li class="topics-list-element body-text">
            <span class="bullet">&bull;</span>
            <span class="field-value">{{ topic }}</span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class SummaryComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() topics: string[] = [];
}
