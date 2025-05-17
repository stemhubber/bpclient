import Product from '../models/Product'; // Assuming Product class is imported here


const productsData = {
    "menu": [
      {
        "id": 1,
        "name": "Cape Town Pizza",
        "large": 160,
        "small": 85,
        "description": "Mushroom, Onion, Greenpepper, Beef Mince, Chicken & Fresh Tomato",
        "image": "https://lh5.googleusercontent.com/p/AF1QipNkyJYEiJX4murdkYAjSnnF0QYG00zGIWKDmsIj=w1080-k-no",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 2,
        "name": "Khayelitsha Pizza",
        "large": 120,
        "small": 65,
        "description": "Mushroom, Onion, Greenpepper, Beef, Fresh Tomato",
        "image": "https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/482120749_1308306977053687_6883135405060012325_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFLqCDS-IpO_0IXAsgj9ftysijfbJBh9wGyKN9skGH3AW5G2spdIM6HHx56tssJE4JH4Y8j-89GWvu9tH4tbV6o&_nc_ohc=qqnkksEFDXsQ7kNvwEL9_tS&_nc_oc=AdnPUFbUcGG9mKRYbTu5aGNbukhBpW5fRUspqlMImiEzeaR7MK23SuY23v289hKYngI&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=XHNcm0YwB2fJ2S7Vrekm4A&oh=00_AfH1I8jRZdZ6VL8-v3rSCQNOgYqUddSQ6VOTN_DCqnv_YA&oe=681657DF",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 3,
        "name": "Sweet 'n Lovely Pizza",
        "large": 130,
        "small": 75,
        "description": "Mushroom, Onion, Greenpepper, Ham, Bacon, Chorizo & Fresh Tomato",
        "image": "https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/486639079_1707564593130059_4709807558093726821_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEmx5-ZWr5CEySv0ubqSIRHIPpSaegNoqYg-lJp6A2ips1BkFiVGBjkABM9EXTP5HRm50-twbAKew0t7i4hLkSW&_nc_ohc=HXFUunedZpUQ7kNvwEkADYg&_nc_oc=AdnquXXTzEmTfM28PACYvzSkXY5gCJoIbR95CQtml4riZN7xnN54YriZuTd-k5uWTtI&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=vzMKbBbIkdibgJeKkbF9Wg&oh=00_AfE7dj0L2wSPGiBVXTqqsDjwwhMJroSSE8YK6C7mUSU8Fw&oe=68164B13",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 4,
        "name": "Rib Pizza",
        "large": 115,
        "small": 60,
        "description": "Pork, Onion, Greenpepper, Rib off the bone with Sauce",
        "image": "https://placehold.co/250x250?text=Rib+Pizza",
        "isAvailable": true,
        "waitingTime": "18 minutes"
      },
      {
        "id": 5,
        "name": "Vegetarian Pizza",
        "large": 115,
        "small": 60,
        "description": "Mushroom, Onion, Greenpepper, Pineapple, Feta & Olives",
        "image": "https://placehold.co/250x250?text=Vegetarian+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 6,
        "name": "Margherita Pizza",
        "large": 115,
        "small": 60,
        "description": "Tomato base, Origanum, Cheese",
        "image": "https://placehold.co/250x250?text=Margherita+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 7,
        "name": "Ilitha Park Pizza",
        "large": 115,
        "small": 60,
        "description": "Mushroom, Onion, Greenpepper, Ham & Pineapple",
        "image": "https://placehold.co/250x250?text=Ilitha+Park+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 8,
        "name": "Mexican Pizza",
        "large": 115,
        "small": 60,
        "description": "Onion, Greenpepper, Mince & Chillies",
        "image": "https://placehold.co/250x250?text=Mexican+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 9,
        "name": "Hawaiian Pizza",
        "large": 115,
        "small": 60,
        "description": "Ham & Pineapple",
        "image": "https://placehold.co/250x250?text=Hawaiian+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 10,
        "name": "Regina Pizza",
        "large": 115,
        "small": 60,
        "description": "Onion, Greenpepper, Mushroom & Bacon",
        "image": "https://placehold.co/250x250?text=Regina+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 11,
        "name": "Meatlovers Pizza",
        "large": 130,
        "small": 75,
        "description": "Bacon, Ham, Salami, Chorizo, Peppadew & Spring Onion",
        "image": "https://placehold.co/250x250?text=Meatlovers+Pizza",
        "isAvailable": true,
        "waitingTime": "18 minutes"
      },
      {
        "id": 12,
        "name": "Four Seasons Pizza",
        "large": 130,
        "small": 75,
        "description": "Onion, Greenpepper, Mushroom, Ham, Chorizo & Salami",
        "image": "https://placehold.co/250x250?text=Four+Seasons+Pizza",
        "isAvailable": true,
        "waitingTime": "18 minutes"
      },
      {
        "id": 13,
        "name": "Greek Pizza",
        "large": 130,
        "small": 75,
        "description": "Onion, Greenpepper, Ham, Cheese & Olives",
        "image": "https://placehold.co/250x250?text=Greek+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 14,
        "name": "Create Your Own Pizza",
        "large": 130,
        "small": 75,
        "description": "Create your own topping combinations",
        "image": "https://placehold.co/250x250?text=Create+Your+Own+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 15,
        "name": "Gypsy Pizza",
        "large": 115,
        "small": 60,
        "description": "Onion, Greenpepper, Mushroom & Chicken",
        "image": "https://placehold.co/250x250?text=Gypsy+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 16,
        "name": "Chicken Mayo Pizza",
        "large": 115,
        "small": 60,
        "description": "Onion, Greenpepper, Chicken Mayo & Cheese",
        "image": "https://placehold.co/250x250?text=Chicken+Mayo+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 17,
        "name": "Sweet & Sour Chicken Pizza",
        "large": 115,
        "small": 60,
        "description": "Chicken with a sweet and sour sauce",
        "image": "https://placehold.co/250x250?text=Sweet+%26+Sour+Chicken+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 18,
        "name": "Tropical Pizza",
        "large": 115,
        "small": 60,
        "description": "Mushroom, Cheese, Bacon & Banana",
        "image": "https://placehold.co/250x250?text=Tropical+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 19,
        "name": "Seafood Pizza",
        "large": 130,
        "small": 75,
        "description": "Seafood Mix, Tuna, Mussel & Cheese",
        "image": "https://placehold.co/250x250?text=Seafood+Pizza",
        "isAvailable": true,
        "waitingTime": "18 minutes"
      },
      {
        "id": 20,
        "name": "Goulash Pizza (HOT)",
        "large": 130,
        "small": 75,
        "description": "Steak Goulash, Mushroom, Pineapple & Cheese",
        "image": "https://placehold.co/250x250?text=Goulash+Pizza",
        "isAvailable": true,
        "waitingTime": "18 minutes"
      },
      {
        "id": 21,
        "name": "Mfuleni Pizza",
        "large": 130,
        "small": 75,
        "description": "Mince, Onion, Greenpepper, Bacon, Feta Cheese & Cheese",
        "image": "https://placehold.co/250x250?text=Mfuleni+Pizza",
        "isAvailable": true,
        "waitingTime": "18 minutes"
      },
      {
        "id": 22,
        "name": "Chicken Tikka Pizza (HOT)",
        "large": 115,
        "small": 60,
        "description": "Chicken Tikka, Onion, Greenpepper & Cheese",
        "image": "https://placehold.co/250x250?text=Chicken+Tikka+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 23,
        "name": "Lucky Pizza",
        "large": 115,
        "small": 60,
        "description": "Mushrooms, Pilchard & Cheese",
        "image": "https://placehold.co/250x250?text=Lucky+Pizza",
        "isAvailable": true,
        "waitingTime": "15 minutes"
      },
      {
        "id": 24,
        "name": "Garlic Pita",
        "large": 40,
        "small": 30,
        "description": "Base, Garlic & Herbs, Cheese optional",
        "image": "https://placehold.co/250x250?text=Garlic+Pita",
        "isAvailable": true,
        "waitingTime": "10 minutes"
      }
    ],
    "extra_toppings": [
      { "name": "Feta Cheese", "price": 14 },
      { "name": "Vegetable", "price": 10 },
      { "name": "Ham", "price": 18 },
      { "name": "Chorizo", "price": 18 },
      { "name": "Ribs", "price": 20 },
      { "name": "Chicken", "price": 20 },
      { "name": "Bacon", "price": 20 },
      { "name": "Mince", "price": 20 },
      { "name": "Beef", "price": 20 },
      { "name": "Seafood", "price": 20 },
      { "name": "Salami", "price": 20 },
      { "name": "Cheese", "price": 20 }
    ],
    "extra_packages": [
            {
            "id": 1,
            "name": "1kg Mutton",
            "price": 220,
            "image": "https://placehold.co/250x250?text=1kg+Mutton",
            "isAvailable": true,
            "waitingTime": "25 minutes"
            },
            {
            "id": 2,
            "name": "500g Mutton",
            "price": 100,
            "image": "https://placehold.co/250x250?text=500g+Mutton",
            "isAvailable": true,
            "waitingTime": "20 minutes"
            },
            {
            "id": 3,
            "name": "1kg Rib with Chips",
            "price": 200,
            "image": "https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/485093744_4029228807401316_1873216415297680665_n.jpg?stp=cp6_dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH0jXctcNKTeGmkbvoqn3HCNkpEuyjfHlk2SkS7KN8eWeP7RzHtaLekZbIi1qqlttfIDPK-fChDIb8xZQhvZy-b&_nc_ohc=GsznXdSUyh0Q7kNvwFVVlNx&_nc_oc=AdlleV34Sr4R0WSvbl90qwlTmquOAvfWhg9HiuSjYcNsLwTBV7Ys8eJ4l1pMHLG0oOk&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=XHNcm0YwB2fJ2S7Vrekm4A&oh=00_AfFyRtJyEqa7Gtc6ytfkM4wegqPR5pPCBXlOpc7VlilTvw&oe=68164245",
            "isAvailable": true,
            "waitingTime": "25 minutes"
            },
            {
            "id": 4,
            "name": "500g Rib with Chips",
            "price": 100,
            "image": "https://lh5.googleusercontent.com/p/AF1QipOR_VLRHsnF7hnHj9SuCzmr5W8O8gDttxy9E0Mq=w1080-k-no",
            "isAvailable": true,
            "waitingTime": "20 minutes"
            },
            {
            "id": 5,
            "name": "1kg Beef with Chips",
            "price": 190,
            "image": "https://scontent-cpt1-1.xx.fbcdn.net/v/t1.6435-9/118004741_689229534963575_5944609981532448267_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHOSiYw0g0o6Xm8D5Je9TuFZnkQiLA5oI9meRCIsDmgj5oUH1UXNt9X9tdc7BC35gNxKWLmmEdbIxhJo3dVPJFD&_nc_ohc=tEQwrMRZkDoQ7kNvwEZ5ckD&_nc_oc=Adl3dAETiDArbzu0dyeFIx8YiRpMJ0fE56fIHbxUzXbap2nyAzfKY03fxRX8a8DbK-4&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=ujqR_Sl9Kzegpbiu9BUQkQ&oh=00_AfFWqKfxakpCk8ekgAHAM_FzL7r4d8lwkz5jvMu46dzwrg&oe=6837E964",
            "isAvailable": true,
            "waitingTime": "25 minutes"
            },
            {
            "id": 6,
            "name": "500g Beef with Chips",
            "price": 90,
            "image": "https://scontent-cpt1-1.xx.fbcdn.net/v/t1.6435-9/118004741_689229534963575_5944609981532448267_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHOSiYw0g0o6Xm8D5Je9TuFZnkQiLA5oI9meRCIsDmgj5oUH1UXNt9X9tdc7BC35gNxKWLmmEdbIxhJo3dVPJFD&_nc_ohc=tEQwrMRZkDoQ7kNvwEZ5ckD&_nc_oc=Adl3dAETiDArbzu0dyeFIx8YiRpMJ0fE56fIHbxUzXbap2nyAzfKY03fxRX8a8DbK-4&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=ujqR_Sl9Kzegpbiu9BUQkQ&oh=00_AfFWqKfxakpCk8ekgAHAM_FzL7r4d8lwkz5jvMu46dzwrg&oe=6837E964",
            "isAvailable": true,
            "waitingTime": "20 minutes"
            },
            {
            "id": 7,
            "name": "Chicken & Chips",
            "price": 60,
            "image": "https://placehold.co/250x250?text=Chicken+%26+Chips",
            "isAvailable": true,
            "waitingTime": "15 minutes"
            },
            {
            "id": 8,
            "name": "Half Chicken & Chips",
            "price": 80,
            "image": "https://placehold.co/250x250?text=Half+Chicken+%26+Chips",
            "isAvailable": true,
            "waitingTime": "15 minutes"
            },
            {
            "id": 9,
            "name": "Quarter Chicken & Chips",
            "price": 60,
            "image": "https://scontent-cpt1-1.xx.fbcdn.net/v/t1.6435-9/134355008_779378592615335_1598276652237405342_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEWe4jPl3Li4DE7HGlukVyzZxCBINGQfIhnEIEg0ZB8iLgWC-YJOnGoAcapLHDf2yzdYt0Mjcvsr42wuG9fmtqo&_nc_ohc=28Vma4rMRM0Q7kNvwHB5myq&_nc_oc=Adk013rE7ei52TEO9OxnQhSRrDtphnWnu9iSaKgMFvm2Dpb-LrimLrjkZ-yqkKACVmg&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=Ox1947Q9kmJyOzL2y6Xubw&oh=00_AfFRdRdC08NNud3NBT_YpL_rmGZKEJHDa5CQS94_VgadCA&oe=6837EA2E",
            "isAvailable": true,
            "waitingTime": "15 minutes"
            },
            {
            "id": 10,
            "name": "Russian x2 with Chips",
            "price": 80,
            "image": "https://placehold.co/250x250?text=Russian+x2+with+Chips",
            "isAvailable": true,
            "waitingTime": "15 minutes"
            },
            {
            "id": 11,
            "name": "Grilled Wings with Chips",
            "price": 90,
            "image": "https://placehold.co/250x250?text=Grilled+Wings+with+Chips",
            "isAvailable": true,
            "waitingTime": "20 minutes"
            },
            {
            "id": 12,
            "name": "Lasagne Large",
            "price": 90,
            "image": "https://scontent-cpt1-1.xx.fbcdn.net/v/t1.6435-9/119710769_708692773017251_4123809941542282424_n.jpg?stp=c0.66.600.600a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeG44LaMZ5m9BFTFlPXjQONHcxs3v5VrMJ5zGze_lWswnhr0ISQichaHuCvvnaUhbWs2_gcKnhwaQspSQ-JEjcNl&_nc_ohc=WcBpFtXnzagQ7kNvwGY8boy&_nc_oc=AdmbNJGhbprUPtAMKx2tHaCJoUcfB0SrPt7q8uPCIyxKY0V9zSPMp4Z483tdxT-viAQ&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=ukyIHw49AMADOXAL5suBFA&oh=00_AfHu_awyVHP1OKdU0YSKrudKs0A9PUV3PScO1XXmVHcEug&oe=6837CF73",
            "isAvailable": true,
            "waitingTime": "25 minutes"
            },
            {
            "id": 13,
            "name": "Lasagne Small",
            "price": 60,
            "image": "https://placehold.co/250x250?text=Lasagne+Small",
            "isAvailable": true,
            "waitingTime": "20 minutes"
            },
            {
            "id": 14,
            "name": "Burger, Veggies & Chips",
            "price": 60,
            "image": "https://placehold.co/250x250?text=Burger+%26+Veggies+Chips",
            "isAvailable": true,
            "waitingTime": "15 minutes"
            }
        ]
  };
  
  export default class ProductController {
    constructor() {
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