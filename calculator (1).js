const keys = [
  {key: "AC", id: "clear", color: "light"},
  {key: "+/-", id: "minus", color: "light"},
  {key: "/", id: "divide", color: "warning"},
  {key: "7", id: "seven", color: "secondary"},
  {key: "8", id: "eight", color: "secondary"},
  {key: "9", id: "nine", color: "secondary"},
  {key: "x", id: "multiply", color: "warning"},
  {key: "4", id: "four", color: "secondary"},
  {key: "5", id: "five", color: "secondary"},
  {key: "6", id: "six", color: "secondary"},
  {key: "-", id: "subtract", color: "warning"},
  {key: "1", id: "one", color: "secondary"},
  {key: "2", id: "two", color: "secondary"},
  {key: "3", id: "three", color: "secondary"},
  {key: "+", id: "add", color: "warning"},
  {key: "0", id: "zero", color: "secondary"},
  {key: ".", id: "decimal", color: "secondary"},
  {key: "=", id: "equals", color: "warning"}
];

// Initial state object.

const initial = {
  keys: keys,          // Every key properties.
  toggle: false,       // Input stored in b (true) or a (false)
  active: null,        // What button should has "active" class.
  operator: '',        // Operator in calculation.
  a: 0,                // First value in calculation.
  b: ''                // Second value in calculation.
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = initial;
    this.handleClick = this.handleClick.bind(this);
  }

  // The below function calculates the operation just
  // if b has a valid value. In other case just return
  // the a value to show it in the display.

  calculate() {
    if (this.state.b !== '') {
      const [a, b] = [Number(this.state.a), Number(this.state.b)];
      switch (this.state.operator) {
        case "add": return this.formatOutput(a + b);
        case "subtract": return this.formatOutput(a - b);
        case "multiply": return this.formatOutput(a * b);
        case "divide": return this.formatOutput(a / b);
      } 
    } else {return this.state.a};
  }

  // Handle the user input, because just 9 digits & 1
  // decimal point are allowed. Aditionally handle the 
  // point like text to show it correctly in display.

  formatInput(txt) {
    if (/\.\d*\.$|[\d+\.?\d*]{10}/.test(txt)) {
      return txt.slice(0,-1)
    };
    if (/^\.$/.test(txt)) {return '0.'}
    if (/\./.test(txt)) {return txt}
    else {return Number(txt);}
  }

  // Detect if the result has more than 9 digits.
  // If it's true, try to shorten to 9 digits if
  // it is possible. In other case shows the result
  // in exponential format.

  formatOutput(result) {
    if (result.toString().length > 9) {
      const num = Number(result.toString().slice(0,9));
      return result - num > 1 ? result.toExponential(5) : num;
    } else {return result;}
  }

  // Remove the active class in buttons and add it
  // to the corresponding (pressed) button.

  componentDidUpdate() {
    let activeId = this.state.active;
    $('.btn').removeClass('active');
    activeId  = activeId ? `#${activeId}` : '';
    $(activeId).addClass('active');
  }

  // Handle the click event.

  handleClick(id) {
    switch (id) {

      // Reset to initial state.
      case "clear": {
        this.setState(initial);
        break;
      }

      // Calculate & reset active and b values.
      case "equals": {
        this.setState({
          active: null,
          a: this.calculate(),
          b: ''
        });
        break;
      }

      // Reverse the displayed number sign.
      case "minus": {
        const obj = this.state.b == '' ?
          {a: this.state.a * (-1)}:
          {b: this.state.b * (-1)};
        this.setState(obj);
        break;
      }

      // Set the operation requested and
      // calculate the queued operation.
      case "add":
      case "subtract":
      case "multiply":
      case "divide": {
        this.setState({
          operator: id,
          active: id,
          a: this.calculate(),
          b: '',
          toggle: true
        });
        break;
      }

      // Store the input in a or b state properties.
      default: {
        const txt = $(`#${id}`).text();
        const obj = this.state.toggle ?
          {b: this.formatInput(this.state.b + txt)}:
          {a: this.formatInput(this.state.a + txt)};
        this.setState(obj);
        break;
      }
    }
  }

  render() {
    const items = this.state.keys.map( (key, index) => {
      return (
        <div key={index}
        className={"p-1 " + (key.id == "zero" || key.id == "clear" ? " col-6" : " col-3")}>
          <button id={key.id}
          className={"w-100 btn btn-lg btn-" + key.color}
          onClick={() => this.handleClick(key.id)}>
            {key.key}
          </button>
        </div>
      );
    });

    return (
      <div id="calculator" className="rounded bg-dark mx-auto">
        <div id="display" className="pt-4 text-right text-white">
          {/* Display b value if it exists or a in other case. */}
          {this.state.b == '' ? this.state.a : this.state.b}
        </div>
        <div id="pad" className="row p-2 text-center">
          {items}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);