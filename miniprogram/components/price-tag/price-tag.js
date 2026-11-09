Component({
  properties: {
    amount: { type: Number, value: 0 },
    compareAt: { type: Number, value: 0 },
    size: { type: String, value: "md" },
    suffix: { type: String, value: "" }
  },
  observers: {
    "amount, compareAt": function (amount, compareAt) {
      this.setData({
        displayAmount: this._fmt(amount),
        displayCompare: compareAt ? this._fmt(compareAt) : ""
      });
    }
  },
  data: {
    displayAmount: "0",
    displayCompare: ""
  },
  methods: {
    _fmt(n) {
      const x = Number(n);
      if (Number.isNaN(x)) return "";
      return Number.isInteger(x) ? String(x) : x.toFixed(2);
    }
  }
});
