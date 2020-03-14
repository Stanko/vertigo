import { saveAs } from 'file-saver';

export function createOption({
  callback,
  label,
  max,
  min,
  name,
  step = 1,
  value,
}) {
  const spanRange = document.createElement('span');
  spanRange.innerHTML = `(${ min } - ${ max })`;

  const labelName = document.createElement('label');
  labelName.innerHTML = `${ label }: `;
  labelName.appendChild(spanRange);

  const spanValue = document.createElement('span');
  spanValue.innerHTML = ` ${ value }`;

  const input = document.createElement('input');
  input.setAttribute('type', 'range');
  input.setAttribute('min', min);
  input.setAttribute('max', max);
  input.setAttribute('value', value);
  input.setAttribute('step', step.toString());
  input.setAttribute('class', `OptionsInput OptionsInput--${ name }`);
  input.addEventListener('change', e => {
    const value = (e.target as HTMLInputElement).value;
    callback(name, value);
    spanValue.innerHTML = ` ${ value }`;
  });

  const divOption = document.createElement('div');
  divOption.appendChild(labelName);
  divOption.appendChild(input);
  divOption.appendChild(spanValue);

  return divOption;
}

export function createCheckboxOption({
  callback,
  label,
  name,
  value,
}) {
  const labelName = document.createElement('label');
  labelName.innerHTML = ` ${ label }`;

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('checked', value);
  input.setAttribute('class', `OptionsInput OptionsInput--${ name }`);
  input.addEventListener('change', e => {
    callback(name, (e.target as HTMLInputElement).checked);
  });

  labelName.prepend(input);

  const divOption = document.createElement('div');
  divOption.appendChild(labelName);


  return divOption;
}

const namingMap = {
  distanceBetweenDots: 'dist',
  distanceBetweenLines: 'dist',
  startingRadius: 'start',
};

export function downloadSVG (instance, type) {
  const options = instance.getOptions();

  console.log(instance.imageURL)

  let name = type;

  Object.keys(options).forEach(key => {
    const shortOptionName = namingMap[key] || key.substr(0, 3);
    name += `_${ shortOptionName }-${ options[key] }`;
  });

  name += '.svg';

  saveAs(`data:application/octet-stream;base64,${ btoa(instance.svg.outerHTML) }`, name);
}
