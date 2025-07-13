// controllers/GalleryController.js
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

// Upload a single image and return { name, url }
export const uploadImage = async (file, userId) => {
  try {
    if (!userId) throw new Error("Missing userId");
    if (!file) throw new Error("Missing file");

    const storageRef = ref(storage, `images/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;
    const downloadURL = await getDownloadURL(storageRef);
    return { name: file.name, url: downloadURL };
  } catch (error) {
    console.error("Upload failed:", error.message);
    throw error;
  }
};

// Upload multiple images and return array of { name, url }
export const uploadMultipleImages = async (files, userId) => {
  try {
    if (!files?.length) throw new Error("No files provided");
    return await Promise.all(files.map((file) => uploadImage(file, userId)));
  } catch (error) {
    console.error("Multi-upload failed:", error.message);
    throw error;
  }
};

// Get all uploaded images for a user
export const getUserImages = async (userId) => {
  try {
    if (!userId) throw new Error("Missing userId");
    const path = `images/${userId}`;
    const folderRef = ref(storage, path);
    const result = await listAll(folderRef);
    console.log(path, result)
    const urls = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      })
    );
    return urls;
  } catch (error) {
    console.error("Fetching images failed:", error.message);
    return []; // return empty array on failure to prevent crashing UI
  }
};

// Delete a specific image
export const deleteImage = async (userId, imageName) => {
  try {
    if (!userId || !imageName) throw new Error("Missing userId or imageName");

    const imageRef = ref(storage, `images/${userId}/${imageName}`);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Delete failed:", error.message);
    throw error;
  }
};

// Force browser to download image from URL
export const downloadImage = async (url) => {
  try {
    if (!url) throw new Error("Missing image URL");

    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop().split("?")[0];
    a.click();
  } catch (error) {
    console.error("Download failed:", error.message);
    throw error;
  }
};
