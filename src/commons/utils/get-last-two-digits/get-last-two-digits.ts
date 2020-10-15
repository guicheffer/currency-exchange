import CONFIGS from "../../../app/configs";

const getLastTwoDigits = (number: number) => {
  console.log(number);
  const fullNumber = number.toFixed(CONFIGS.APP.TWO_LAST_DIGITS_FRACTION);
  const fullNumberLength = fullNumber.toString().length;
  return fullNumber.substring(fullNumberLength - 2);
}

export default getLastTwoDigits;
