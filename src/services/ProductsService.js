import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import Product from '../models/Product';

const PRODUCTS_COLLECTION = 'store_products';

// 🧠 Simple in-memory cache
const productCache = new Map();

export const ProductsService = {
  // 🔹 Add a single product
  async addProduct(productData) {
    try {
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
      const newProduct = { id: docRef.id, ...productData };
      productCache.set(docRef.id, newProduct);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // 🔹 Save multiple products for a store
 async saveAll(products, storeId) {
    try {
      const batch = writeBatch(db);
      const colRef = collection(db, PRODUCTS_COLLECTION);

      products.forEach(product => {
        const id = product.id || `${storeId}-${Date.now()}`;
        const productRef = doc(colRef, id); // use provided ID
        const data = { ...product, storeId };
        batch.set(productRef, data);
        productCache.set(id, { id, ...data });
      });

      await batch.commit();
      return Array.from(productCache.values()).filter(p => p.storeId === storeId);
    } catch (error) {
      console.error('Error saving products in bulk:', error);
      throw error;
    }
  },


  // 🔹 Get products for a specific store (with caching)
  async getProductsByStore(storeId) {
    try {
      const cached = Array.from(productCache.values()).filter(p => p.storeId === storeId);
      if (cached.length > 0) return cached;

      const q = query(collection(db, PRODUCTS_COLLECTION), where('storeId', '==', storeId));
      const snapshot = await getDocs(q);

      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      products.forEach(p => productCache.set(p.id, p));
      const classProducts =products.map(p=> new Product(p.id, p.name,p.waitingTime, p.price, p.image, p.isAvailable,p.description));
      return classProducts.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // 🔹 Get single product by ID
  async getProductById(productId) {
    try {
      if (productCache.has(productId)) return productCache.get(productId);

      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return null;

      const product = { id: docSnap.id, ...docSnap.data() };
      productCache.set(productId, product);
      return product;
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw error;
    }
  },

  // 🔹 Update product
  async updateProduct(productId, updatedData) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      await updateDoc(docRef, updatedData);
      const updated = { id: productId, ...updatedData };
      productCache.set(productId, updated);
      return updated;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // 🔹 Delete product
  async deleteProduct(productId) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      await deleteDoc(docRef);
      productCache.delete(productId);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};
