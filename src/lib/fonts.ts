import localFont from "next/font/local";

export const vastagoGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/VastagoGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/VastagoGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/VastagoGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/VastagoGrotesk-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/VastagoGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vastago",
  display: "swap",
});
