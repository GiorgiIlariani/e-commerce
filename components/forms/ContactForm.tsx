"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactFormSchema } from "@/lib/validator";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactPageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      from_name: "",
      from_email: "",
      phone_number: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsLoading(true);
    emailjs
      .sendForm(
        "service_ydo16fc",
        "template_p1swnr6",
        formRef.current as HTMLFormElement,
        "qBO3LD8BynnNJI19X"
      )
      .then(
        () => {
          toast.success("Message sent succesfully!", {
            position: "top-center",
            autoClose: 3000,
          });
          form.reset();
        },
        () => {
          toast.error("Something went wrong!", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        ref={formRef}>
        <FormField
          control={form.control}
          name="from_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="contact-input-field"
                  placeholder="name"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="from_email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="contact-input-field"
                  placeholder="email"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="contact-input-field"
                  placeholder="Phone number"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className="contact-input-field"
                  rows={5}
                  placeholder="write text"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <Button className="w-full bg-[#fec900] rounded-3xl py-6 text-white text-center font-medium hover:bg-[#ffdb4d]">
          {isLoading ? "sending..." : "send"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactPageForm;
