
'use client';

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
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/dashboard/stats-card';
import SalesChart from '@/components/dashboard/sales-chart';
import { DollarSign, Package, Users, CreditCard } from 'lucide-react';
import { useOrders } from '@/hooks/use-orders';
import { useUsers } from '@/hooks/use-users';
import { useProducts } from '@/hooks/use-products';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { orders, loading: ordersLoading } = useOrders();
  const { users, loading: usersLoading } = useUsers();
  const { products, loading: productsLoading } = useProducts();

  const recentOrders = orders.slice(0, 5);
  const loading = ordersLoading || usersLoading || productsLoading;
  
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalSales = orders.length;
  const totalCustomers = users.length;
  const totalProducts = products.length;


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
            <>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle><DollarSign className="text-muted-foreground h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-1/2 mt-1" /></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Sales</CardTitle><Package className="text-muted-foreground h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-1/2 mt-1" /></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">New Customers</CardTitle><Users className="text-muted-foreground h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-1/2 mt-1" /></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Now</CardTitle><CreditCard className="text-muted-foreground h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-1/2 mt-1" /></CardContent></Card>
            </>
        ) : (
           <>
            <StatsCard
              title="Total Revenue"
              value={`₹${totalRevenue.toLocaleString('en-IN')}`}
              change="+20.1% from last month"
              icon={<DollarSign />}
            />
            <StatsCard
              title="Sales"
              value={`+${totalSales.toLocaleString('en-IN')}`}
              change="+19% from last month"
              icon={<Package />}
            />
            <StatsCard
              title="New Customers"
              value={`+${totalCustomers.toLocaleString('en-IN')}`}
              change="+180.1% from last month"
              icon={<Users />}
            />
            <StatsCard
              title="Active Now"
              value="+573"
              change="+201 since last hour"
              icon={<CreditCard />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made {totalSales} sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-12 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
