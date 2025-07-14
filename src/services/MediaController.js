// services/MediaController.js
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

/**
 * Uploads a file with optional progress and error handling
 * @param {File} file - The file object to upload
 * @param {string} folderPath - e.g., 'media/store-1'
 * @param {function} onProgress - (optional) callback for progress updates
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export const uploadFile = (file, folderPath, onProgress) => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const fileName = `${timestamp}_${file.name.replace(/\s+/g, "_")}`;
    const storagePath = `${folderPath}/${fileName}`;

    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress.toFixed(0));
        }
      },
      (error) => {
        console.error("Upload error:", error.message);
        reject(new Error("Failed to upload file. Please try again."));
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(new Error("Upload succeeded but failed to get file URL."));
        }
      }
    );
  });
};

/**
 * Gets the download URL of a stored file
 * @param {string} path - The file path
 * @returns {Promise<string>}
 */
export const getDownloadUrl = async (path) => {
  try {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
  } catch (err) {
    console.error("Error getting download URL:", err.message);
    throw new Error("Failed to get download URL.");
  }
};

/**
 * Lists all download URLs in a folder
 * @param {string} folderPath - The folder path
 * @returns {Promise<string[]>}
 */
export const listFiles = async (folderPath) => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);

    return Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));
  } catch (err) {
    console.error("Error listing files:", err.message);
    throw new Error("Could not list files in folder.");
  }
};

/**
 * Deletes a file from storage
 * @param {string} path - Full path to the file
 * @returns {Promise<void>}
 */
export const deleteFile = async (path) => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (err) {
    console.error("Error deleting file:", err.message);
    throw new Error("Failed to delete file.");
  }
};

/**
 * Deletes all files in a given folder
 * @param {string} folderPath - Path to the folder
 * @returns {Promise<void>}
 */
export const deleteAllFilesInFolder = async (folderPath) => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);

    await Promise.all(result.items.map((itemRef) => deleteObject(itemRef)));
  } catch (err) {
    console.error("Error deleting all files:", err.message);
    throw new Error("Failed to delete all files in folder.");
  }
};
