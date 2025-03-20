import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUSkwtVYB1N--j2PPjXCiDlhOyU0HfhGQ",
  authDomain: "aiscend-14a48.firebaseapp.com",
  projectId: "aiscend-14a48",
  storageBucket: "aiscend-14a48.firebasestorage.app",
  messagingSenderId: "764650279068",
  appId: "1:764650279068:web:c4b2da27dcd606c2e89d59",
  measurementId: "G-2CPSWDYY7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// API Route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ratingsCollection = collection(db, "Ratings");
    const snapshot = await getDocs(ratingsCollection);
    const records = snapshot.docs.map(doc => doc.data());

    if (records.length === 0) {
      return res.status(404).json({ error: "No records found" });
    }

    const randomRecord = records[Math.floor(Math.random() * records.length)];
    res.status(200).json({ url: randomRecord.Url, type: randomRecord.Type });
  } catch (error) {
    console.error("Error fetching random record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
