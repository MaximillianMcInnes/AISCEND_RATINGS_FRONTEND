// uploadToFirebase.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/utility/firebaseConfig";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export const uploadFile = async (file: File): Promise<string | null> => {
  if (!file) return null;

  // Generate a unique file name by appending a UUID
  const uniqueFileName = `${file.name.split(".")[0]}_${uuidv4()}.${file.name.split(".").pop()}`;

  const storageRef = ref(storage, `uploads/${uniqueFileName}`);
  try {
    // Upload the file to Firebase storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
