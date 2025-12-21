import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">404</h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
