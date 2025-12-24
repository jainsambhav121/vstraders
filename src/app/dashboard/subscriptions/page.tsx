
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { File, Loader2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface Subscription {
  id: string;
  email: string;
  subscribedAt: string;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;

    const subscriptionsQuery = query(collection(firestore, 'subscriptions'));
    const unsubscribe = onSnapshot(subscriptionsQuery, (snapshot) => {
      const subsData: Subscription[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email,
          subscribedAt: data.subscribedAt instanceof Timestamp 
            ? data.subscribedAt.toDate().toLocaleDateString() 
            : 'N/A',
        }
      });
      setSubscriptions(subsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching subscriptions: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);
  
  const exportToCSV = () => {
    const headers = ['Email', 'Subscription Date'];
    const rows = subscriptions.map(sub => [sub.email, sub.subscribedAt]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscriptions.csv");
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Newsletter Subscriptions</CardTitle>
                <CardDescription>A list of all email addresses subscribed to your newsletter.</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={exportToCSV}>
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead className="text-right">Subscription Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                    </TableRow>
                ))
            ) : subscriptions.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                        No subscriptions yet.
                    </TableCell>
                </TableRow>
            ) : (
              subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.email}</TableCell>
                  <TableCell className="text-right">{sub.subscribedAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
