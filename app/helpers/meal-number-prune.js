import { helper } from '@ember/component/helper';

function mealNumberPrune([string]) {
  return string.split(' ')[0];
}

export default helper(mealNumberPrune);
