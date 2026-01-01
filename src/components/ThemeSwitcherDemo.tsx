import { Laptop2, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeSwitcherDemo() {
  const { theme, setTheme, systemTheme } = useTheme()
  const resolvedTheme = theme === "system" ? systemTheme : theme

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Theme switcher demo</p>
          <h3 className="text-2xl font-semibold">Light · Dark · System</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Toggle themes to see how the kit adapts instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={resolvedTheme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            aria-pressed={resolvedTheme === "light"}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </Button>
          <Button
            variant={resolvedTheme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            aria-pressed={resolvedTheme === "dark"}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </Button>
          <Button
            variant={theme === "system" ? "default" : "outline"}
            onClick={() => setTheme("system")}
            aria-pressed={theme === "system"}
          >
            <Laptop2 className="mr-2 h-4 w-4" />
            System
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-background p-4">
          <p className="mb-2 text-sm text-muted-foreground">Current theme</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold capitalize">{resolvedTheme}</p>
              <p className="text-sm text-muted-foreground">
                Using {theme === "system" ? "system preference" : "manual override"}.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full border border-dashed" />
          </div>
        </div>

        <div className="rounded-xl border bg-background p-4">
          <p className="mb-2 text-sm text-muted-foreground">Preview</p>
          <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
            <div className="h-3 w-20 rounded-full bg-foreground/60" />
            <div className="h-3 w-32 rounded-full bg-foreground/40" />
            <div className="h-3 w-16 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
