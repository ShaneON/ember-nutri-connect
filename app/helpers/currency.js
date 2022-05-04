import { helper } from '@ember/component/helper';

function currency([amount]) {
  let newAmount = amount.toString();
  const amountSplit = newAmount.split('.');
  if (!newAmount.includes('.')) {
    return `$${newAmount}.00`;
  } else if (amountSplit[1].length < 2) {
    return `$${newAmount}0`;
  }
  return `$${newAmount}`;
}

export default helper(currency);
