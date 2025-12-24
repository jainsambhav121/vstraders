
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
import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import React, { useEffect } from 'react';
import { useProducts } from '@/hooks/use-products';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirestore } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';


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
  details: z.array(z.object({
    label: z.string().min(1, 'Label cannot be empty'),
    value: z.string().min(1, 'Value cannot be empty'),
  })),
  isEnabled: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }),
  seoTitle: z.string().optional(),
  seoMetaDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});


export default function EditProductPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const firestore = useFirestore();

  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === id);

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
      details: [],
      isEnabled: true,
      isFeatured: false,
      isBestSeller: false,
      slug: '',
      seoTitle: '',
      seoMetaDescription: '',
      seoKeywords: '',
    },
  });

  useEffect(() => {
    if (product) {
      const primaryImageIndex = product.images.findIndex(img => img === product.primaryImage);
      form.reset({
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        basePrice: product.basePrice,
        discountType: product.discount?.type,
        discountValue: product.discount?.value,
        stock: product.stock,
        images: product.images.map(url => ({ url })),
        primaryImageIndex: primaryImageIndex === -1 ? 0 : primaryImageIndex,
        variants: product.variants,
        details: product.details || [],
        isEnabled: product.status.isEnabled,
        isFeatured: product.status.isFeatured,
        isBestSeller: product.status.isBestSeller,
        slug: product.seo.slug,
        seoTitle: product.seo.title,
        seoMetaDescription: product.seo.metaDescription,
        seoKeywords: Array.isArray(product.seo.keywords) ? product.seo.keywords.join(', ') : '',
      });
    }
  }, [product, form]);

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants",
  });
  
  const { fields: detailFields, append: appendDetail, remove: removeDetail } = useFieldArray({
    control: form.control,
    name: "details",
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !id) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not initialized or Product ID is missing.' });
      return;
    }
    
    try {
      const productRef = doc(firestore, 'products', id as string);
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
        details: values.details,
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
        updatedAt: serverTimestamp(),
      };

      await updateDoc(productRef, productData);
      toast({
        title: 'Product Updated',
        description: `The product "${values.name}" has been successfully updated.`,
      });
      router.push('/dashboard/products');
    } catch (error: any) {
      console.error('Error updating document: ', error);
      toast({
        variant: 'destructive',
        title: 'Error updating product',
        description: error.message || 'There was an issue saving the product to Firestore.',
      });
    }
  }
  
  const { isSubmitting } = form.formState;


  if (loading) {
    return (
      <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-6 w-48" />
        </div>
         <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card><CardHeader><Skeleton className="h-5 w-40" /></CardHeader><CardContent><div className="space-y-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-20 w-full" /></div></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-5 w-40" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
            </div>
             <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card><CardHeader><Skeleton className="h-5 w-32" /></CardHeader><CardContent><Skeleton className="h-16 w-full" /></CardContent></Card>
             </div>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound();
  }

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
            Edit Product
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="button" onClick={() => router.push('/dashboard/products')}>Discard Changes</Button>
            <Button size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Update the core details of your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="brand" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
                <CardDescription>Add key-value details for the product.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detailFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-2 gap-4 items-center">
                       <FormField
                        control={form.control}
                        name={`details.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                             <FormLabel className={index !== 0 ? 'sr-only' : ''}>Label</FormLabel>
                            <FormControl><Input placeholder="e.g. Size" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <div className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name={`details.${index}.value`}
                            render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel className={index !== 0 ? 'sr-only' : ''}>Value</FormLabel>
                                <FormControl><Input placeholder="e.g. 16 x 24 inch" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <Button type="button" variant="ghost" size="icon" className="mt-8" onClick={() => removeDetail(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                         </Button>
                       </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendDetail({ label: '', value: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Specification
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Update images for your product. The first image will be the primary one.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4">
                       <Image
                        src={form.watch(`images.${index}.url`) || "https://placehold.co/80x80"}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="aspect-square rounded-md object-cover"
                      />
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
                                <input type="radio" {...field} value={index} checked={Number(field.value) === index} onChange={() => field.onChange(index)} className="form-radio h-4 w-4 text-primary focus:ring-primary"/>
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
                <CardDescription>Update variants like size, color, or material.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {variantFields.map((field, index) => (
                     <div key={field.id} className="grid grid-cols-2 gap-4 border p-4 rounded-md relative">
                       <FormField control={form.control} name={`variants.${index}.size`} render={({ field }) => (
                          <FormItem><FormLabel>Size</FormLabel><FormControl><Input placeholder="e.g. Small" {...field} value={field.value || ''} /></FormControl></FormItem>
                       )}/>
                       <FormField control={form.control} name={`variants.${index}.color`} render={({ field }) => (
                          <FormItem><FormLabel>Color</FormLabel><FormControl><Input placeholder="e.g. Red" {...field} value={field.value || ''}/></FormControl></FormItem>
                       )}/>
                        <FormField control={form.control} name={`variants.${index}.material`} render={({ field }) => (
                          <FormItem><FormLabel>Material</FormLabel><FormControl><Input placeholder="e.g. Cotton" {...field} value={field.value || ''}/></FormControl></FormItem>
                       )}/>
                       <FormField control={form.control} name={`variants.${index}.thickness`} render={({ field }) => (
                          <FormItem><FormLabel>Thickness</FormLabel><FormControl><Input placeholder="e.g. 6 inch" {...field} value={field.value || ''}/></FormControl></FormItem>
                       )}/>
                       <FormField control={form.control} name={`variants.${index}.price`} render={({ field }) => (
                          <FormItem><FormLabel>Variant Price (Optional)</FormLabel><FormControl><Input type="number" placeholder="Overrides base price" {...field} value={field.value || ''}/></FormControl></FormItem>
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
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="seoTitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl><Input {...field} value={field.value || ''} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="seoMetaDescription" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Meta Description</FormLabel>
                    <FormControl><Textarea {...field} value={field.value || ''} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="seoKeywords" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Keywords</FormLabel>
                    <FormControl><Input {...field} value={field.value || ''} /></FormControl>
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
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="discountType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                      <FormControl><Input type="number" {...field} value={field.value || ''} /></FormControl>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <FormControl><Input type="number" {...field} /></FormControl>
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
          <Button variant="outline" size="sm" type="button" onClick={() => router.push('/dashboard/products')}>Discard Changes</Button>
          <Button size="sm" type="submit" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}

    
