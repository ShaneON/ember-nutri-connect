import { helper } from '@ember/component/helper';

function truncate([str, num]) {
  return str.length > num ? str.substring(0, num-1) + '...' : str;
}

export default helper(truncate);
