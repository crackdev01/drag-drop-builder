import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function MainPage() {
  return (
    <div className="container pt-4">
      <div className="container flex h-[calc(100vh-30px)] flex-col items-center justify-center gap-20 px-4 py-16 ">
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          Drag & Drop <span className="text-[hsl(280,100%,70%)]">Web</span>{" "}
          Builder
        </h1>
        <Button className="bg-[#080b11]">
          <Link href={"/dashboard"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
