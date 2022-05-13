import { helper } from '@ember/component/helper';

function snackNumberPrune([string]) {
  return string.split(' ')[0];
}

export default helper(snackNumberPrune);
