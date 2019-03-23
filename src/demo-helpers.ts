export function createOption({
  callback,
  label,
  max,
  min,
  name,
  step = '1',
  value,
}) {
  const spanRange = document.createElement('span');
  spanRange.innerHTML = `(${ min } - ${ max })`;

  const labelName = document.createElement('label');
  labelName.innerHTML = `${ label }: `;
  labelName.appendChild(spanRange);

  const spanValue = document.createElement('span');
  spanValue.innerHTML = value;

  const input = document.createElement('input');
  input.setAttribute('type', 'range');
  input.setAttribute('min', min);
  input.setAttribute('max', max);
  input.setAttribute('value', value);
  input.setAttribute('step', step);
  input.setAttribute('class', `OptionsInput OptionsInput--${ name }`);
  input.addEventListener('change', e => {
    callback(name, e.target.value);
    spanValue.innerHTML = e.target.value;
  });

  const divOption = document.createElement('div');
  divOption.appendChild(labelName);
  divOption.appendChild(input);
  divOption.appendChild(spanValue);

  return divOption;
}
