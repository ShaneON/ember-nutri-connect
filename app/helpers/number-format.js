import { helper } from '@ember/component/helper';

function format([number]) {
  return (Math.round(number * 100) / 100).toFixed(2);
}

export default helper(format);
