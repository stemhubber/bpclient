// scripts/manualProductUpload.js
import { morneProducts } from '../src/data/products.js';
import { ProductsService } from '../src/services/ProductsService.js';

console.log("Manual operation started");

(async () => {
  try {
    await ProductsService.saveAll(morneProducts, '4');
    console.log('Products uploaded successfully');
  } catch (error) {
    console.error("Error saving morneProducts", error);
  } finally {
    console.log("Manual operation completed");
    process.exit(); // close the process when done
  }
})();
