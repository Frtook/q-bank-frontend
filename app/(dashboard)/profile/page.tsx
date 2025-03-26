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
import { useGetProfile, useUpdateProfile } from "@/hook/useProfile";
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
      <div className="p-10 h-60 bg-gradient-to-r  rounded-xl   from-[#0C7FDA] to-white text-[#E9F5FE]">
        <p className="font-semibold">{profile?.username}</p>
        <p className="font-bold text-3xl mt-5">{profile?.fullname}</p>
        <p className="text-gray-300 text-xl ">{profile?.email}</p>
      </div>
      <div className="p-4">
        <p className="font-bold text-xl">Personal info</p>
        <p className="text-gray-500 mt-4">
          Update your photo and personal details.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 mt-5 bg-white rounded-xl"
          >
            <div className="grid grid-cols-2 gap-5 ">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="your Full Name" {...field} />
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
                      <Input placeholder="your Username" {...field} />
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
                      <Input type="email" placeholder="your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex mt-5 gap-5 justify-end">
              <Link href="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
