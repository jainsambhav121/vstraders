
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, Bot } from 'lucide-react';
import Link from 'next/link';
import Chatbot from '@/components/chatbot';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Contact Us
        </h1>
        <p className="mt-2 text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
          We&apos;d love to hear from you. Get in touch with us.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card className="animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-400">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Our Address</h3>
                  <p className="text-muted-foreground">
                    Ashok Kutir, J-3/48, Arvind Nagar, Yamuna Vihar, Shahdara,
                    New Delhi, Delhi, 110053
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <a
                    href="mailto:vstrader418@gmail.com"
                    className="text-muted-foreground hover:text-primary"
                  >
                    vstrader418@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a
                    href="tel:+917217619150"
                    className="text-muted-foreground hover:text-primary"
                  >
                    +91 7217619150
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Instant Support</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row">
                 <Button asChild className="w-full" variant="outline">
                    <Link href="https://wa.me/917217619150" target="_blank">
                        <MessageSquare className="mr-2" /> WhatsApp
                    </Link>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
