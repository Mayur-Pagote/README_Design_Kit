import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Layers } from "lucide-react";
import { toast } from "sonner";
import {
  buildPackMarkdown,
  type ThemePack,
  type ThemePackComponent,
} from "@/data/themePacks";

interface ThemePackCardProps {
  pack: ThemePack;
  username: string;
  repo: string;
}

function format(text: string, username: string, repo: string) {
  return text
    .replace(/\{username\}/g, username || "your-username")
    .replace(/\{repo\}/g, repo || "your-repo");
}

function CopyButton({
  label,
  getText,
  fullWidth = false,
}: {
  label: string;
  getText: () => string;
  fullWidth?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast(`Copied! ${label} added to your clipboard.`);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      toast("Failed to copy, please try again.");
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleCopy}
      variant={copied ? "default" : "secondary"}
      className={`${fullWidth ? "w-full" : ""} ${
        copied ? "bg-green-500 hover:bg-green-600 text-white" : ""
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" /> Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" /> {label}
        </>
      )}
    </Button>
  );
}

function ComponentRow({
  component,
  username,
  repo,
}: {
  component: ThemePackComponent;
  username: string;
  repo: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="font-semibold text-foreground">{component.title}</h4>
          <p className="text-sm text-muted-foreground">{component.description}</p>
        </div>
        <CopyButton
          label="Copy"
          getText={() => format(component.codeSnippet, username, repo)}
        />
      </div>
      <div className="rounded-lg bg-background border border-border p-3 flex items-center justify-center overflow-hidden">
        <img
          src={format(component.imageUrl, username, repo)}
          alt={component.title}
          className="max-w-full max-h-32 object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function ThemePackCard({
  pack,
  username,
  repo,
}: ThemePackCardProps) {
  const { banner, badges, divider } = pack.components;

  return (
    <section
      id={pack.id}
      className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
    >
      {/* Accent strip from the pack's palette */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${pack.colors
            .map((c) => `#${c}`)
            .join(", ")})`,
        }}
      />

      <div className="p-6 flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">{pack.name}</h2>
              <div className="flex gap-1">
                {pack.colors.map((c) => (
                  <span
                    key={c}
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: `#${c}` }}
                    title={`#${c}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">{pack.description}</p>
          </div>

          <CopyButton
            label="Copy full pack"
            getText={() => buildPackMarkdown(pack, username, repo)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ComponentRow component={banner} username={username} repo={repo} />
          <ComponentRow component={badges} username={username} repo={repo} />
          <ComponentRow component={divider} username={username} repo={repo} />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Layers className="w-4 h-4" />
          Copy each piece individually, or grab the whole coordinated set with
          &ldquo;Copy full pack&rdquo;.
        </div>
      </div>
    </section>
  );
}
