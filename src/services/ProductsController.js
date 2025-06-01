import Product from '../models/Product'; // Assuming Product class is imported here
import { productsData, morneProducts } from '../data/products';

  
  export default class ProductController {
    constructor(storeId) {

      if (storeId === 2){
        this.products = morneProducts.map((pd)=> new Product(pd.id, pd.name, pd.waitingTime, pd.price, pd.image, pd.isAvailable, pd.description));
        return;
      }
      // Initialize with menu products data
      this.products = productsData.menu.flatMap((pd) => [
        new Product(pd.id, pd.name + " (Large)", pd.waitingTime, (10+pd.small)*2, pd.image, pd.isAvailable, pd.description),
        new Product(pd.id+(productsData?.menu?.length+1), pd.name + " (Small)", pd.waitingTime, pd.small+10, pd.image, pd.isAvailable, pd.description)
      ]);
      this.extraToppings = productsData.extra_toppings;
      this.extraPackages = productsData.extra_packages.map((pd)=> new Product(pd.id, pd.name, pd.waitingTime, pd.price, pd.image, pd.isAvailable, pd.description));
    }
  
    // Create a new product
    create(productData) {
      const newProduct = new Product(
        this.products.length + 1, // Assign a unique ID based on the current products
        productData.name,
        productData.waitingTime,
        productData.price,
        productData.img,
        productData.isAvailable
      );
      this.products.push(newProduct);
      return newProduct;
    }
  
    // Read all products
    getAll() {
      return this.products.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    // Update an existing product
    update(id, updatedData) {
      const productIndex = this.products.findIndex((product) => product.id === id);
      if (productIndex === -1) throw new Error('Product not found');
      
      const updatedProduct = {
        ...this.products[productIndex],
        ...updatedData,
      };
      
      this.products[productIndex] = updatedProduct;
      return updatedProduct;
    }
  
    // Delete a product
    delete(id) {
      const productIndex = this.products.findIndex((product) => product.id === id);
      if (productIndex === -1) throw new Error('Product not found');
      
      this.products.splice(productIndex, 1);
    }
  
    // Get extra toppings
    getExtraToppings() {
      return this.extraToppings;
    }
  
    // Get extra packages
    getExtraPackages() {
      return this.extraPackages;
    }
  
    // Save products to localStorage (optional if you want persistence)
    saveToLocalStorage() {
      sessionStorage.setItem('products', JSON.stringify(this.products));
    }
  }
  
//   export default function HomePage() {
//     const [products, setProducts] = useState(productController.getAll()); // Get products from controller initially
  
//     // Example function to add a product
//     const addProduct = (productData) => {
//       const newProduct = productController.create(productData);
//       setProducts((prevProducts) => [...prevProducts, newProduct]);
//     };
  
//     // Example function to update a product
//     const updateProduct = (id, updatedData) => {
//       const updatedProduct = productController.update(id, updatedData);
//       setProducts((prevProducts) =>
//         prevProducts.map((product) => (product.id === id ? updatedProduct : product))
//       );
//     };
  
//     // Example function to delete a product
//     const deleteProduct = (id) => {
//       productController.delete(id);
//       setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//     };
  
//     return (
//       <div>
//         <h1>Product List</h1>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               <img src={product.img} alt={product.name} width={50} />
//               <h2>{product.name}</h2>
//               <p>Waiting Time: {product.waitingTime}</p>
//               <p>Price: R{product.price}</p>
//               <p>Status: {product.isAvailable ? 'Available' : 'Out of stock'}</p>
//               <button onClick={() => updateProduct(product.id, { price: product.price + 10 })}>Increase Price</button>
//               <button onClick={() => deleteProduct(product.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
  
//         {/* Example of how to add a new product */}
//         <button onClick={() => addProduct({ name: 'New Pizza', waitingTime: '15 min', price: 80, img: 'https://placehold.co/250x250?text=New+Pizza', isAvailable: true })}>
//           Add New Product
//         </button>
//       </div>
//     );
//   }