function compareNum(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

const compareNameAsc = (a, b) => a.name.localeCompare(b.name);
const compareNameDesc = (a, b) => b.name.localeCompare(a.name);
const compareAmountAsc = (a, b) => compareNum(a.amount, b.amount);
const compareAmountDesc = (a, b) => compareNum(b.amount, a.amount);

window.onload = function() {
  init();
};

function init() {
  fetch('/names.json')
    .then(response => response.json())
    .then(onNamesLoaded)
    .catch(onError);
}

function onError(err) {
  console.log(err)
}

function destroyTable() {
  const table = document.getElementById("table");
  if (table) {
    table.parentNode.removeChild(table);
  }
}

function createTable(names, root, compareFunc) {
  names.sort(compareFunc);

  function createElement(name, text) {
    const element = document.createElement(name);
    element.innerHTML = text;
    return element;
  }

  const table = document.createElement("table");
  root.appendChild(table).id = "table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const theadName = createElement("th", "Name");
  theadName.onclick = () => {
    let compareFunc = theadName.classList.contains("sort-asc") ? compareNameDesc : compareNameAsc;
    destroyTable();
    createTable(names, document.getElementById("root"), compareFunc);
  };
  headRow.appendChild(theadName);
  if (compareFunc === compareNameDesc) theadName.classList.add("sort-desc");
  if (compareFunc === compareNameAsc) theadName.classList.add("sort-asc");

  const theadAmount = createElement("th", "Amount");
  theadAmount.onclick = () => {
    let compareFunc = theadAmount.classList.contains("sort-asc") ? compareAmountDesc : compareAmountAsc;
    destroyTable();
    createTable(names, document.getElementById("root"), compareFunc);
  };
  headRow.appendChild(theadAmount);
  if (compareFunc === compareAmountDesc) theadAmount.classList.add("sort-desc");
  if (compareFunc === compareAmountAsc) theadAmount.classList.add("sort-asc");

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  let total = 0;
  names.forEach(nameAndAmount => {
    const row = document.createElement("tr");
    row.appendChild(createElement("td", nameAndAmount.name));
    row.appendChild(createElement("td", nameAndAmount.amount));
    tbody.appendChild(row);
    total += nameAndAmount.amount;
  });

  const totalRow = document.createElement("tr");
  totalRow.appendChild(createElement("td", "Total"));
  totalRow.appendChild(createElement("td", total));
  tbody.appendChild(totalRow);

  table.appendChild(tbody);
}

function onNamesLoaded(data) {
  if (!data.hasOwnProperty("names")) {
    return
  }

  const names = data.names;
  const root = document.getElementById("root");
  createTable(names, root, compareNameAsc);
}
