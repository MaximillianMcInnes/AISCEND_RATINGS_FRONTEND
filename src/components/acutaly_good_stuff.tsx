"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import confetti from "canvas-confetti";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUSkwtVYB1N--j2PPjXCiDlhOyU0HfhGQ",
  authDomain: "aiscend-14a48.firebaseapp.com",
  projectId: "aiscend-14a48",
  storageBucket: "aiscend-14a48.firebasestorage.app",
  messagingSenderId: "764650279068",
  appId: "1:764650279068:web:c4b2da27dcd606c2e89d59",
  measurementId: "G-2CPSWDYY7V",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function RateImage() {
  const [imageData, setImageData] = useState<{
    url: string;
    type: string;
    id: string;
  } | null>(null);
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    setLoading(true); // Show loader before fetch
    try {
      const ratingsCollection = collection(db, "Ratings");
      const snapshot = await getDocs(ratingsCollection);

      const records = snapshot.docs.map((doc) => {
        const data = doc.data() as { Url: string; Type: string };
        return { id: doc.id, url: data.Url, type: data.Type };
      });

      if (records.length === 0) throw new Error("No records found");

      const randomRecord =
        records[Math.floor(Math.random() * records.length)];
      setImageData(randomRecord);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false); // Hide loader after fetch
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

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
          ratings: arrayUnion(numericRating),
        });
      }

      triggerConfetti(); // 🎉
      setRating("");
      fetchImage(); // fetch next image
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
    }
  };

  // 🔄 Purple loading spinner
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen bg-white"
      >
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    );
  }

  if (!imageData) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load image</p>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-10 shadow-lg rounded-2xl bg-white">
      <CardContent className="flex flex-col items-center gap-6">
        <motion.h2
          className="text-2xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Rate this {imageData.type} (0–10)
        </motion.h2>
        <motion.img
          src={imageData.url}
          alt={imageData.type}
          className="w-full h-96 object-contain rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <Input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Enter rating"
          className="w-full text-center text-lg"
        />
        <Button onClick={handleSubmit} className="w-full py-3 text-lg">
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
