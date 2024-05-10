"use client";

import Footer from "../_components/footer/Footer";
import Header from "./(home)/header/Header";
import QuizPage from "./(quiz)/QuizPage";
// import Header from "./(home)/header/Header";

export default function Home() {
   return (
      <div className="overflow-hidden min-h-screen flex flex-col justify-between">
         {/* <Header /> */}
         <QuizPage />
         <Footer />
      </div>
   );
}
