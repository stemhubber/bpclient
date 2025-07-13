export default class Product {
  constructor(id, name, waitingTime, price, image, isAvailable, description) {
    this.id = id || Math.random().toString(36).substring(2,19);
    this.name = name || "";
    this.waitingTime = waitingTime ||"11 minutes";
    this.price = Number(price) || 0;
    this.image= image || "";
    this.isAvailable = isAvailable; 
    this.description = description || "";
  }

  // ✅ Convert Product instance to plain JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      waitingTime: this.waitingTime,
      price: this.price,
      image: this.image,
      isAvailable: this.isAvailable,
      description: this.description
    };
  }

  // ✅ Create a Product instance from plain JSON
  static fromJSON(data) {
    if (!data) throw new Error("Invalid data to classify to Product.");
    return new Product(data.id, data.name, data.waitingTime, data.price, data.image, data.isAvailable, data.description);
  }
}
