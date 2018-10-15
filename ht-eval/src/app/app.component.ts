import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  inputTemperatureValidator, studentResponseValidator,
  targetUnitValidator
} from './directives/input-temperature.directive';
import {TemperatureConverter, TemperatureType} from './temperature/temperature.cont';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Heat and Temperature Quiz Evaluation';
  quizForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  /**
   * Setup the form group
   */
  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      inputTemperatureField: [{value: '', disabled: false}, [Validators.required, inputTemperatureValidator]],
      targetUnitField: [{value: '', disabled: false}, [Validators.required, targetUnitValidator]],
      responseField: [{value: '', disabled: false}, [Validators.required, studentResponseValidator]],
      evaluationField: [{value: '', disabled: true}, Validators.nullValidator]
    })
  }

  /**
   * sets the Output field depending on field validation and or answer correctness
   */
  get output(): string {
    let message = this.quizForm.status.toLowerCase();
    if (this.quizForm.valid) {
      let inputTemperature = this.quizForm.controls.inputTemperatureField.value.split(' ');
      let inputTemperatureValue = Number(inputTemperature[0]);
      let inputTemperatureType = TemperatureType[inputTemperature[1]];
      let targetUnit = TemperatureType[this.quizForm.controls.targetUnitField.value];
      let studentResponse = Number(this.quizForm.controls.responseField.value);
      let validOutput = Number(TemperatureConverter[inputTemperatureType][targetUnit](inputTemperatureValue));
      message = studentResponse.toFixed(1) === validOutput.toFixed(1) ? 'correct' : 'incorrect';
    }
    if (!this.quizForm.controls.responseField.valid && this.quizForm.controls.responseField.value && this.quizForm.controls.responseField.value.length > 0) {
      message = 'incorrect';
    }
    return message;
  }
}
