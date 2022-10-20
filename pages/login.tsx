import Head from "next/head";
import Image from "next/image";

function Login() {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
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

      <form className="relative my-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 text-black">
        <h1>Sign In</h1>
        <div>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="input"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
            />
          </label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
        </div>
      </form>
    </div>
  );
}

export default Login;
