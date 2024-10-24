"use client";

import * as z from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useManagerStore from "@/store/managerStore";
import { Textarea } from "@/components/ui/textarea";
import PageContainer from "@/components/layout/page-container";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAuthStore from "@/store/authStore";
import { createAnnouncement } from "@/firebase/firestore/announcement";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Required",
  }),
  description: z.string().min(1, {
    message: "Required",
  }),
  recipient: z.string().min(1, {
    message: "Required",
  }),
  category: z.string().min(1, {
    message: "Required",
  }),
});

export default function MessageNewForm() {
  const router = useRouter();
  const { managers, fetchManagers } = useManagerStore();
  const { currentUser } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      recipient: "",
      category: "",
    },
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify({ ...data, senderId: currentUser?.id }, null, 2));

    try {
      const response = await createAnnouncement({
        ...data,
        senderId: currentUser?.authId,
      });

      if (response.success) {
        router.replace("/dashboard/message");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          New Announcement
        </CardTitle>
        <CardTitle className="text-left text-sm text-muted-foreground">
          Compose and distribute important updates to residents
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="updates">Updates</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="policies">Policies</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {managers?.map((manager) => (
                          <SelectItem key={manager.id} value={manager.id!}>
                            {manager.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description..."
                          rows={5}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
