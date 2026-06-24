import { useState } from "react";
import UserInput from "@/components/UserInput";
import ThemePackCard from "@/components/ThemePackCard";
import { themePacks } from "@/data/themePacks";

export default function ThemePacks() {
  const [username, setUsername] = useState("Mayur-Pagote");
  const [repo, setRepo] = useState("README_Design_Kit");

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Theme Packs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated bundles of matching banners, badges, and dividers that share
              one visual language. Pick a pack and copy a coordinated set instead of
              stitching together mismatched components.
            </p>
          </div>
        </div>
      </div>

      <UserInput
        onUsernameChange={(u) => setUsername(u)}
        onRepoChange={(r) => setRepo(r)}
        defaultUsername="Mayur-Pagote"
        defaultRepo="README_Design_Kit"
      />

      {/* Quick jump */}
      <div className="container mx-auto px-6 pt-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Jump to:</span>
          {themePacks.map((pack) => (
            <a
              key={pack.id}
              href={`#${pack.id}`}
              className="text-sm px-3 py-1 rounded-full border border-border hover:bg-accent/40 transition-colors"
            >
              {pack.name}
            </a>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto px-6 py-8 flex flex-col gap-8">
        {themePacks.map((pack) => (
          <ThemePackCard
            key={pack.id}
            pack={pack}
            username={username}
            repo={repo}
          />
        ))}
      </div>

      {/* Mix & extend note */}
      <div className="container mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-border bg-muted/30 p-6 max-w-3xl mx-auto">
          <h3 className="font-semibold text-foreground mb-2">
            Mixing &amp; extending packs
          </h3>
          <p className="text-sm text-muted-foreground">
            Packs are a starting point, not a cage. Keep a consistent look by reusing
            one pack&apos;s accent colors across any extra components you add, or mix a
            banner from one pack with badges from another as long as the palettes
            agree. Full guidance — including how to author your own pack — lives in{" "}
            <code className="text-foreground">docs/theme-packs.md</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
