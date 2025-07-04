"use client"

import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../app/redux/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${GeistMono.variable}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
