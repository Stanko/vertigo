export function toFixed(number:number, numberOfDecimalSpaces:number = 2):number {
  return parseFloat(number.toFixed(numberOfDecimalSpaces));
}
