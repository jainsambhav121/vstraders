
import { Store } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-primary">
      <div className="animate-pulse">
        <Store className="h-24 w-24" />
      </div>
      <h1 className="mt-4 font-headline text-3xl font-bold">VSTRADERS</h1>
    </div>
  );
}
