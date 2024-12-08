"use client";

import { useState } from "react";
import { Methods } from "@/constants/enum";
import { useSignupService } from "@/services";
import { Title, Text, Image } from "@/components/atoms";
import { Illustration, Input } from "@/components/molecules";
import AUTO_APPLY_LOGO from "@/assets/images/auto-apply-logo.webp";

export default function Signup() {
    /* STATES */
    const [{ firstName, lastName, email, password }, setSignupDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    /* SERVICES */
    const { signup } = useSignupService();

    /* HANDLERS */
    const onSignupDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignup = () => {
        signup({
            method: Methods.POST,
            url: "/auth/register",
            options: {
                data: {
                    firstName,
                    lastName,
                    email,
                    password,
                },
            },
        })
    };

    return (
        <div className="signup-layout w-full h-full relative flex flex-col items-center gap-4 pt-[230px] pb-[50px] overflow-y-scroll no-scrollbar overflow-x-hidden">
            <Illustration />
            <Image
                src={AUTO_APPLY_LOGO}
                alt=""
                width={300}
                height={300}
                className="absolute top-0 left-0 "
            />
            <Title size="h4">Auto Apply AI</Title>
            <Text size="xxs" className="max-w-[70%] text-center text-gray-900">
                Streamline your job search smart applications, faster results.
            </Text>
            <Input
                value={firstName}
                name="firstName"
                placeholder="First Name"
                onChange={onSignupDetailsChange}
                className="mt-[20px]"
            />
            <Input
                value={lastName}
                name="lastName"
                placeholder="Last Name"
                onChange={onSignupDetailsChange}
                className="mt-[20px]"
            />
            <Input
                value={email}
                name="email"
                placeholder="Email"
                onChange={onSignupDetailsChange}
                className="mt-[20px]"
            />
            <Input
                value={password}
                name="password"
                placeholder="Password"
                onChange={onSignupDetailsChange}
                handleSubmit={handleSignup}
                className="mt-[20px]"
            />
        </div>
    );
}
