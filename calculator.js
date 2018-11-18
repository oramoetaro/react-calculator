var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keys = [{ key: "AC", id: "clear", color: "light" }, { key: "+/-", id: "minus", color: "light" }, { key: "/", id: "divide", color: "warning" }, { key: "7", id: "seven", color: "secondary" }, { key: "8", id: "eight", color: "secondary" }, { key: "9", id: "nine", color: "secondary" }, { key: "x", id: "multiply", color: "warning" }, { key: "4", id: "four", color: "secondary" }, { key: "5", id: "five", color: "secondary" }, { key: "6", id: "six", color: "secondary" }, { key: "-", id: "subtract", color: "warning" }, { key: "1", id: "one", color: "secondary" }, { key: "2", id: "two", color: "secondary" }, { key: "3", id: "three", color: "secondary" }, { key: "+", id: "add", color: "warning" }, { key: "0", id: "zero", color: "secondary" }, { key: ".", id: "decimal", color: "secondary" }, { key: "=", id: "equals", color: "warning" }];

// Initial state object.

var initial = {
  keys: keys, // Every key properties.
  toggle: false, // Input stored in b (true) or a (false)
  active: null, // What button should has "active" class.
  operator: '', // Operator in calculation.
  a: 0, // First value in calculation.
  b: '' // Second value in calculation.
};

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this.state = initial;
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  // The below function calculates the operation just
  // if b has a valid value. In other case just return
  // the a value to show it in the display.

  _createClass(Calculator, [{
    key: "calculate",
    value: function calculate() {
      if (this.state.b !== '') {
        var _ref = [Number(this.state.a), Number(this.state.b)],
            a = _ref[0],
            b = _ref[1];

        switch (this.state.operator) {
          case "add":
            return this.formatOutput(a + b);
          case "subtract":
            return this.formatOutput(a - b);
          case "multiply":
            return this.formatOutput(a * b);
          case "divide":
            return this.formatOutput(a / b);
        }
      } else {
        return this.state.a;
      };
    }

    // Handle the user input, because just 9 digits & 1
    // decimal point are allowed. Aditionally handle the 
    // point like text to show it correctly in display.

  }, {
    key: "formatInput",
    value: function formatInput(txt) {
      if (/\.\d*\.$|[\d+\.?\d*]{10}/.test(txt)) {
        return txt.slice(0, -1);
      };
      if (/^\.$/.test(txt)) {
        return '0.';
      }
      if (/\./.test(txt)) {
        return txt;
      } else {
        return Number(txt);
      }
    }

    // Detect if the result has more than 9 digits.
    // If it's true, try to shorten to 9 digits if
    // it is possible. In other case shows the result
    // in exponential format.

  }, {
    key: "formatOutput",
    value: function formatOutput(result) {
      if (result.toString().length > 9) {
        var num = Number(result.toString().slice(0, 9));
        return result - num > 1 ? result.toExponential(5) : num;
      } else {
        return result;
      }
    }

    // Remove the active class in buttons and add it
    // to the corresponding (pressed) button.

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var activeId = this.state.active;
      $('.btn').removeClass('active');
      activeId = activeId ? "#" + activeId : '';
      $(activeId).addClass('active');
    }

    // Handle the click event.

  }, {
    key: "handleClick",
    value: function handleClick(id) {
      switch (id) {

        // Reset to initial state.
        case "clear":
          {
            this.setState(initial);
            break;
          }

        // Calculate & reset active and b values.
        case "equals":
          {
            this.setState({
              active: null,
              a: this.calculate(),
              b: ''
            });
            break;
          }

        // Reverse the displayed number sign.
        case "minus":
          {
            var obj = this.state.b == '' ? { a: this.state.a * -1 } : { b: this.state.b * -1 };
            this.setState(obj);
            break;
          }

        // Set the operation requested and
        // calculate the queued operation.
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
          {
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
        default:
          {
            var txt = $("#" + id).text();
            var _obj = this.state.toggle ? { b: this.formatInput(this.state.b + txt) } : { a: this.formatInput(this.state.a + txt) };
            this.setState(_obj);
            break;
          }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var items = this.state.keys.map(function (key, index) {
        return React.createElement(
          "div",
          { key: index,
            className: "p-1 " + (key.id == "zero" || key.id == "clear" ? " col-6" : " col-3") },
          React.createElement(
            "button",
            { id: key.id,
              className: "w-100 btn btn-lg btn-" + key.color,
              onClick: function onClick() {
                return _this2.handleClick(key.id);
              } },
            key.key
          )
        );
      });

      return React.createElement(
        "div",
        { id: "calculator", className: "rounded bg-dark mx-auto" },
        React.createElement(
          "div",
          { id: "display", className: "pt-4 text-right text-white" },
          this.state.b == '' ? this.state.a : this.state.b
        ),
        React.createElement(
          "div",
          { id: "pad", className: "row p-2 text-center" },
          items
        )
      );
    }
  }]);

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));