import React from "react";
import  Image_upload  from "@/components/image_upload"
import {BackgroundBeamsWithCollisionDemo} from "@/components/welcome"
import "@/app/globals.css";
import Find_more from "@/components/about_us"
import RateImage from "@/components/acutaly_good_stuff"


export default function Home() {
  return (
    <div className="h-[full] relative flex flex-col items-center justify-center faded-dots">
      <BackgroundBeamsWithCollisionDemo />
      <RateImage/>
      <div className="reladtive z-[20] w-[97%] h-[0.2rem] bg-gray-400 opacity-[50%] rounded-full mb-8 mt-12"></div>
      <Find_more/>
    </div>
  );
}
