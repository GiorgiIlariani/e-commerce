import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { Button } from "@/components/ui/button";
import { AiOutlineHeart } from "react-icons/ai";

const FavoritesPage = () => {
  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Favourites" />
        <div className="w-full flex flex-col justify-center items-center pt-[140px] text-center">
          <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
            <AiOutlineHeart fontSize={16} />
          </div>
          <p className="text-lg font-bold mt-4">You have no favorites list</p>
          <p className="text-[#8996ae] text-base mt-4">
            Click the heart icon on the product photo to add to favorites in the
            right corner
          </p>
          <Button className="mt-8 text-white bg-[#fec900] rounded-2xl px-12 py-7">
            Create list
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FavoritesPage;
