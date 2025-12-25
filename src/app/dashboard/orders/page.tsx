
'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListFilter, File, Search, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Order, OrderStatus, PaymentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useOrders } from '@/hooks/use-orders';
import { Skeleton } from '@/components/ui/skeleton';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { toast } from '@/hooks/use-toast';


const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case 'Delivered':
      return 'default'; // Green
    case 'Shipped':
    case 'Packed':
      return 'secondary'; // Gray
    case 'Cancelled':
    case 'Returned':
      return 'destructive'; // Red
    case 'Processing':
    case 'Confirmed':
      return 'outline'; // Blue - needs custom color
    default:
      return 'outline';
  }
};

const getPaymentStatusVariant = (status: PaymentStatus) => {
  switch (status) {
    case 'Paid':
      return 'default';
    case 'Pending':
      return 'secondary';
    case 'Failed':
    case 'Refunded':
      return 'destructive';
    default:
      return 'outline';
  }
};

const TABS: { value: OrderStatus | 'all', label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Packed', label: 'Packed' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
];

const ORDER_STATUSES: OrderStatus[] = [
    'Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'
];

export default function OrdersPage() {
    const { orders, loading, error } = useOrders();
    const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');
    const firestore = useFirestore();

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        if (!firestore) return;
        const orderRef = doc(firestore, 'orders', orderId);
        try {
            await updateDoc(orderRef, { orderStatus: newStatus });
            toast({
                title: 'Order Updated',
                description: `Order ${orderId.slice(0, 8)} status changed to ${newStatus}.`
            });
        } catch (err) {
            console.error(err);
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: 'Could not update the order status.'
            });
        }
    };

    const filteredOrders = activeTab === 'all'
        ? orders
        : orders.filter((order) => order.status === activeTab);

    const exportToCSV = (data: Order[]) => {
        const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Date', 'Total', 'Status', 'Items', 'Payment Status'];
        const csvRows = [
            headers.join(','),
            ...data.map(order => [
                order.id,
                `"${order.customerName.replace(/"/g, '""')}"`,
                order.customerEmail,
                order.date,
                order.total,
                order.status,
                order.items,
                order.paymentStatus
            ].join(','))
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'orders.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as OrderStatus | 'all')}>
      <div className="flex items-center">
        <TabsList>
            {TABS.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className={cn(tab.value === 'Cancelled' && 'hidden sm:flex')}>
                    {tab.label}
                </TabsTrigger>
            ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => exportToCSV(filteredOrders)}>
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value={activeTab}>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>A list of all the recent orders in your store.</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : error ? (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center text-red-500 py-8">
                            Error loading orders: {error.message}
                        </TableCell>
                    </TableRow>
                ) : filteredOrders.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                            No orders found for this status.
                        </TableCell>
                    </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            { 'bg-blue-500 text-white hover:bg-blue-600': order.status === 'Processing' || order.status === 'Confirmed' }
                          )}
                          variant={getStatusVariant(order.status)}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/orders/${order.id}`}>View Order</Link>
                            </DropdownMenuItem>
                             <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {ORDER_STATUSES.map(status => (
                                        <DropdownMenuItem
                                            key={status}
                                            onClick={() => handleStatusChange(order.id, status)}
                                            disabled={order.status === status}
                                        >
                                            {status}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
