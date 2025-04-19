"use client"
import React, { useEffect, useState } from "react";
import Image_upload from "@/components/image_upload";
import { BackgroundBeamsWithCollisionDemo } from "@/components/welcome";
import "@/app/globals.css";
import Find_more from "@/components/about_us";
import RateImage from "@/components/acutaly_good_stuff";

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="relative h-full flex flex-col items-center justify-center faded-dots">
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-xl mx-4 text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Before You Continue</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              By using this service, you acknowledge and agree that the images and data you provide 
              may be used anonymously to train and improve AI models. No personally identifiable 
              information is stored, and all data is handled ethically in accordance with our 
              <span className="font-medium text-purple-600 cursor-pointer hover:underline"> Terms of Use</span>. 
              Your participation helps enhance the fairness and accuracy of future AI systems.
            </p>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="px-6 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90 transition-all shadow-md"
            >
              Got it – Continue
            </button>
          </div>
        </div>
      )}

      <BackgroundBeamsWithCollisionDemo />
      <RateImage />
      <div className="relative z-[20] w-[97%] h-[0.2rem] bg-gray-400 opacity-50 rounded-full mb-8 mt-12"></div>
      <Find_more />
    </div>
  );
}
