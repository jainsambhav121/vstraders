
'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSettings } from '@/hooks/use-settings';

export default function TermsPage() {
  const { settings, loading } = useSettings();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Terms of Service</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl md:text-4xl">
            Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <div
              className="prose max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: settings?.termsAndConditions.replace(/\n/g, '<br />') || '' }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
