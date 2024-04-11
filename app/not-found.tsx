import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-[#f1f3f6] min-h-screen w-full flex flex-col gap-8 items-center pt-20">
      <Image
        src="/assets/images/not-found.svg"
        className="object-contain"
        alt="404 not found"
        width={350}
        height={300}
      />
      <h1 className="text-[#272a37] text-2xl font-semibold text-center">
        ეს პროდუქტი ხელმისაწვდომი აღარ არის
      </h1>
      <p className="text-base text-[#8996ae] font-medium">
        მთავარ გვერდზე დასაბრუნებლად დააჭირე ყვითელ ღილაკს
      </p>
      <Button className="h-14 rounded-xl px-20 text-white font-bold text-sm bg-[#fec900]">
        მთავარი გვერდი
      </Button>
    </div>
  );
}
