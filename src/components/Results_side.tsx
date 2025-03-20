"use client";
import React from "react";
import SwingDots from "@/components/ui/loader"; // Import SwingDots loader

interface ResultsProps {
  analysisType: string;
  jsonData: Record<string, any> | null;
  loading: boolean;
}

const ResultsSide: React.FC<ResultsProps> = ({
  analysisType,
  jsonData,
  loading,
}) => {


  if (loading) {
    return <SwingDots size="50px" color="#6934B3" speed="2s" />;
  }
  console.log(analysisType)


  if (
    !jsonData ||
    !jsonData.side_profile_data ||
    !jsonData.side_profile_data.side_profile
  ) {
    return null; // Hide the results if jsonData or the required structure is missing
  }

  const { face, nose } = jsonData.side_profile_data.side_profile;
  const { Overall_Score, face_score, nose_score } = jsonData.side_profile_data;

  const {
    ramus = "N/A",
    mandible = "N/A",
    maxilla = "N/A",
    chin_projection = "N/A",
    gonial_angle = "N/A",
    "over / under bite": overUnderBite = "N/A",
    jaw_visibility= "N/A",
  } = face || {};

  const {
    nose_bump = "N/A",
    nose_shape = "N/A",
    brow_ridge_prominence = "N/A",
  } = nose || {};
  
  return (
    <div className="results-container w-full flex flex-col items-center mt-12 space-y-8 bg-black text-white">
      <div className="w-full max-w-4xl">
        <div className="relative z-[20] w-[97%] h-[0.2rem] bg-gray-400 opacity-50 rounded-full mb-8 mt-12"></div>
        <p className="text-center text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Your Results
        </p>

        {/* Overall Score */}
        <div className="p-4 rounded-lg shadow-lg text-center mb-4">
          <h2 className="text-4xl font-bold text-white mb-4">You are a</h2>
          <p className="text-4xl font-bold text-[#6934B3] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)]">
            {Overall_Score}/10
          </p>
        </div>

        <div className="space-y-8">
          {/* Face Section */}
          <div className="bg-[#111112FF] p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-5xl font-bold text-[#723EBAFF] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)] mb-4">
              Face
            </h2>
            <p className="text-xl font-bold mb-4">
              <span className="text-white font-bold">Score:</span>
              <span className="text-[#723EBAFF] font-bold">
                {" "}
                {face_score}/10
              </span>
            </p>
            <div className="space-y-4">
              <div className="p-6 rounded-md shadow-md space-y-4">
                <div className="space-y-2 text-left">
                  {[
                    {
                      label: "Ramus",
                      value: ramus,
                      className:
                        ramus === "tall" ? "text-green-400" : "text-red-500",
                    },
                    {
                      label: "Mandible",
                      value: mandible,
                      className:
                        mandible === "Forward-grown mandible"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "Maxilla",
                      value: maxilla,
                      className:
                        maxilla === "Projected maxilla"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "Chin Projection",
                      value: chin_projection,
                      className:
                        chin_projection === "Projected"
                          ? "text-green-400"
                          : chin_projection === "normal"
                          ? "text-yellow-500"
                          : "text-red-500",
                    },
                    {
                      label: "Gonial Angle",
                      value: gonial_angle,
                      className:
                        gonial_angle === "ideal"
                          ? "text-green-400"
                          : "text-yellow-700",
                    },
                    {
                      label: "Over / Under Bite",
                      value: overUnderBite,
                      className:
                        overUnderBite === "Normal"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "jaw_visibility",
                      value: jaw_visibility,
                      className:
                        jaw_visibility === "super sharp"
                          ? "text-green-400"
                          : jaw_visibility === "great"
                          ? "text-green-600"
                          : jaw_visibility === "good"
                          ? "text-yellow-400"
                          : jaw_visibility === "mid"
                          ? "text-yellow-700"
                          : "text-red-500",
                    }
                    
                  ].map(({ label, value, className }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center border-[0.5px] border-[#351A5AFF] rounded-3xl px-6 py-2 bg-[#1C2128FF] h-[8%]"
                    >
                      <span className="font-bold text-white">{label}:</span>
                      <span className={`${className} capitalize`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Nose Section */}
          {/* Nose Section */}
          <div className="bg-[#111112FF] p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-5xl font-bold text-[#723EBAFF] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)] mb-4">
              Nose
            </h2>
            <p className="text-xl font-bold mb-4">
              <span className="text-white font-bold">Score:</span>
              <span className="text-[#723EBAFF] font-bold">
                {" "}
                {nose_score}/10
              </span>
            </p>
            <div className="p-6 rounded-md shadow-md space-y-4">
              <div className="space-y-2 text-left">
                {[
                  {
                    label: "Nose Bump",
                    value: nose_bump,
                    className:
                      nose_bump === "Absent"
                        ? "text-green-400"
                        : "text-red-500",
                  },
                  {
                    label: "Nose Shape",
                    value: nose_shape,
                    className:
                      nose_shape === "Upturned" || nose_shape === "Straight"
                        ? "text-green-400"
                        : "text-red-500",
                  },
                  {
                    label: "Brow Ridge Prominence",
                    value: brow_ridge_prominence,
                    className:
                      brow_ridge_prominence === "Prominent"
                        ? "text-green-400"
                        : "text-red-500",
                  },
                ].map(({ label, value, className }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-[0.5px] border-[#351A5AFF] rounded-3xl px-4 py-2 bg-[#1C2128FF] h-[6%]"
                  >
                    <span className="font-bold text-white">{label}:</span>
                    <span className={`${className} capitalize`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSide;


