import { ReactNode } from 'react';
import LoginButton from '../auth/LoginButton';
import { Camera, History, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Page = 'selfie' | 'history' | 'workouts';

interface AppLayoutProps {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/app-icon.dim_512x512.png" 
              alt="LooksMax Pro" 
              className="w-10 h-10 rounded-lg"
            />
            <h1 className="text-xl font-bold tracking-tight">LooksMax Pro</h1>
          </div>
          <LoginButton />
        </div>
      </header>

      <nav className="border-b bg-card">
        <div className="container px-4">
          <div className="flex gap-1 py-2">
            <Button
              variant={currentPage === 'selfie' ? 'default' : 'ghost'}
              onClick={() => onNavigate('selfie')}
              className="flex-1 sm:flex-none"
            >
              <Camera className="mr-2 h-4 w-4" />
              Selfie
            </Button>
            <Button
              variant={currentPage === 'history' ? 'default' : 'ghost'}
              onClick={() => onNavigate('history')}
              className="flex-1 sm:flex-none"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button
              variant={currentPage === 'workouts' ? 'default' : 'ghost'}
              onClick={() => onNavigate('workouts')}
              className="flex-1 sm:flex-none"
            >
              <Dumbbell className="mr-2 h-4 w-4" />
              Workouts
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container px-4 py-8">
        {children}
      </main>

      <footer className="border-t py-6 bg-card">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          © 2026. Built with ❤️ using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
