Component({
  properties: {
    productId: { type: String, value: "" },
    name: { type: String, value: "" },
    cover: { type: String, value: "" },
    price: { type: Number, value: 0 },
    compareAtPrice: { type: Number, value: 0 },
    badge: { type: String, value: "" },
    stock: { type: Number, value: 0 },
    category: { type: String, value: "" },
    sku: { type: String, value: "" }
  },
  observers: {
    stock(stock) {
      this.setData({ soldOut: Number(stock) <= 0 });
    }
  },
  data: {
    soldOut: false
  },
  methods: {
    onOpen() {
      this.triggerEvent("open", { id: this.data.productId });
    }
  }
});
