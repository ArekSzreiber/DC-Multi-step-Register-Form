import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {JsonPipe, NgForOf} from '@angular/common';
import {SummaryComponent} from './summary/summary.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ReactiveFormsModule,
    NgForOf,
    JsonPipe,
    FormsModule,
    SummaryComponent
  ],
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .label {
      margin-bottom: 7px;
      margin-left: 5px;
    }

    .heading {
      margin: 0 0 40px 0;
    }

    .button {
      height: 40px;
      border: none;
      border-radius: 20px;
      width: 125px;
      background-image: linear-gradient(to bottom, rgba(#652CD1FF, 0.7), rgba(#652CD1FF, 1.0));
      color: var(--font-color-primary);
      cursor: pointer;
      transition: filter 0.5s ease;
    }

    .disabled {
      filter: grayscale(0.6);
      cursor: default;
    }

    .contact-form,
    .topics-container {
      display: flex;
      flex-direction: column;
    }

    .contact-form {
      row-gap: 35px;
    }

    .topics-container {
      row-gap: 16px;
    }



  `],
  template: `
    <div class="container">
      <form [formGroup]="form">
        @switch (step) {
          @case (1) {
            <app-card>
              <hgroup slot="header">
                <h1 class="heading">Register</h1>
              </hgroup>
              <div slot="content" class="contact-form">
                <fieldset class="fieldset">
                  <label class="label">Name</label>
                  <input
                    class="input tab-text"
                    placeholder="enter your name"
                  >
                </fieldset>
                <fieldset class="fieldset">
                  <label class="label">Email</label>
                  <input
                    class="input tab-text"
                    placeholder="example@gmail.com"
                  >
                </fieldset>
              </div>
              <footer slot="footer">
                <button class="button tab-text" (click)="next()">Continue</button>
              </footer>
            </app-card>

          }
          @case (2) {
            <app-card>
              <hgroup slot="header">
                <h1 class="heading">Which topics you are interested in?</h1>
              </hgroup>

              <div slot="content" formArrayName="topics" class="topics-container">
                <ng-container *ngFor="let topic of topicsArray; let i = index">
                  <fieldset class="toggle-button_fieldset">
                    <label class="toggle-button_label body-text">
                      <input
                        style="display: none"
                        type="checkbox"
                        [formControlName]="i"
                        [value]="topicsArray[i]"
                        [checked]="topicsArray[i]"
                      >
                      {{ topicsArray[i] }}
                    </label>
                  </fieldset>
                </ng-container>
              </div>
              <footer slot="footer">
                <button
                  class="button tab-text"
                  [class.disabled]="form.invalid"
                  (click)="next()"
                >Continue</button>
              </footer>
            </app-card>

          }
          @case (3) {
            <app-card>
              <hgroup slot="header">
                <h1 class="heading">Summary</h1>
              </hgroup>
              <div slot="content">
                <app-summary
                  [name]="name"
                  [email]="email"
                  [topics]="selectedTopics"
                ></app-summary>
              </div>
              <footer slot="footer">
                <button class="button" (click)="submit()">Confirm</button>
              </footer>
            </app-card>

          }
        }
      </form>
    </div>
  `
})
export class StepperComponent {
  step: number = 3;
  form: FormGroup;
  topicsArray: string[] = [
    'Software Development',
    'User Experience',
    'Graphic Design',
  ];

  constructor(
    builder: NonNullableFormBuilder,
  ) {

    this.form = builder.group({
      name: ['Emily Johnson', [Validators.required]],
      email: ['emily@emilyjohnsonstl.com', [Validators.required, Validators.email]],
      topics: builder.array(
        this.topicsArray.map(topic => builder.control(topic.length > 14)),
        [this.atLeastOneSelectedValidator]
      ),
    });
  }

  get topics(): FormArray {
    return this.form.controls['topics'] as FormArray;
  }

  get name(): string {
    return (this.form.controls['name'] as FormControl).value;
  }

  get email(): string {
    return (this.form.controls['email'] as FormControl).value;
  }

  get selectedTopics(): string[] {
    const selected = [];
    for (const [index, value] of this.topics.value.entries()) {
      if (value) {
        selected.push(this.topicsArray[index]);
      }
    }
    return selected;
  }

  next() {
    if (this.form.invalid) {
      return;
    }
    this.step++;
  }

  submit() {
    console.log(this.form.value);
    console.log(this.form.controls['topics'].value);
  }

  private atLeastOneSelectedValidator = (formArray: AbstractControl): { [key: string]: any } | null => {
    const selected = (formArray as FormArray).controls.some(control => control.value === true);
    return selected ? null : {noneSelected: true};
  }
}