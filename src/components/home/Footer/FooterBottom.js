import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#317248] group">
      <div className="max-w-container mx-auto border-t-[1px] pt-2 pb-4">
        {/* Top Section - Copyright */}
        <div className="text-titleFont font-normal text-center flex md:items-center justify-center text-[#f9cc1f] duration-200 text-sm mb-2">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2024 | Jhang Rang Online Store | All Rights Reserved
        </div>
        {/* Bottom Section - Designed by */}
        <div className="text-titleFont font-normal text-center flex md:items-center justify-center text-[#f9cc1f] duration-200 text-sm">
            <span className="ml-1 font-medium group-hover:text-primeColor">
              Designed & Created by Haseeb Khan Baloch
            </span>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
