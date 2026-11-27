import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { rootMetadata } from "@/lib/site";

export const metadata: Metadata = rootMetadata("bg");

export default function BgRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="bg">{children}</RootShell>;
}
