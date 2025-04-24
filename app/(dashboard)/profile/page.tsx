"use client";
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
import { useGetProfile, useUpdateProfile } from "@/hooks/useProfile";
import { schemaProfile, TschemaProfile } from "@/lib/validations/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const { data: profile } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const form = useForm({
    resolver: zodResolver(schemaProfile),
    defaultValues: { fullname: "", email: "", username: "" },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullname: profile.fullname,
        email: profile.email,
        username: profile.username,
      });
    }
  }, [profile, form]);

  const onSubmit = (data: TschemaProfile) => updateProfile(data);
  return (
    <div className="space-y-5">
      <div className="h-60 rounded-xl bg-gradient-to-r from-[#0C7FDA] to-white p-10 text-[#E9F5FE]">
        <p className="font-semibold">{profile?.username}</p>
        <p className="mt-5 text-3xl font-bold">{profile?.fullname}</p>
        <p className="text-xl text-gray-300">{profile?.email}</p>
      </div>
      <div className="p-4">
        <p className="text-xl font-bold">Personal info</p>
        <p className="mt-4 text-gray-500">
          Update your photo and personal details.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 rounded-xl bg-white p-4"
          >
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5 flex justify-end gap-5">
              <Link href="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
