import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import LoginButton from './components/auth/LoginButton';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import AuthenticatedOnly from './components/auth/AuthenticatedOnly';
import AppLayout from './components/layout/AppLayout';
import SelfiePage from './features/selfie/SelfiePage';
import HistoryPage from './features/history/HistoryPage';
import WorkoutsPage from './features/workouts/WorkoutsPage';
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

type Page = 'selfie' | 'history' | 'workouts';

export default function App() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [currentPage, setCurrentPage] = useState<Page>('selfie');

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
              <img 
                src="/assets/generated/app-icon.dim_512x512.png" 
                alt="LooksMax Pro" 
                className="w-24 h-24 mx-auto rounded-2xl shadow-lg"
              />
              <h1 className="text-4xl font-bold tracking-tight">
                LooksMax Pro
              </h1>
              <p className="text-lg text-muted-foreground">
                Elevate your appearance. Get personalized home workouts. Transform yourself.
              </p>
            </div>
            <div className="pt-4">
              <LoginButton />
            </div>
            <p className="text-sm text-muted-foreground">
              Sign in to start your looksmaxxing journey
            </p>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthenticatedOnly>
        <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
          {currentPage === 'selfie' && <SelfiePage />}
          {currentPage === 'history' && <HistoryPage />}
          {currentPage === 'workouts' && <WorkoutsPage />}
        </AppLayout>
        {showProfileSetup && <ProfileSetupModal />}
      </AuthenticatedOnly>
      <Toaster />
    </ThemeProvider>
  );
}
