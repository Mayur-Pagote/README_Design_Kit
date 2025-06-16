import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          README Design Kit
        </h1>
        <DarkModeToggle />
      </div>
    </header>
  );
}
