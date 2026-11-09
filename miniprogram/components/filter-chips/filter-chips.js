Component({
  properties: {
    items: { type: Array, value: [] },
    activeId: { type: String, value: "all" }
  },
  methods: {
    onTap(e) {
      const id = e.currentTarget.dataset.id;
      if (id === this.data.activeId) return;
      this.triggerEvent("change", { id });
    }
  }
});
