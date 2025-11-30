// StoreController.js

const dummyStores = [
    {
      id: 1,
      name: "Sweet n Lovely",
      logo: "https://cdn.vectorstock.com/i/1000v/95/89/kitchen-logo-design-with-using-combination-vector-30219589.jpg",
      wallpaper: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiqy2kbimZ845pc6i4MQMG8gRhhu68IMkkw&s",
      location: "Makhabeni Road, Khayelitsha, Cape Town, 7784",
      contacts: "+27717939711",
      coordinates: { lat: -34.043183692617774, lng: 18.660704821509025 },
      openingTimes: "Mon-Sun 10:00–22:00",
      description: "Sweet n Lovely Kitchen offers authentic home-cooked African meals made with love and tradition.",
      gallery: [
        {description: "The ribs", image: "https://th.bing.com/th/id/R.75246629a858133b48c6438a568093a2?rik=opRPq4M29Kde%2bA&pid=ImgRaw&r=0"},
        {description: "Pizza!!", image: "https://th.bing.com/th/id/OIP.saDYANjgi4O5RK2fu2Ys6wHaFj?w=222&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"},
        {description: "🤤", image: "https://tse1.mm.bing.net/th/id/OIP.FULYN-BCSDyH3220jqJLowHaI6?cb=ucfimg2&pid=ImgDet&ucfimg=1&w=474&h=570&rs=1&o=7&rm=3"},
        {description: "Beef!", image: "https://tse3.mm.bing.net/th/id/OIP.16R0coyTwoVuHvJ-KDkYvwHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"},
        {description: "More Pizza", image: "https://th.bing.com/th/id/OIP.o3RkjwemGyIftoSJriI_fQHaEK?w=265&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"},
        {description: "😋!!", image: "https://tse1.mm.bing.net/th/id/OIP.qT4sT7Hi9bul4zwWLA36wgHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"}
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
      isOpen: true
    },
    {
      id: 4,
      name: "Mornee Grills & Bar",
      logo: "https://firebasestorage.googleapis.com/v0/b/droppot.firebasestorage.app/o/pots%2Fbitepilot-assets%2Fmornee-logo.png?alt=media&token=8877ecc2-b5ca-4213-a3f0-4ef3f5eb066c",
      wallpaper: "https://firebasestorage.googleapis.com/v0/b/droppot.firebasestorage.app/o/pots%2Fbitepilot-assets%2Fmornee-wallpaper.png?alt=media&token=d0fb1688-ba5b-472e-bcd0-1687b6c36c77",
      location: "1339 Thole Street, Ngangelizwe, Mthatha",
      contacts: "+27604317270",
      paymentDetails: {description: "Account number: 1052672159", paymentMethod: 'account'},
      coordinates: { lat: -31.606686, lng: 28.810295 }, 
      openingTimes: "Mon-Sun 10:00–19:00",
      description: "Mornee Grills & Bar is a fast food business in Ngangelizwe, Mthatha, proudly owned by young kasi-born entrepreneur Escalina Frans. She started in 2017 with no money, no kitchen, and no equipment—just a dream, hustle, and the boot of her car, selling amagwinya and tea at clinics and taxi ranks. With passion and self-belief, she taught herself how to cook, grew her menu, and now runs a mobile kitchen serving the community. Escalina is proof that you don’t need much to start—just heart, consistency, and purpose. Mornee Grills is here to lead kasi fast food with flavor and pride. Good Food, Good Mood — Support Your Black Child.",
      gallery: [
        {description: "iKota🤤", image: "https://tb-static.uber.com/prod/image-proc/processed_images/82923c202deb1215fd06e20f67d7cbb9/50446f64f31cbefe66558fc47f50a9d6.jpeg"},
        {description: "🤤", image: "https://www.gatewayfishery.co.za/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-10-at-17.01.13.jpeg"},
        {description: "😋!!", image: "https://i0.wp.com/sundayworld.co.za/wp-content/uploads/2023/05/kota-scaled.jpg?resize=1024%2C1280&ssl=1"},
        {description: "Oh 🤤", image: "https://lh5.googleusercontent.com/p/AF1QipOR_VLRHsnF7hnHj9SuCzmr5W8O8gDttxy9E0Mq=w1080-k-no"},
        {description: "😍", image: "https://avocado.co.za/wp-content/uploads/2022/03/AMAGWINYA.png"},
      ],
      owners: [
        {
          name: "Escalina Frans",
          img: "https://firebasestorage.googleapis.com/v0/b/droppot.firebasestorage.app/o/pots%2Fbitepilot-assets%2FIMG_6040.jpeg?alt=media&token=790f8144-593a-4a94-a404-609e218f94a6",
        },
        {
          name: "Nasiphi Frans (Malume)",
          img: "https://firebasestorage.googleapis.com/v0/b/droppot.firebasestorage.app/o/pots%2Fbitepilot-assets%2Fmornee-owner-2.jpeg?alt=media&token=6d8897fc-c12b-4107-b161-9989c5ec458d",
        },
      ],
      isOpen: true,
      code: 'b4cfea6a6f9a9490195ae55eb8734d80'},
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
      const store = stores.find((store) => store.id === id);
      if (store) return store;
      try {
        return stores.find((store) => Number(store.id) === parseInt(id));
      } catch (error) {
        console.error('Store not found', error);
        return null;
      }
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
  