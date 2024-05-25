import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import personImg from "@/public/assets/images/default-user.svg";
import { Separator } from "@/components/ui/separator";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { accountLinks, extraLinks, profileLinks } from "@/constants";
import { FiLogOut } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";

const ProfileModal = ({
  setShowProfileModal,
  showProfileModal,
  isAuthenticated,
  user,
}: {
  setShowProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  showProfileModal: boolean;
  isAuthenticated: boolean;
  user: UserDetailsTypes | undefined;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <Dialog
      open={showProfileModal}
      onOpenChange={() => setShowProfileModal(false)}>
      {isAuthenticated ? (
        <DialogContent className="bg-white max-w-screen min-h-screen">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Image
                src={user?.image || personImg}
                alt="profile image"
                width={40}
                height={40}
                className="rounded-full object-cover w-[40px] h-[40px]"
              />
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="font-medium">ID: {user?.id}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="w-full flex justify-between items-center px-3 py-3 border rounded-lg">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">ბალანსი</h3>
              {/* hard coded */}
              <strong className="font-bold text-2xl">{user?.balance}.00</strong>
            </div>
            <Link className="flex items-center gap-2" href="/finances/balance">
              <h4>შევსება</h4>
              <div className="w-7 h-7 flex justify-center items-center bg-[#d0d8fa] rounded-[4px]">
                <AddIcon fontSize="inherit" color="primary" />
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-4 items-start">
            {profileLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center gap-3 group"
                onClick={() => setShowProfileModal(false)}>
                <div className="profile_link">
                  <link.Icon className="group-hover:text-[#fec900]" />
                </div>
                <p className="profile_link-p">{link.text}</p>
              </Link>
            ))}
          </div>
          <Separator className="border border-gray-100 my-2" />
          <div className="flex flex-col gap-4 items-start">
            {extraLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center gap-3 group"
                onClick={() => setShowProfileModal(false)}>
                <div className="profile_link">
                  <link.Icon className="group-hover:text-[#fec900]" />
                </div>
                <p className="profile_link-p">{link.text}</p>
              </Link>
            ))}
          </div>
          <Separator className="border border-gray-100 my-2" />
          <div className="flex flex-col gap-4 items-start">
            {accountLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center gap-3 group"
                onClick={() => setShowProfileModal(false)}>
                <div className="profile_link">
                  {link.Icon && (
                    <link.Icon className="group-hover:text-[#fec900]" />
                  )}
                </div>
                <p className="profile_link-p">{link.text}</p>
              </Link>
            ))}
            <div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={handleLogout}>
              <div className="profile_link">
                <FiLogOut />
              </div>
              <p className="profile_link-p">გასვლა</p>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="bg-white max-w-screen h-screen z-50">
          <DialogHeader>
            <h4 className="text-left text-lg font-bold text-[#454b57]">
              ჩემი გვერდი
            </h4>
          </DialogHeader>

          <div className="flex flex-col gap-10">
            <div className="flex w-full items-center justify-center gap-4 pb-16 flex-col sm:flex-row">
              <Link href="/sign-in" className="w-full">
                <Button className="w-full rounded-xl bg-[#fec900] px-7 py-3 text-[14px] font-bold text-white">
                  შესვლა
                </Button>
              </Link>
              <Link href="/sign-up" className="w-full">
                <Button className="w-full rounded-xl border border-[#e4e7ed] bg-transparent px-7 py-3 text-[14px] font-bold text-[#272a37]">
                  რეგისტრაცია
                </Button>
              </Link>
            </div>
            <div className="flex w-full justify-start">
              <ul className="flex flex-col gap-6">
                <li className="text-[#272a37]">წესები და პირობები</li>
                <li className="text-[#010102]">კონტაქტი</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ProfileModal;
