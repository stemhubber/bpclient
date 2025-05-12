import { db } from "./firebase"; // your firebase config
import { collection, addDoc, getDocs, updateDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import Order from "../models/Order";
import { formatTimestamp } from "../utils/utils";

const ordersCollection = collection(db, "orders");

class OrderService {

  static listenToOrders(callback) {
    try {
      return onSnapshot(ordersCollection, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({
          ...doc.data(),
          firestoreId: doc.id
        }));
        callback(orders);
      });
    } catch (error) {
      console.error("Failed to listen to orders:", error);
    }
  }
  

  static async saveOrder(order) {
    try {
      console.log(order);
      
      await addDoc(ordersCollection, order.toJSON());
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  }

  static async createOrders(cartProducts, payload) {
    const createdOrders = [];

    try {
      const orderNum = Date.now().toString()+"-"+payload.orderNum;
      for (const product of cartProducts) {
        const newOrder = new Order(orderNum, product.toJSON(), null,null,payload.user); // using timestamp for id
        await this.saveOrder(newOrder);
        createdOrders.push(newOrder);
      }
    } catch (error) {
      console.error("Failed to create orders:", error);
    }

    return createdOrders;
  }

  static async updateOrderStatus(firestoreId, newStatus) {
    try {
      console.log("Updating ", firestoreId, "to", newStatus);
      const formatDate = formatTimestamp(new Date(), true);
      const orderRef = doc(db, "orders", firestoreId);
      await updateDoc(orderRef, { status: newStatus, lastUpdated: formatDate });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  }

  // Optional: load orders by userId if you add auth later
  static async loadOrdersByStatus(status) {
    try {
      const q = query(ordersCollection, where("status", "==", status));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        firestoreId: doc.id
      }));
    } catch (error) {
      console.error("Failed to load orders by status:", error);
      return [];
    }
  }
}

export default OrderService;
