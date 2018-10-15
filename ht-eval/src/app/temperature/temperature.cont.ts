/**
 * A simple enum to host known types and to assist correct spelling
 */
export enum TemperatureType {
  Kelvin = 'Kelvin',
  Celsius = 'Celsius',
  Fahrenheit = 'Fahrenheit',
  Rankine = 'Rankine',
  K = 'Kelvin',
  C = 'Celsius',
  F = 'Fahrenheit',
  R = 'Rankine'
}

/**
 * functions to use for conversion of one unit type to another
 */
export const TemperatureConverter = {
  Kelvin : {
    Kelvin : function (value) {
      return Number(value);
    },
    Celsius : function (value) {
      return Number(value) - 273.15;
    },
    Fahrenheit : function (value) {
      return Number(value) * (9/5) - 459.67;
    },
    Rankine :  function (value) {
      return Number(value) * (9/5);
    }
  },
  Celsius : {
    Kelvin : function (value) {
      return Number(value) + 273.15;
    },
    Celsius : function (value) {
      return Number(value);
    },
    Fahrenheit : function (value) {
      return Number(value) * (9/5) + 32;
    },
    Rankine :  function (value) {
      return (Number(value) + 273.15) * (9/5);
    }
  },
  Fahrenheit : {
    Kelvin : function (value) {
      return (Number(value) + 459.67) * (5/9);
    },
    Celsius : function (value) {
      return (Number(value) - 32) * (5/9) ;
    },
    Fahrenheit : function (value) {
      return Number(value);
    },
    Rankine :  function (value) {
      return Number(value) + 459.67;
    }
  },
  Rankine : {
    Kelvin : function (value) {
      return Number(value) * (5/9);
    },
    Celsius : function (value) {
      return (Number(value) - 491.67) * (5/9);
    },
    Fahrenheit : function (value) {
      return Number(value) - 459.67;
    },
    Rankine :  function (value) {
      return Number(value);
    }
  }
};
