import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="nl">
      <body className="bg-[#02182B]">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <p className="text-[8rem] md:text-[12rem] font-bold leading-none text-[#d55d25]">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            Pagina niet gevonden
          </h1>
          <p className="text-white/60 mt-4 max-w-md text-lg leading-relaxed">
            De pagina die u zoekt bestaat niet of is verplaatst. Controleer het
            adres of ga terug naar de homepage.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block bg-[#d55d25] text-white font-medium rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
          >
            Terug naar homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
