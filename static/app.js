const compareNameAsc = (a, b) => a.name.localeCompare(b.name);
const compareNameDesc = (a, b) => b.name.localeCompare(a.name);
const compareAmountAsc = (a, b) => a.amount - b.amount;
const compareAmountDesc = (a, b) => b.amount - a.amount;

const app = {
  $: {
    root: document.querySelector('#root'),
  },
  async init() {
    app.names = await app.fetchNames();
    app.comparator = compareNameAsc;
    app.render();
  },
  render() {
    app.names.sort(app.comparator);

    const rows = app.names
      .map(({name, amount}) => `<tr><td>${name}</td><td>${amount}</td></tr>`)
      .join('');

    const totalAmount = app.names.reduce((prev, curr) => prev + curr.amount, 0);

    // @TODO: Sanitize...
    app.$.root.innerHTML = `
    <table>
      <thead>
        <tr>
          <th id='name'>Name</th>
          <th id='amount'>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr>
          <td>Total</td>
          <td>${totalAmount}</td>
        </tr>
      </tbody>
    </table>`;

    const name = app.$.root.querySelector('#name');
    if (app.comparator === compareNameDesc) name.classList.add('sort-desc');
    if (app.comparator === compareNameAsc) name.classList.add('sort-asc');
    app.addEventHandler(name, 'click', () => app.comparator = name.classList.contains('sort-asc') ? compareNameDesc : compareNameAsc);

    const amount = app.$.root.querySelector('#amount');
    if (app.comparator === compareAmountDesc) amount.classList.add('sort-desc');
    if (app.comparator === compareAmountAsc) amount.classList.add('sort-asc');
    app.addEventHandler(amount, 'click', () => app.comparator = amount.classList.contains('sort-asc') ? compareAmountDesc : compareAmountAsc);
  },
  addEventHandler(element, eventName, handler) {
    element.addEventListener(eventName, event => {
      handler(event);
      app.render();
    });
  },
  async fetchNames() {
    const response = await fetch('/names.json');
    const data = await response.json();
    return data.names || [];
  }
};

try {
  app.init();
} catch (err) {
  console.error(err);
}
