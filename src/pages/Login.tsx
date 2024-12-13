"use client";

import { useState } from "react";
import { Methods } from "@/constants/enum";
import { useLoginService } from "@/services";
import { Title, Text, Image, Button } from "@/components/atoms";
import { Illustration, Input } from "@/components/molecules";
import AUTO_APPLY_LOGO from "@/assets/images/auto-apply-logo.webp";

export default function Login() {
    /* STATES */
    const [{ email, password }, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    /* SERVICES */
    const { login } = useLoginService();

    /* HANDLERS */
    const onLoginDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        login({
            method: Methods.POST,
            url: "/auth/login",
            options: {
                data: {
                    email,
                    password,
                },
            },
        })
    };

    return (
        <div className="login-layout w-full h-screen relative flex flex-col items-center gap-4 pt-[230px] pb-[50px] overflow-y-scroll no-scrollbar overflow-x-hidden">
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
                value={email}
                name="email"
                placeholder="Email"
                onChange={onLoginDetailsChange}
                className="mt-[40px]"
            />
            <Input
                value={password}
                name="password"
                placeholder="Password"
                onChange={onLoginDetailsChange}
                handleSubmit={handleLogin}
                className="mt-[20px]"
            />
            <Button title="Login" onClick={() => console.log('Click')}/>
        </div>
    );
}
