import React from "react";
import Image from "next/image";
import Background from "@/app/_assets/other/footer/background.png";
import telegram from "@/app/_assets/other/footer/telegram.svg";
import eta from "@/app/_assets/other/footer/eta.svg";
import instagram from "@/app/_assets/other/footer/instagram.svg";
import nody from "@/app/_assets/other/footer/nody.svg";
import bale from "@/app/_assets/other/footer/bale.svg";
import Link from "next/link";

const Footer = () => {
   return (
      <div className="relative bg-[#334255] lg:px-0 px-4 h-fit py-16 mt-16 lg:mt-0 z-[1]">
         <div className="custom-container">
            <div className="w-full flex flex-col lg:flex-row lg:justify-between">
               <p className="textSm leading-[32px] text-white w-full lg:max-w-[480px] text-justify px-1 mb-4 pb-4 lg:mb-0 lg:pb-0 border-b lg:border-b-0 border-b-[#ffffff36]">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                  گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                  برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
                  می باشد
               </p>
               <div>
                  <p className="textMd lg:text-right text-center  text-white mb-6">
                     با ما همراه باشید
                  </p>
                  <div className="flex justify-center lg:justify-start mb-8">
                     {[
                        //
                        { image: instagram, href: "" },
                        { image: nody, href: "" },
                        { image: eta, href: "" },
                        { image: bale, href: "" },
                        { image: telegram, href: "" },
                     ].map((src, index) => (
                        <a key={index} href={src.href} target="_blank">
                           <Image
                              src={src.image}
                              alt={`social-${index}`}
                              className="ml-6 text-white"
                           />
                        </a>
                     ))}
                  </div>
                  <p className="textMd font-light  text-center lg:text-right text-white mb-6">
                     ima.info@gmail.com
                  </p>
               </div>
            </div>
            {/* bottom */}
            <div className="w-full bg-[#2A3546] max-w-[2000px] absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[52px]">
               <p className="textXs text-white">تمام حقوق مادی و معنوی این سایت متعلق به است.</p>
            </div>
         </div>
      </div>
   );
};

export default Footer;
