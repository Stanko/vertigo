import { saveAs } from "file-saver";

export function createOption({ callback, label, max, min, name, step = 1, value, helperText = "" }) {
  const focus = document.createElement("span");
  focus.className = "option-focus";

  const labelName = document.createElement("label");
  labelName.className = "option-name";
  labelName.innerHTML = `${label}: `;

  if (helperText) {
    labelName.classList.add("option-name--has-helper-text");
    labelName.title = helperText;
  }

  const spanValue = document.createElement("span");
  spanValue.innerHTML = ` ${value}`;

  const input = document.createElement("input");
  input.setAttribute("type", "range");
  input.setAttribute("min", min);
  input.setAttribute("max", max);
  input.setAttribute("value", value);
  input.setAttribute("step", step.toString());
  input.setAttribute("class", `OptionsInput OptionsInput--${name}`);
  input.addEventListener("change", (e) => {
    const value = (e.target as HTMLInputElement).value;
    callback(name, value);
    spanValue.innerHTML = ` ${value}`;
  });

  const divOption = document.createElement("div");
  divOption.className = "option";
  divOption.appendChild(labelName);
  divOption.appendChild(spanValue);
  divOption.appendChild(input);
  divOption.appendChild(focus);

  return divOption;
}

export function createCheckboxOption({ callback, label, name, value }) {
  const labelName = document.createElement("label");
  labelName.className = "checkbox";
  labelName.innerHTML = ` ${label}`;

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("checked", value);
  input.className = `OptionsInput OptionsInput--${name}`;
  input.addEventListener("change", (e) => {
    callback(name, (e.target as HTMLInputElement).checked);
  });

  const icon = document.createElement("span");
  icon.className = "checkbox-icon";
  icon.innerHTML = `<svg viewBox="0 0 14 14">
<path
fill="none"
stroke="white"
stroke-linejoin="round"
stroke-linecap="round"
stroke-width="2.5" d="M 3 7.5 l 3 3 l 5 -7"
/>
</svg>`;

  const focus = document.createElement("span");
  focus.className = "checkbox-focus";

  labelName.prepend(focus);
  labelName.prepend(icon);
  labelName.prepend(input);

  const divOption = document.createElement("div");
  divOption.appendChild(labelName);

  return divOption;
}

const namingMap = {
  distanceBetweenDots: "dist",
  distanceBetweenLines: "dist",
  startingRadius: "start",
};

export function downloadSVG(instance, type) {
  const options = instance.getOptions();

  console.log(instance.imageURL);

  let name = type;

  Object.keys(options).forEach((key) => {
    const shortOptionName = namingMap[key] || key.substr(0, 3);
    name += `_${shortOptionName}-${options[key]}`;
  });

  name += ".svg";

  saveAs(`data:application/octet-stream;base64,${btoa(instance.svg.outerHTML)}`, name);
}
