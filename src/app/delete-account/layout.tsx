import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BibliotekaPlus — Delete Account",
  description: "How to delete your BibliotekaPlus (Бібліотека+) account.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
