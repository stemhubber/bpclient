// StoreController.js

const dummyStores = [
    {
      id: 1,
      name: "Sweet n Lovely",
      logo: "https://cdn.vectorstock.com/i/1000v/95/89/kitchen-logo-design-with-using-combination-vector-30219589.jpg",
      wallpaper: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiqy2kbimZ845pc6i4MQMG8gRhhu68IMkkw&s",
      location: "Khayelitsha, Site B",
      contacts: "0712345678",
      coordinates: { lat: -34.034, lng: 18.673 },
      openingTimes: "Mon-Sun 08:00–20:00",
      description: "Sweet n Lovely Kitchen offers authentic home-cooked African meals made with love and tradition.",
      gallery: [
        {description: "Oh the ribs🤤", image: "https://lh5.googleusercontent.com/p/AF1QipOR_VLRHsnF7hnHj9SuCzmr5W8O8gDttxy9E0Mq=w1080-k-no"},
        {description: "The Beef😋!!", image: "https://scontent-cpt1-1.xx.fbcdn.net/v/t1.6435-9/118004741_689229534963575_5944609981532448267_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHOSiYw0g0o6Xm8D5Je9TuFZnkQiLA5oI9meRCIsDmgj5oUH1UXNt9X9tdc7BC35gNxKWLmmEdbIxhJo3dVPJFD&_nc_ohc=tEQwrMRZkDoQ7kNvwEZ5ckD&_nc_oc=Adl3dAETiDArbzu0dyeFIx8YiRpMJ0fE56fIHbxUzXbap2nyAzfKY03fxRX8a8DbK-4&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=ujqR_Sl9Kzegpbiu9BUQkQ&oh=00_AfFWqKfxakpCk8ekgAHAM_FzL7r4d8lwkz5jvMu46dzwrg&oe=6837E964"},
        {description: "Oh the ribs🤤", image: "https://lh5.googleusercontent.com/p/AF1QipOR_VLRHsnF7hnHj9SuCzmr5W8O8gDttxy9E0Mq=w1080-k-no"},
        {description: "The Beef😋!!", image: "https://scontent-cpt1-1.xx.fbcdn.net/v/t1.6435-9/118004741_689229534963575_5944609981532448267_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHOSiYw0g0o6Xm8D5Je9TuFZnkQiLA5oI9meRCIsDmgj5oUH1UXNt9X9tdc7BC35gNxKWLmmEdbIxhJo3dVPJFD&_nc_ohc=tEQwrMRZkDoQ7kNvwEZ5ckD&_nc_oc=Adl3dAETiDArbzu0dyeFIx8YiRpMJ0fE56fIHbxUzXbap2nyAzfKY03fxRX8a8DbK-4&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=ujqR_Sl9Kzegpbiu9BUQkQ&oh=00_AfFWqKfxakpCk8ekgAHAM_FzL7r4d8lwkz5jvMu46dzwrg&oe=6837E964"},
        {description: "Oh the ribs🤤", image: "https://lh5.googleusercontent.com/p/AF1QipOR_VLRHsnF7hnHj9SuCzmr5W8O8gDttxy9E0Mq=w1080-k-no"},
        {description: "The Beef😋!!", image: "https://scontent-cpt1-1.xx.fbcdn.net/v/t1.6435-9/118004741_689229534963575_5944609981532448267_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHOSiYw0g0o6Xm8D5Je9TuFZnkQiLA5oI9meRCIsDmgj5oUH1UXNt9X9tdc7BC35gNxKWLmmEdbIxhJo3dVPJFD&_nc_ohc=tEQwrMRZkDoQ7kNvwEZ5ckD&_nc_oc=Adl3dAETiDArbzu0dyeFIx8YiRpMJ0fE56fIHbxUzXbap2nyAzfKY03fxRX8a8DbK-4&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=ujqR_Sl9Kzegpbiu9BUQkQ&oh=00_AfFWqKfxakpCk8ekgAHAM_FzL7r4d8lwkz5jvMu46dzwrg&oe=6837E964"}
      ],
      owners: [
        {
          name: "Nandi Sithole",
          img: "https://t3.ftcdn.net/jpg/10/14/64/58/360_F_1014645899_KDce6Mmqs3mmNN4hKuteBZu5K6Txii2G.jpg",
        },
        {
          name: "Nimrod Sithole",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTQoxPEGXSmLueGMU8zycMe893KhCDW8GBHQ&s",
        },
      ],
    },
    {
      id: 2,
      name: "Joe's Pizza Spot",
      location: "Claremont, Cape Town",
      contacts: "0823456789",
      coordinates: { lat: -33.983, lng: 18.465 },
      openingTimes: "Mon-Sat 10:00–22:00",
      wallpaper: "",
    },
    {
      id: 3,
      name: "Mama B's Burgers",
      location: "Observatory, Cape Town",
      contacts: "0744567890",
      coordinates: { lat: -33.938, lng: 18.457 },
      openingTimes: "Tues-Sun 11:00–23:00",
      wallpaper: "",
    },
  ];
  
  let stores = [...dummyStores]; // Use this as our mutable data store
  
  export const StoreController = {
    getAllStores: () => {
      return stores;
    },
  
    getStoreById: (id) => {
      return stores.find((store) => store.id === id);
    },
  
    addStore: (newStore) => {
      const id = stores.length ? Math.max(...stores.map((s) => s.id)) + 1 : 1;
      const storeWithId = { id, ...newStore };
      stores.push(storeWithId);
      return storeWithId;
    },
  
    updateStore: (id, updatedData) => {
      const index = stores.findIndex((store) => store.id === id);
      if (index === -1) return null;
      stores[index] = { ...stores[index], ...updatedData };
      return stores[index];
    },
  
    deleteStore: (id) => {
      const index = stores.findIndex((store) => store.id === id);
      if (index === -1) return false;
      stores.splice(index, 1);
      return true;
    },
  };
  