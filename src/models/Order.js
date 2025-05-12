export default class Order {
  constructor(id, product, status = "Pending", firestoreId, user) {
    this.id = id || Math.random().toString(36).substring(2,19);
    this.firestoreId = firestoreId || JSON.stringify(id);
    this.product = product || "";
    this.status = status || "Pending";
    this.user = user;
  }

  // ✅ Convert Order instance to a plain JSON object
  toJSON() {
    return {
      id: this.id,
      product: this.product,
      status: this.status,
      firestoreId: this.firestoreId || JSON.stringify(this.id),
      user: this.user
    };
  }

  // ✅ Create an Order instance from a plain object
  static fromJSON(data) {
    if (!data) throw new Error("Invalid data to classify to Order.");
    return new Order(data.id, data.product, data.status, data.firestoreId, data.user);
  }
}
