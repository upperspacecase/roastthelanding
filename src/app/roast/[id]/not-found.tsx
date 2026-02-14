import { Flame } from "lucide-react";
import Link from "next/link";

export default function RoastNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <Flame className="w-16 h-16 text-flame mx-auto mb-6 opacity-50" />
        <h1 className="text-4xl font-black mb-4">Roast Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          This roast doesn&apos;t exist or has expired. Maybe it was too savage
          and had to be taken down.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-flame hover:bg-flame-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <Flame className="w-5 h-5" />
          Get a Fresh Roast
        </Link>
      </div>
    </div>
  );
}
