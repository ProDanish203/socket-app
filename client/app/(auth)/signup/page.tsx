"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/API/auth.api";
import { toast } from "sonner";

const SignupPage = () => {
  const [info, setInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "male",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setInfo((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const router = useRouter();
  console.log(info);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
  });

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    // Validations
    if (!info.username) return toast.error("Username is required");
    if (!info.password) return toast.error("Password is required");
    if (!info.email) return toast.error("Email is required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email))
      return toast.error("Invalid Email address");
    if (!info.name) return toast.error("Fullname is required");
    if (!/\s/.test(info.name))
      return toast.error("Please enter your full name (e.g., John Doe)");
    if (info.password.length < 6)
      return toast.error("Password must be atleast 6 characters");
    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(info.password))
      return toast.error(
        "Password must contain at least one uppercase letter, one digit, and one special character"
      );

    const { success, response } = await mutateAsync({
      username: info.username,
      password: info.password,
      email: info.email,
      fullName: info.name,
      gender: "male",
    });
    if (!success) return toast.error(response);
    toast.success("Registration success");
    router.push("/login");
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              name="name"
              value={info.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              required
              name="username"
              value={info.username}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              name="email"
              value={info.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={info.password}
              onChange={handleChange}
              name="password"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>

            <RadioGroup
              defaultValue="option-one"
              className="flex items-center gap-x-4 mt-1"
              onValueChange={handleGenderChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" defaultChecked />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            type="submit"
            className="w-full bg-primaryCol hover:bg-primaryCol/90 mt-2"
            disabled={isPending}
          >
            Create an account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupPage;
