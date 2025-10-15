import assertString from './util/assertString';
import { isNullOrUndefined } from './util/isNullOrUndefined';

const decimal = {
  'en-US': '.',
  ar: '٫',
  'bg-BG': ',',
  'cs-CZ': ',',
  'da-DK': ',',
  'de-DE': ',',
  'el-GR': ',',
  'es-ES': ',',
  'fr-FR': ',',
  'it-IT': ',',
  'hu-HU': ',',
  'nb-NO': ',',
  'nn-NO': ',',
  'nl-NL': ',',
  'pl-PL': ',',
  'pt-PT': ',',
  'ru-RU': ',',
  'sl-SI': ',',
  'sr-RS@latin': ',',
  'sr-RS': ',',
  'sv-SE': ',',
  'tr-TR': ',',
  'uk-UA': ',',
  'vi-VN': ',',
};

export default function isFloat(str, options) {
  assertString(str);
  options = options || {};
  options.locale = options.locale || 'en-US';

  if (!Object.keys(decimal).includes(options.locale)) {
    throw new Error(`${options.locale} is not a valid locale option for isFloat`);
  }

  // The (?=.*\d) lookahead ensures there is at least one digit.
  const float = new RegExp(`^(?=.*\\d)(?:[-+])?(?:[0-9]+)?(?:${decimal[options.locale]}[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$`);

  if (str === '' || str === '.' || str === ',' || str === '-' || str === '+') {
    return false;
  }

  const value = str.replace(',', '.');
  if (!float.test(value)) {
    return false;
  }

  const parsedValue = parseFloat(value);

  return (
    (isNullOrUndefined(options.min) || parsedValue >= options.min) &&
    (isNullOrUndefined(options.max) || parsedValue <= options.max) &&
    (isNullOrUndefined(options.lt) || parsedValue < options.lt) &&
    (isNullOrUndefined(options.gt) || parsedValue > options.gt)
  );
}

export const locales = Object.keys(decimal);
