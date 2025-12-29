import React from "react";

function MainLayout({ children }) {
  return (
    <main className="pt-16">
      {/* 
        - pt-16: عشان الهيدر الـ fixed ما يغطيش أول سكشن
        - bg-light/text-dark: نفس ألوان الـ body
      */}
      {children}
    </main>
  );
}

export default MainLayout;
