import {Component} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {FormGroup, FormArray, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CardComponent,
    ReactiveFormsModule,
    NgForOf,
    JsonPipe
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
              <div slot="content">
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
              <div slot="content" formArrayName="topics">

                <ng-container *ngFor="let topic of topics.controls; let i = index">
                  <fieldset class="toggle-button_fieldset">
                    <label class="toggle-button_label body-text">
                    <input
                      style="display: none"
                      type="checkbox"
                      [formControlName]="i"
                      [value]="topicsArray[i]"
                      [checked]="topicsArray[i]"
                    >
                      {{topicsArray[i]}}
                    </label>
                  </fieldset>
                </ng-container>
              </div>
              <footer slot="footer">
                <button class="button tab-text" (click)="next()">Continue</button>
              </footer>
            </app-card>

          }
          @case (3) {
            <app-card>
              <hgroup slot="header">
                <h1 class="heading">Summary</h1>
              </hgroup>
              <div slot="content">

              </div>
              <footer slot="footer">
                <button class="button">Confirm</button>
              </footer>
            </app-card>

          }
        }
      </form>
    </div>
  `
})
export class StepperComponent {
  step: number = 2;
  form: FormGroup;
  get topics(): FormArray {
    return this.form.controls['topics'] as FormArray;
  }

  topicsArray: string[] = [
    'Software Development',
    'User Experience',
    'Graphic Design',
  ];


  constructor(
    private builder: NonNullableFormBuilder,
  ) {

    this.form = builder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      topics: builder.array(
        this.topicsArray.map(topic => builder.control(false))
      ),
    });
    console.log(this.form.value);
  }

  next() {
    console.log(this.form.value);
    console.log(this.form.controls['topics'].value);
    // this.step++;
  }

}
