import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { rootMetadata } from "@/lib/site";

export const metadata: Metadata = rootMetadata("en");

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
