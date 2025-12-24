
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  brand: z.string().optional(),
  category: z.string({ required_error: 'Please select a category.' }),
  basePrice: z.coerce.number().positive(),
  discountType: z.enum(['percentage', 'flat']).optional(),
  discountValue: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0),
  images: z.array(z.object({ url: z.string().url({ message: 'Please enter a valid URL.' }) })).min(1, 'Please add at least one image.'),
  primaryImageIndex: z.coerce.number().int().min(0),
  variants: z.array(z.object({
    id: z.string(),
    size: z.string().optional(),
    thickness: z.string().optional(),
    material: z.string().optional(),
    color: z.string().optional(),
    price: z.coerce.number().optional(),
    stock: z.coerce.number().int().min(0),
  })),
  isEnabled: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }),
  seoTitle: z.string().optional(),
  seoMetaDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});

export default function AddProductPage() {
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: 'VSTRADERS',
      basePrice: 0,
      stock: 0,
      images: [{ url: '' }],
      primaryImageIndex: 0,
      variants: [],
      isEnabled: true,
      isFeatured: false,
      isBestSeller: false,
      slug: '',
      seoTitle: '',
      seoMetaDescription: '',
      seoKeywords: '',
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not initialized.' });
      return;
    }

    try {
      const productData = {
        name: values.name,
        description: values.description,
        brand: values.brand || 'VSTRADERS',
        category: values.category,
        basePrice: values.basePrice,
        stock: values.stock,
        images: values.images.map(img => img.url),
        primaryImage: values.images[values.primaryImageIndex]?.url,
        variants: values.variants.map(v => ({...v, stock: Number(v.stock), price: v.price != null ? Number(v.price) : undefined })),
        discount: (values.discountType && values.discountValue && values.discountValue > 0)
          ? { type: values.discountType, value: values.discountValue }
          : null,
        status: {
          isEnabled: values.isEnabled,
          isFeatured: values.isFeatured,
          isBestSeller: values.isBestSeller,
        },
        seo: {
          slug: values.slug,
          title: values.seoTitle || values.name,
          metaDescription: values.seoMetaDescription || values.description,
          keywords: values.seoKeywords?.split(',').map(k => k.trim()).filter(Boolean) || [],
        },
        rating: 0,
        reviewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(firestore, 'products'), productData);

      toast({
        title: 'Product Created',
        description: `The product "${values.name}" has been successfully created.`,
      });
      router.push('/dashboard/products');
    } catch (error: any) {
      console.error('Error adding document: ', error);
      toast({
        variant: 'destructive',
        title: 'Error Creating Product',
        description: error.message || 'There was an issue saving the product to Firestore.',
      });
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/dashboard/products">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Add New Product
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="button" onClick={() => router.push('/dashboard/products')}>
              Discard
            </Button>
            <Button size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Product
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Fill in the core details of your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Micro Fiber Pillow" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="A short description about the product." className="min-h-[100px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="brand" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl><Input placeholder="VSTRADERS" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Add images for your product. The first image will be the primary one.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4">
                      <FormField
                        control={form.control}
                        name={`images.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl><Input placeholder="https://example.com/image.jpg" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="primaryImageIndex"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                             <FormControl>
                                <input type="radio" {...field} value={index} checked={field.value === index} onChange={() => field.onChange(index)} className="form-radio h-4 w-4 text-primary focus:ring-primary"/>
                            </FormControl>
                            <FormLabel className="text-sm font-medium">Primary</FormLabel>
                          </FormItem>
                        )}
                      />
                      {imageFields.length > 1 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                   <Button type="button" variant="outline" size="sm" onClick={() => appendImage({ url: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Image
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Add variants like size, color, or material.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {variantFields.map((field, index) => (
                     <div key={field.id} className="grid grid-cols-2 gap-4 border p-4 rounded-md relative">
                       <FormField control={form.control} name={`variants.${index}.size`} render={({ field }) => (
                          <FormItem><FormLabel>Size</FormLabel><FormControl><Input placeholder="e.g. Small" {...field} /></FormControl></FormItem>
                       )}/>
                       <FormField control={form.control} name={`variants.${index}.color`} render={({ field }) => (
                          <FormItem><FormLabel>Color</FormLabel><FormControl><Input placeholder="e.g. Red" {...field} /></FormControl></FormItem>
                       )}/>
                        <FormField control={form.control} name={`variants.${index}.material`} render={({ field }) => (
                          <FormItem><FormLabel>Material</FormLabel><FormControl><Input placeholder="e.g. Cotton" {...field} /></FormControl></FormItem>
                       )}/>
                       <FormField control={form.control} name={`variants.${index}.thickness`} render={({ field }) => (
                          <FormItem><FormLabel>Thickness</FormLabel><FormControl><Input placeholder="e.g. 6 inch" {...field} /></FormControl></FormItem>
                       )}/>
                       <FormField control={form.control} name={`variants.${index}.price`} render={({ field }) => (
                          <FormItem><FormLabel>Variant Price (Optional)</FormLabel><FormControl><Input type="number" placeholder="Overrides base price" {...field} /></FormControl></FormItem>
                       )}/>
                       <FormField control={form.control} name={`variants.${index}.stock`} render={({ field }) => (
                          <FormItem><FormLabel>Variant Stock</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                       )}/>
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeVariant(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                     </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendVariant({ id: crypto.randomUUID(), stock: 0 })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Variant
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize for search engines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product URL Slug</FormLabel>
                    <FormControl><Input placeholder="e.g. micro-fiber-pillow" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="seoTitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl><Input placeholder="e.g. Soft Micro Fiber Pillow for Great Sleep" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="seoMetaDescription" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Meta Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe your product for search engines." {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="seoKeywords" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Keywords</FormLabel>
                    <FormControl><Input placeholder="pillow, sleep, comfort" {...field} /></FormControl>
                    <FormDescription>Comma-separated keywords.</FormDescription>
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="basePrice" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price</FormLabel>
                    <FormControl><Input type="number" placeholder="₹29.99" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="discountType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="None" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="flat">Flat Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="discountValue" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g. 10 or 100" {...field} /></FormControl>
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category & Stock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {categories.map((cat) => (<SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="stock" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Stock Quantity</FormLabel>
                    <FormControl><Input type="number" placeholder="100" {...field} /></FormControl>
                    <FormDescription>Total stock if no variants have individual stock.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <FormField control={form.control} name="isEnabled" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5"><FormLabel>Enable on Website</FormLabel></div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="isFeatured" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5"><FormLabel>Featured Product</FormLabel></div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="isBestSeller" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5"><FormLabel>Best Seller</FormLabel></div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )} />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
           <Button variant="outline" size="sm" type="button" onClick={() => router.push('/dashboard/products')}>Discard</Button>
          <Button size="sm" type="submit" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
