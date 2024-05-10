"use client";

import "@/app/_styles/globals.css";
import "@/app/_styles/font.css";
import Navigation from "../_components/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "../store";
import Footer from "../_components/footer/Footer";
import { useParams, usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import LoginAndRegister from "../_components/common/loginAndRegister/LoginAndRegister";
import { QueryClient, QueryClientProvider } from "react-query";
import GoToTop from "../_components/goToTop/GoToTop";
import { Suspense } from "react";
import Loading from "./loading";
import UserRevokeModal from "../_components/userRevokeModal/UserRevokeModal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();
   const { test } = useParams();

   const queryClient = new QueryClient();

   return (
      <>
         <html lang="fa" suppressHydrationWarning={true}>
            <head>
               <title>نظرسنجی</title>
            </head>
            <body
               className={`!overflow-x-hidden pt-[82px]`}
               dir="rtl"
               suppressHydrationWarning={true}
            >
               <Provider store={store}>
                  <QueryClientProvider client={queryClient}>
                     <Toaster
                        position="bottom-left"
                        reverseOrder={false}
                        gutter={8}
                        containerClassName=""
                        containerStyle={{}}
                        toastOptions={{
                           className: "",
                           duration: 3000,
                           style: {
                              backgroundColor: "#333",
                              color: "white",
                              fontSize: "13px",
                           },
                        }}
                     />
                     <Navigation />
                     <GoToTop />
                     <LoginAndRegister />
                     <UserRevokeModal />
                     {/* <Suspense fallback={<Loading />}></Suspense> */}
                     {children}
                     {pathname !== "/" && !pathname.includes("profile") && !test && <Footer />}
                  </QueryClientProvider>
               </Provider>
            </body>
         </html>
      </>
   );
}
