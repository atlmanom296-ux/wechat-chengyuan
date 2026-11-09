Component({
  properties: {
    value: { type: Number, value: 1 },
    min: { type: Number, value: 1 },
    max: { type: Number, value: 99 }
  },
  methods: {
    onChange(e) {
      const delta = Number(e.currentTarget.dataset.delta);
      const next = this.data.value + delta;
      if (next < this.data.min || next > this.data.max) return;
      this.triggerEvent("change", { value: next });
    }
  }
});
