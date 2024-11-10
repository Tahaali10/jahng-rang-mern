import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full bg-[#317248] py-3">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-3 gap-3">
        <div className="col-span-2">
          <div className="flex flex-col gap-3">

            <ul className="flex items-center gap-1">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-[#f9cc1f] text-[#317248] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaYoutube />
                </li>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-[#f9cc1f] text-[#317248] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-[#f9cc1f] text-[#317248] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-[#f9cc1f] text-[#317248] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaTiktok />
                </li>
              </a>
            </ul>
          </div>
        </div>

        <div className="col-span-2 flex flex-col items-left w-full">
          <FooterListTitle title="Contact on Whatsapp: 03211949184" />
          <div className="w-full">
            <h5 className="text-left mb-0 text-[#f9cc1f]">
              <div style={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "10px" }}>
               Home Delivery Available: 03211949184</div>
              For Payment Use <br />
              EasyPaisa Account no: 03423049078 <br />
              SadaPay Account no: 03211949184 <br />
              MCB Bank Account no: 1476516201005196

            </h5>
            <Image
              className="w-[40%] lg:w-[20%] ml-0 "
              imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
