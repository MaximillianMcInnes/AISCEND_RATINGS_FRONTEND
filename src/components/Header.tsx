"use client";
import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandLinkedin, IconHome, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";

export function FloatingDockDemo() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  // Control the visibility of the header based on scroll direction
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious() ?? 0; // Use 0 as a fallback if undefined
      const direction = current - previous;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true); // Show on scroll up
        } else {
          setVisible(false); // Hide on scroll down
        }
      }
    }
  });

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/", // Link to homepage
    },
    {
      title: "About",
      icon: <Image src="https://aiscend.co.uk/logo.png" alt="AIScend Logo" width={24} height={24} className="h-full w-full" />,
      href: "https://aiscend.co.uk/", // Link to About page
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.linkedin.com/company/105076668/admin/dashboard/", // Link to LinkedIn
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "mailto:maxmcinnes08@gmail.com", // Opens the email client
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-2 left-0 w-full z-50 bg-white shadow-md"
        >
          <div className="flex items-center justify-center w-full">
            <FloatingDock
              mobileClassName="" // only for demo, remove for production
              items={links}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
