"use client";
import React from "react";
import SwingDots from "@/components/ui/loader"; // Import SwingDots loader

interface ResultsProps {
  analysisType: string;
  jsonData: Record<string, any> | null;
  loading: boolean;
}

const ResultsFront: React.FC<ResultsProps> = ({
  analysisType,
  jsonData,
  loading,
}) => {
  if (loading) {
    return <SwingDots size="50px" color="#6934B3" speed="2s" />;
  }

  if (!jsonData || !jsonData.front_profile_data) {
    return null; // Hide the results if jsonData or the required structure is missing
  }
  const face = jsonData.front_profile_data.front_profile.face;
  const eyes = jsonData.front_profile_data.front_profile.eyes;
  const jawArea = jsonData.front_profile_data.front_profile.jaw_area;
  const lips = jsonData.front_profile_data.front_profile.lips
  const Phenotype = jsonData.front_profile_data.front_profile.Phenotype



  console.log(analysisType);
  
  // Define color mapping based on Acne_level severity


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
            {jsonData.front_profile_data.scores.overall}/10
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-lg text-center mb-4">
          <h2 className="text-4xl font-bold text-white mb-4">Your Potential</h2>
          <p className="text-4xl font-bold text-[#6934B3] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)]">
            {jsonData.front_profile_data.scores.Potential}/10
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
                {jsonData.front_profile_data.scores.Face}/10
              </span>
            </p>
            <div className="space-y-4">
              <div className="p-6 rounded-md shadow-md space-y-4">
                <div className="space-y-2 text-left">
                  {[
                    {
                      label: "Face Shape",
                      value: face?.face_shape,
                      className:
                        face?.face_shape === "Diamond"
                          ? "text-green-400"
                          : face?.face_shape === "Square"
                          ? "text-green-400"
                          : face?.face_shape === "Rectangular"
                          ? "text-green-700"
                          : face?.face_shape === "Oval"
                          ? "text-yellow-700"
                          : face?.face_shape === "Heart"
                          ? "text-yellow-700"
                          : "text-red-500",
                    },
                    {
                      label: "Facial Symmetry",
                      value: face?.facial_symmetry,
                      className:
                        face?.facial_symmetry === "Perfect"
                          ? "text-green-400"
                          : face?.facial_symmetry === "Great"
                          ? "text-green-700"
                          : face?.facial_symmetry === "Good"
                          ? "text-green-900"
                          : face?.facial_symmetry === "Average"
                          ? "text-yellow-700"
                          : "text-red-500",
                    },
                    {
                      label: "Cheekbone Prominence ",
                      value: face?.cheekbone_prominence,
                      className:
                        face?.cheekbone_prominence === "prominent"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "FWHR",
                      value: face?.FWHR,
                      className:
                        face?.FWHR === "ideal"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "Nose Width",
                      value: face?.nose_width,
                      className:
                        face?.nose_width === "ideal"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "Nose Length",
                      value: face?.nose_length,
                      className:
                        face?.nose_length === "ideal"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "Philtrum",
                      value: face?.philtrum,
                      className:
                        face?.philtrum === "ideal"
                          ? "text-green-400"
                          : "text-red-500",
                    },
                    {
                      label: "facial_thirds",
                      value: face?.facial_thirds,
                      className:
                        face?.facial_thirds === "ideal"
                          ? "text-green-400"
                          : "text-yellow-700",
                    },
                    {
                      label: "Cheekbones Setness",
                      value: face?.cheekbones,
                      className:
                        face?.facial_symmetry === "ultra high set"
                          ? "text-green-400"
                          : face?.facial_symmetry === "high set"
                          ? "text-green-700"
                          : face?.facial_symmetry === "medium set"
                          ? "text-yellow-700"
                          : "text-red-500",
                    },
                    {
                      label: "Nose symmetry",
                      value: face?.nose_symmetry,
                      className:
                        face?.nose_symmetry === "symmetrical"
                          ? "text-green-400"
                          : "text-red-500",
                    },
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
          <div className="space-y-8">
            {/* Jaw Section */}
            <div className="bg-[#111112FF] p-8 rounded-3xl shadow-lg text-center">
              <h2 className="text-5xl font-bold text-[#723EBAFF] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)] mb-4">
                Jaw
              </h2>
              <p className="text-xl font-bold mb-4">
                <span className="text-white font-bold">Score:</span>
                <span className="text-[#723EBAFF] font-bold">
                  {" "}
                  {jsonData.front_profile_data.scores.jaw}/10
                </span>
              </p>
              <div className="space-y-4">
                <div className="p-6 rounded-md shadow-md space-y-4">
                  <div className="space-y-2 text-left">
                    {[
                      {
                        label: "Jawline visibility",
                        value: jawArea?.visibility,
                        className: "text-green-400",
                      },
                      {
                        label: "Chin Length",
                        value: jawArea?.chin_length,
                        className: "text-green-400",
                      },
                      {
                        label: "Chin Width",
                        value: jawArea?.chin_width,
                        className: "text-green-400",
                      },
                      {
                        label: "Chin Squareness",
                        value: jawArea?.chin,
                        className: "text-green-400",
                      },
                      {
                        label: "Hollow Cheeks ",
                        value: jawArea?.hollow_cheeks,
                        className: "text-green-400",
                      },
                    ].map(({ label, value, className }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center border-[0.5px] border-[#351A5AFF] rounded-3xl px-6 py-2 bg-[#1C2128FF] h-[8%]"
                      >
                        <span className="font-bold text-white">{label}:</span>
                        <span className={`${className} capitalize`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {/* eye Section */}
            <div className="bg-[#111112FF] p-8 rounded-3xl shadow-lg text-center">
              <h2 className="text-5xl font-bold text-[#723EBAFF] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)] mb-4">
                Eyes
              </h2>
              <p className="text-xl font-bold mb-4">
                <span className="text-white font-bold">Score:</span>
                <span className="text-[#723EBAFF] font-bold">
                  {" "}
                  {jsonData.front_profile_data.scores.eyes}/10
                </span>
              </p>
              <div className="space-y-4">
                <div className="p-6 rounded-md shadow-md space-y-4">
                  <div className="space-y-2 text-left">
                    {[
                      {
                        label: "Eye Type",
                        value: eyes?.type,
                        className:
                        eyes?.type === "Hunter"
                          ? "text-green-400"
                          : eyes?.type === "almond"
                          ? "text-green-400"
                          : "text-red-500",
                      },
                      {
                        label: "Eye Colour",
                        value: eyes?.colour,
                        className: "text-green-400",
                      },
                      {
                        label: "Canthal Tilt",
                        value: eyes?.canthal_tilt,
                        className:
                        eyes?.canthal_tilt === "positive"
                          ? "text-green-400"
                          : eyes?.canthal_tilt === "neutral"
                          ? "text-yellow-700"
                          : "text-red-500",
                      },
                      {
                        label: "Eyebrow Colour",
                        value: eyes?.eyebrows_colour,
                        className:
                        eyes?.canthal_tilt === "black"
                          ? "text-green-400"
                          : eyes?.canthal_tilt === "dark brown"
                          ? "text-green-400"
                          : "text-yellow-700",
                      },
                      {
                        label: "Eyebrow Symmetry ",
                        value: eyes?.eyebrow_symmetry,
                        className:
                        face?.facial_symmetry === "symetical"
                          ? "text-green-400"
                          : "text-yellow-700",
                      },
                      {
                        label: "Eyebrow Tilt",
                        value: eyes?.eyebrow_tilt,
                        className:
                        eyes?.eyebrow_tilt === "positive"
                          ? "text-green-400"
                          : eyes?.eyebrow_tilt === "neutral"
                          ? "text-yellow-700"
                          : "text-red-500",
                    
                      },
                      {
                        label: "Eyebrow Setness",
                        value: eyes?.eyebrow_setness,
                        className: 
                        eyes?.eyebrow_setness === "Low"
                        ? "text-green-400"
                        : eyes?.eyebrow_setness === "medium"
                        ? "text-yellow-700"
                        : "text-red-500",
                      },
                      {
                        label: "Eyebrow Type",
                        value: eyes?.eyebrow_type,
                        className: "text-green-400",
                      },
                    ].map(({ label, value, className }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center border-[0.5px] border-[#351A5AFF] rounded-3xl px-6 py-2 bg-[#1C2128FF] h-[8%]"
                      >
                        <span className="font-bold text-white">{label}:</span>
                        <span className={`${className} capitalize`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {/* Lips Section */}
            <div className="bg-[#111112FF] p-8 rounded-3xl shadow-lg text-center">
              <h2 className="text-5xl font-bold text-[#723EBAFF] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)] mb-4">
                Lips
              </h2>
              <p className="text-xl font-bold mb-4">
                <span className="text-white font-bold">Score:</span>
                <span className="text-[#723EBAFF] font-bold">
                  {" "}
                  {jsonData.front_profile_data.scores.lips}/10
                </span>
              </p>
              <div className="space-y-4">
                <div className="p-6 rounded-md shadow-md space-y-4">
                  <div className="space-y-2 text-left">
                    {[
                      {
                        label: "Lip Type",
                        value: lips?.type,
                        className: "text-green-400",
                      },
                      {
                        label: "Lips Colour",
                        value: lips?.colour,
                        className: "text-green-400",
                      },
                      {
                        label: "Cupids Bow",
                        value: lips?.cupids_bow,
                        className:
                        lips?.cupids_bow === "present"
                        ? "text-green-400"
                        : "text-red-500",
                      },
                      {
                        label: "Lip Ratios",
                        value: lips?.size,
                        className:
                        lips?.size === "ideal"
                        ? "text-green-400"
                        : "text-red-500",
                      },
                      {
                        label: "Lips Width",
                        value: lips?.width,
                        className:
                        lips?.width === "ideal"
                        ? "text-green-400"
                        : "text-red-500",
                      },
                      {
                        label: "Lip Fullness",
                        value: lips?.fullness,
                        className: lips?.fullness === "Full"
                        ? "text-green-400"
                        : "text-red-500",
                      },
                    ].map(({ label, value, className }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center border-[0.5px] border-[#351A5AFF] rounded-3xl px-6 py-2 bg-[#1C2128FF] h-[8%]"
                      >
                        <span className="font-bold text-white">{label}:</span>
                        <span className={`${className} capitalize`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {/* Lips Section */}
            <div className="bg-[#111112FF] p-8 rounded-3xl shadow-lg text-center">
              <h2 className="text-5xl font-bold text-[#723EBAFF] drop-shadow-[0_0_10px_rgba(105,52,179,0.7)] mb-4">
                Phenotype
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-md shadow-md space-y-4">
                  <div className="space-y-2 text-left">
                    {[
                      {
                        label: "Eyes",
                        value: Phenotype?.eyes,
                        className: "text-green-400",
                      },
                      {
                        label: "Hair Colour",
                        value: Phenotype?.hair,
                        className: "text-green-400",
                      },
                    ].map(({ label, value, className }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center border-[0.5px] border-[#351A5AFF] rounded-3xl px-6 py-2 bg-[#1C2128FF] h-[8%]"
                      >
                        <span className="font-bold text-white">{label}:</span>
                        <span className={`${className} capitalize`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsFront;