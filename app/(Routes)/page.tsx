"use client";

import Footer from "../_components/footer/Footer";
import QuizPage from "./(quiz)/QuizPage";
// import Header from "./(home)/header/Header";

export default function Home() {
   return (
      <div className="overflow-hidden">
         {/* <Header /> */}
         <QuizPage />
         <Footer />
      </div>
   );
}
