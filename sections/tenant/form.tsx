"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangleIcon,
  Trash,
  Trash2Icon,
  CalendarIcon,
} from "lucide-react";

import useShelterStore from "@/store/shelterStore";
import { cn } from "@/lib/utils";
import { userSchema, type UserFormValues } from "@/lib/form-schema";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserFormType {
  initialData: any | null;
  categories: any;
}

export default function UserForm() {
  const { availableShelters, fetchShelters } = useShelterStore();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  const defaultValues = {
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: undefined,
    gender: undefined,
    members: [
      {
        fullName: "",
        birthDate: undefined,
        gender: undefined,
      },
    ],
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
  } = form;

  const { append, remove, fields } = useFieldArray({
    control,
    name: "members",
  });

  const processForm: SubmitHandler<UserFormValues> = (data) => {
    console.log("data ==>", data);
    setData(data);

    // form.reset();
  };

  type FieldName = keyof UserFormValues;

  const steps = [
    {
      id: "Step 1",
      name: "Personal Information",
      fields: [
        "fullName",
        "address",
        "email",
        "phoneNumber",
        "dateOfBirth",
        "gender",
      ],
    },
    {
      id: "Step 2",
      name: "Members Information",
      fields: fields
        ?.map((_, index) => [
          `members.${index}.fullName`,
          `members.${index}.birthDate`,
          `members.${index}.gender`,
        ])
        .flat(),
    },
    { id: "Step 3", name: "Complete" },
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const onSubmit = (data: UserFormValues) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Create resident account"
          description="Fill in the details to create your resident account"
        />
      </div>
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              currentStep === 1
                ? "w-full md:inline-block"
                : "gap-8 md:grid md:grid-cols-3"
            )}
          >
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Enter full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select birth date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={(data) => {
                              field.onChange(data);
                              setOpen(false);
                            }}
                            fromYear={1960}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
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
                        <Input placeholder="Enter active email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          error={form.formState.errors.password}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
