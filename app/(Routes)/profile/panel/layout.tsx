"use client";

import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <title>پنل مدیریتی</title>
         {children}
      </div>
   );
}
