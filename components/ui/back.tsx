'use client'
import { useState, useEffect } from 'react'
import { Button } from "./button";
import { ChevronLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BackButtonNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigation = () => {
    router.back();
  };

  // State to track whether to show the back button
  // const [showBackButton, setShowBackButton] = useState(true);

  // Create a Framer Motion control for the button
  // const buttonControls = useAnimation();

  // // Function to animate the button
  // const animateButton = () => {
  //   buttonControls.start({ opacity: 1 });
  // };

  // // Function to hide the button with animation
  // const hideButton = () => {
  //   buttonControls.start({ opacity: 0 });
  // };

  // Add a scroll event listener to toggle the button's visibility
  // useEffect(() => {
  //   let lastScrollPosition = 0;

  //   const handleScroll = () => {
  //     const currentScrollPosition = window.scrollY;

  //     if (currentScrollPosition < lastScrollPosition) {
  //       // User is scrolling up, show the button with animation
  //       setShowBackButton(true);
  //       animateButton();
  //     } else {
  //       // User is scrolling down, hide the button with animation
  //       setShowBackButton(false);
  //       hideButton();
  //     }

  //     lastScrollPosition = currentScrollPosition;
  //   };

  //   // Attach the scroll event listener
  //   window.addEventListener("scroll", handleScroll);

  //   // Clean up the event listener on unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // Get the current pathname
  const isHomePage = pathname === '/';

  // Render the navigation only if the route is not '/'
  // if (isHomePage || !showBackButton) {
  //   return null;
  // }
  if (isHomePage) {
    return null;
  }
  return (



    <div className=' p-4 md:px-6 lg:px-8 '>
      <Button onClick={handleNavigation} variant='outline' className=" p-3  rounded-lg shadow-2xl gap-1">
        <ChevronLeftIcon className="w-4 h-4 text-foreground-muted" /> Back
      </Button>
    </div>





  );
};

export default BackButtonNavigation;