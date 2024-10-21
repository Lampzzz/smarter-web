// "use client";

// import * as z from "zod";
// import { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { useForm } from "react-hook-form";
// import { CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { createUser } from "@/firebase/firestore";
// import { useToast } from "@/hooks/useToast";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import useShelterStore from "@/store/shelterStore";

// const formSchema = z.object({
//   fullName: z.string().min(1, {
//     message: "Full name is required.",
//   }),
//   address: z.string().min(1, {
//     message: "Address is required.",
//   }),
//   email: z.string().min(1, {
//     message: "Email is required.",
//   }),
//   phoneNumber: z.string().min(1, {
//     message: "Phone number is required.",
//   }),
//   dateOfBirth: z.date({
//     required_error: "A date of birth is required.",
//   }),
//   gender: z.enum(["male", "female"], {
//     required_error: "Please select a gender.",
//   }),
//   shelterAssigned: z.string().min(1, {
//     message: "Please assign a shelter.",
//   }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long." })
//     .max(20, { message: "Password cannot exceed 20 characters." })
//     .refine((val) => /[a-z]/.test(val), {
//       message: "Password must include at least one lowercase letter.",
//     })
//     .refine((val) => /[A-Z]/.test(val), {
//       message: "Password must include at least one uppercase letter.",
//     })
//     .refine((val) => /\d/.test(val), {
//       message: "Password must include at least one number.",
//     })
//     .refine((val) => /[@$!%*?&#]/.test(val), {
//       message: "Password must include at least one special character.",
//     }),
// });

// export default function UserForm() {
//   const { availableShelters, fetchShelters } = useShelterStore();

//   useEffect(() => {
//     fetchShelters();
//   }, []);

//   // console.log(availableShelters);

//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fullName: "",
//       gender: undefined,
//       dateOfBirth: undefined,
//       address: "",
//       email: "",
//       phoneNumber: "",
//       shelterAssigned: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setLoading(true);

//     try {
//       await createUser({
//         ...values,
//         dateOfBirth: format(values.dateOfBirth, "yyyy-MM-dd"),
//       });

//       toast({
//         title: "User created",
//         description: "User created successfully",
//       });

//       form.reset();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="mx-auto w-full">
//       <CardHeader>
//         <CardTitle className="text-left text-2xl font-bold">
//           User Information
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <FormField
//                 control={form.control}
//                 name="fullName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Full Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter full name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="dateOfBirth"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Date of birth</FormLabel>
//                     <Popover open={open} onOpenChange={setOpen}>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-full justify-start text-left font-normal",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           <CalendarIcon className="mr-2 h-4 w-4" />
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Select birth date</span>
//                           )}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent align="start" className=" w-auto p-0">
//                         <Calendar
//                           mode="single"
//                           captionLayout="dropdown-buttons"
//                           selected={field.value}
//                           onSelect={(data) => {
//                             field.onChange(data);
//                             setOpen(false);
//                           }}
//                           fromYear={1960}
//                           toYear={2030}
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="gender"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Gender</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a gender" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="address"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Address</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter address" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter active email" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone Number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter phone number" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter password"
//                         error={form.formState.errors.password}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="shelterAssigned"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Shelter Assigned</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a shelter" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {availableShelters?.map((shelter) => (
//                           <SelectItem key={shelter.id} value={shelter.id!}>
//                             {shelter?.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <Button type="submit" disabled={loading}>
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }
