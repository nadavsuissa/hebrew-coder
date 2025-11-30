import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

const heebo = Heebo({ 
  subsets: ["hebrew", "latin"],
  display: 'swap', // Improve font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Hebrew Code Monkey",
  description: "Learn Python in Hebrew",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress harmless Pyodide source map errors
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = function(...args) {
                  const message = args.join(' ');
                  // Filter out known harmless errors to keep console clean
                  if (
                    (message.includes('Source map error') && message.includes('pyodide.asm.js')) ||
                    (message.includes('URL constructor') && message.includes('pyodide.asm.js'))
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={`${heebo.className} bg-slate-950 text-slate-100 transition-colors duration-300`}>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}
