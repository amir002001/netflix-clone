import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
    email: string;
    password: string;
}

function Login() {
    // whether the user wants to login or sign up
    const { signIn } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        await signIn(email, password);
    };

    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Head>
                <title>Amirflix</title>
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            <Image
                src={"/netflix-bg.jpg"}
                layout="fill"
                alt="background"
                objectFit="cover"
                className="-z-10 !hidden opacity-60 sm:!inline"
            />
            <div className="cursor-pointer absolute left-4 top-4 md:left-10 md:top-6 transition-all">
                <Image
                    alt="logo"
                    src="/Netflix_2015_logo.svg"
                    width={150}
                    height={40}
                    className="object-contain"
                />
            </div>

            <form
                className="relative mt-24 rounded space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <p className="text-blue-200/60"><span className="font-semibold">demo@demo.com</span> with password <span className="font-semibold">demo1234</span></p>
                <p className="text-blue-200/60"><span className="font-semibold">or create your own :)</span></p>
                <div className="space-y-4">
                    <label htmlFor="email" className="inline-block w-full">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="input"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light text-orange-500">
                                Email is required
                            </p>
                        )}
                    </label>
                    <label htmlFor="password" className="inline-block w-full">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="input"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light text-orange-500">
                                Password must be the right format{" "}
                                {/*add more details maybe TODO*/}
                            </p>
                        )}
                    </label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                </div>
                <button
                    type="submit"
                    className="w-full rounded bg-[#e50914] py-3 font-semibold"
                >
                    Sign In
                </button>
                <div className="text-[gray]">
                    New to Netflix?
                    <Link type="submit" href={"/signup"}>
                        <span className="ml-1 text-white hover:underline">
                            Sign Up Now
                        </span>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
