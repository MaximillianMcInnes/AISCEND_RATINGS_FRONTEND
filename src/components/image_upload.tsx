"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProcessingPopup from "@/components/process";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { uploadFile } from "@/api/uploadToFirebase";
import ResultsSide from "@/components/Results_side";
import ResultsSkin from "@/components/Results_Skin";
import ResultsFront from "@/components/Results_Front";
import { useEffect, useRef } from "react";


const sendImageUrlWithAnalysisType = async (
  url: string,
  analysisType: string,
  email: string,
  abortController: AbortController,
  stopLoading: () => void,
  setError: (error: string) => void,
  setAnalysisData: (data: any) => void
) => {
  const apiUrl = `/api/${analysisType}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
      body: JSON.stringify({ imageUrl: url, analysisType, email }),
    });

    if (response.ok) {
      const data = await response.json();
      setAnalysisData(data);
      console.log("Analysis Data:", data);
      stopLoading();
    } else {
      setError("Failed to send data to backend");
      stopLoading();
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.error("An error occurred:", error);
    }
  }
  
};

export default function ImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [analysisType, setAnalysisType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [email, setEmail] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      // Cancel the request if the component is unmounted
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleFileUpload = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (files.length === 0 || !analysisType || !email) {
      alert(
        "Please upload a file, select an analysis type, and enter your email."
      );
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setUploading(true);
    setLoading(true);
    setError(null);
    setPopupOpen(true);

    const file = files[0];
    const controller = new AbortController();
    setAbortController(controller); // Now correctly typed as AbortController | null

    const url = await uploadFile(file);
    if (url) {
      await sendImageUrlWithAnalysisType(
        url,
        analysisType,
        email,
        controller,
        () => {
          setLoading(false);
          setPopupOpen(false);
        },
        (message) => setError(message),
        (data) => setAnalysisData(data)
      );
    }

    setUploading(false);
  };



  return (
    <>
      <div className="w-full max-w-4xl mx-auto min-h-[600px] border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col justify-center items-center">
        <FileUpload onChange={(uploadedFiles) => setFiles(uploadedFiles)} />
        <ComboboxDemo setAnalysisType={setAnalysisType} />

        <div className="w-full mt-4 flex flex-col items-center gap-6 p-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-[20rem] px-4 py-2 border border-gray-300 rounded-md dark:bg-neutral-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <RainbowButton
            className="w-[20rem] text-lg font-bold text-white"
            onClick={handleFileUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </RainbowButton>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <ProcessingPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-8">
        {analysisType === "skin_analysis" && (
          <ResultsSkin
            analysisType={analysisType}
            jsonData={analysisData}
            loading={loading}
          />
        )}
        {analysisType === "side_profile" && (
          <ResultsSide
            analysisType={analysisType}
            jsonData={analysisData}
            loading={loading}
          />
        )}
        {analysisType === "front_profile" && (
          <ResultsFront
            analysisType={analysisType}
            jsonData={analysisData}
            loading={loading}
          />
        )}
      </div>
    </>
  );
}

const frameworks = [
  { value: "skin_analysis", label: "Skin Analysis" },
  { value: "front_profile", label: "Front Profile" },
  { value: "side_profile", label: "Side Profile" },
];

interface ResultsProps {
  analysisType: string;
  jsonData: any;
  loading: boolean;
}

interface ComboboxDemoProps {
  setAnalysisType: (value: string) => void;
}

export function ComboboxDemo({ setAnalysisType }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          style={{ zIndex: 9999 }}
        >
          <span style={{ color: "black" }}>
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select Analysis..."}
          </span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" style={{ zIndex: 9 }}>
        <Command>
          <CommandInput
            placeholder="Search Facial Analysis..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setAnalysisType(currentValue);
                    setOpen(false);
                  }}
                >
                  <span style={{ color: "black" }}>{framework.label}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

