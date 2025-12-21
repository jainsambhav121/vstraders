import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your store's basic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="VSTRADERS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Support Email</Label>
                <Input id="store-email" type="email" defaultValue="support@vstraders.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipping">
           <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure your shipping rates and zones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-muted-foreground">Shipping configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
           <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>
                Connect and manage your payment providers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-muted-foreground">Payment gateway integrations will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo">
           <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your store for search engines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-muted-foreground">SEO settings will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
