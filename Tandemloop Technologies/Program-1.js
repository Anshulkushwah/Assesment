class Calculator {
  constructor(a, b, operation) {
    this.a = a;
    this.b = b;
    this.operation = operation;
  }

  calculate() {
    switch (this.operation.toLowerCase()) {
      case "add":
        return this.a + this.b;
      case "subtract":
        return this.a - this.b;
      case "multiply":
        return this.a * this.b;
      case "divide":
        if (this.b === 0) {
          return "Error: Division by zero";
        }
        return this.a / this.b;
      default:
        return "Error: Invalid operation";
    }
  }
}

const calc1 = new Calculator(10.5, 5.5, "add");
console.log("Result:", calc1.calculate());

const calc2 = new Calculator(20, 4, "divide");
console.log("Result:", calc2.calculate());
