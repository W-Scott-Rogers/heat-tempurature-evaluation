import {FormControl} from '@angular/forms';
import {TemperatureConverter, TemperatureType} from '../temperature/temperature.cont';

export function inputTemperatureValidator(formControl: FormControl) {
  let invalid: boolean = true;
  let temperatureValue: number;
  let temperatureType: string;
  if (formControl.dirty && formControl.value.split(' ').length > 1) {
    temperatureValue = Number(formControl.value.split(' ')[0]);
    temperatureType = formControl.value.split(' ')[1] in TemperatureType ? TemperatureType[formControl.value.split(' ')[1]] : null;
    if (!isNaN(temperatureValue) && temperatureType && formControl.value.split(' ')[1].length < 2) {
      let newValue = `${temperatureValue} ${temperatureType}`;
      formControl.setValue(newValue);
      invalid = false;
    }
  }
    return invalid ? {'invalidTemperatureInput': {value: `${temperatureValue} ${temperatureType}`}} : null;
}

export function targetUnitValidator(formControl: FormControl) {
  let invalid: boolean = true;
  let temperatureType: string;
  if (formControl.dirty) {
    temperatureType = formControl.value in TemperatureType ? TemperatureType[formControl.value] : null;
    if (temperatureType && formControl.value.length < 2) {
      formControl.setValue(temperatureType);
      invalid = false;
    }
  }
  return invalid ? {'invalidTemperatureUnit': {value: temperatureType}} : null;
}

export function studentResponseValidator(formControl: FormControl) {
  let invalid: boolean = true;
  if (formControl.dirty) {
    invalid = isNaN(Number(formControl.value));

    let formValues = formControl.parent.value;
    if (formControl.parent.controls.inputTemperatureField.valid &&
      formControl.parent.controls.targetUnitField.valid) {
      let inputTemperature = formValues.inputTemperatureField.split(' ');
      let inputTemperatureValue = Number(inputTemperature[0]);
      let inputTemperatureType = TemperatureType[inputTemperature[1]];
      let targetUnit = TemperatureType[formValues.targetUnitField];
      let studentResponse = Number(formControl.value);
      let validOutput = Number(TemperatureConverter[inputTemperatureType][targetUnit](inputTemperatureValue));
      invalid = !(studentResponse.toFixed(1) === validOutput.toFixed(1));
    }
  }

  return invalid ? {'invalidTemperatureInput': {value: formControl.value}} : null;
}
