import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [],
  styles: [`

    $size: 5px;


    :host {
      align-content: center;
      align-items: center;
      column-gap: 30px;
      display: flex;
      justify-content: center;
      margin-top: 12px;
    }

    .bullet {
      width: 2 * $size;
      height: 2 * $size;
      border: none;
      border-radius: $size;
      background: var(--border-color);
    }

    .filled {
      background: var(--button-background-primary);
    }

    .active {
      box-shadow: 0 0 0 $size rgba(#652CD1, 0.5);
    }

    .bullets-container {
      display: inline-flex;
      column-gap: $size;
    }

    .bullet-container {
      padding: $size;
      &:has(.filled) {
        cursor: pointer;
      }
    }

    .small-text {
      color: var(--border-color);
    }

    .flex-child {
      flex: 85px 0 0;
    }

  `],
  template: `
    <span class="flex-child small-text">Step {{ current }} out of {{ steps }}</span>
    <div class="bullets-container flex-child">
      @for (step of stepsArray; track step) {
        <div class="bullet-container" (click)="selected.emit(step)">
          <div
            class="bullet"
            [class.filled]="step <= current"
            [class.active]="step === current"
          ></div>
        </div>
      }
    </div>
    <div class="flex-child"></div>
  `
})
export class StepIndicatorComponent {
  get steps(): number {
    return this._steps;
  }
  stepsArray: number[] = [];

  @Input()  set steps(value: number) {
    this._steps = value;
    this.stepsArray = Array.from({length: value}, (_, index) => index + 1);
  }
  @Input() current: number = 1;
  private _steps: number = 2;
  @Output() selected = new EventEmitter<number>();
}
