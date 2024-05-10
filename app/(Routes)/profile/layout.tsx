"use client";

import { usePathname } from "next/navigation";
import ProfileSidebar, { profilePaths } from "../(profile)/profileSidebar/ProfileSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();

   const condition = profilePaths?.some((item) => pathname == item?.href);

   return (
      <div>
         <title>حساب کاربری</title>
         <div className="custom-container pb-[90px] lg:pb-0">
            <div className="lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))] lg:gap-8 gap-4">
               {/* left side category */}
               {condition && <ProfileSidebar />}

               <div
                  className={`lg:w-full ${
                     !condition ? "lg:col-[span_14_/_span_14]" : "lg:col-span-10"
                  }`}
               >
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
}
