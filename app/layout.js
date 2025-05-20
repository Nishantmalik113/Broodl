import { Fugaz_One, Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";

const OpenSans = Open_Sans({
  subsets: ["latin"],
});

const Fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ['400']
});

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood everday of the year!",
};
 
export default function RootLayout({ children }) {

  const header =(
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4" >
      <Link href={'/'}>
        <h1 className={'text-base sm:text-lg textGradient '+ Fugaz.className}>Broodl</h1>
      </Link>
      <Logout/>
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-500 ' + Fugaz.className}>
        Created By <abbr title="Github Repo"><a href="www.github.com/nishantmalik113/Broodl" target="black" className="text-indigo-500 hover:underline ">Nishant</a></abbr> With 💛
      </p>
    </footer>
  )


  return (
    <html lang="en">
      <Head/>
      <AuthProvider>
        <body className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + OpenSans.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
