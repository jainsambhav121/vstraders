
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 text-center overflow-hidden">
      <div className="relative">
          <div className="absolute -inset-8 animate-[spin_30s_linear_infinite]">
              <div className="absolute h-12 w-12 rounded-full bg-primary/10 top-0 left-1/4"></div>
              <div className="absolute h-8 w-8 rounded-full bg-primary/20 top-1/2 left-0"></div>
              <div className="absolute h-10 w-10 rounded-full bg-accent bottom-0 right-1/4"></div>
          </div>
          <Rocket className="h-24 w-24 text-primary animate-pulse" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground">
          Oops! The page you are looking for has ventured into the unknown.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Return to Home Base</Link>
      </Button>
    </div>
  );
}
