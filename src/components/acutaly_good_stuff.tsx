"use client"

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import 'ldrs/bouncy';
import { bouncy } from 'ldrs';



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

export default function RateImage() {
  const [imageData, setImageData] = useState<{ url: string; type: string; id: string } | null>(null);
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    try {
      const ratingsCollection = collection(db, "Ratings");
      const snapshot = await getDocs(ratingsCollection);
      
      const records = snapshot.docs.map(doc => {
        const data = doc.data() as { Url: string; Type: string }; // Explicitly type the document data
        return { id: doc.id, url: data.Url, type: data.Type };
      });
  
      if (records.length === 0) {
        throw new Error("No records found");
      }
  
      const randomRecord = records[Math.floor(Math.random() * records.length)];
      setImageData(randomRecord);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchImage();
  }, []);

  const handleSubmit = async () => {
    const numericRating = parseFloat(rating);
    if (isNaN(numericRating) || numericRating < 0 || numericRating > 10) {
      alert("Please enter a valid rating between 0 and 10.");
      return;
    }

    try {
      if (imageData?.id) {
        const imageDocRef = doc(db, "Ratings", imageData.id);
        await updateDoc(imageDocRef, {
          ratings: arrayUnion(numericRating)
        });
      }
      alert(`You rated this ${imageData?.type} as ${numericRating}/10!`);
      setRating("");
      fetchImage();
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }
  
  

  if (!imageData) {
    return <p className="text-center mt-10 text-red-500">Failed to load image</p>;
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-10 shadow-lg rounded-2xl bg-white">
      <CardContent className="flex flex-col items-center gap-6">
        <motion.h2 
          className="text-2xl font-semibold text-gray-800" 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          Rate this {imageData.type} (0-10)
        </motion.h2>
        <motion.img 
          src={imageData.url} 
          alt={imageData.type} 
          className="w-full h-96 object-cover rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        />
        <Input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          placeholder="Enter rating" 
          className="w-full text-center text-lg"
        />
        <Button onClick={handleSubmit} className="w-full py-3 text-lg">Submit</Button>
      </CardContent>
    </Card>
  );
}
