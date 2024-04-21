import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useEffect } from "react";
import personImg from "@/public/assets/images/default-user.svg";
import { Separator } from "@/components/ui/separator";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { accountLinks, extraLinks, profileLinks } from "@/constants";
import { FiLogOut } from "react-icons/fi";

const ProfileModal = ({
  setShowProfileModal,
  showProfileModal,
}: {
  setShowProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  showProfileModal: boolean;
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  return (
    <Dialog
      open={showProfileModal}
      onOpenChange={() => setShowProfileModal(false)}>
      <DialogContent className="bg-white max-w-screen h-screen z-50">
        <DialogHeader className="max-h-20">
          <div className="flex items-center gap-3">
            <Image
              src={user?.image || personImg}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full object-cover w-[40px] h-[40px]"
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="font-medium">ID: 125738</p>
            </div>
          </div>
        </DialogHeader>
        <div className="w-full flex justify-between items-center px-3 py-3 border rounded-lg">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">ბალანსი</h3>
            {/* hard coded */}
            <strong className="font-bold text-2xl">{user?.balance}.00</strong>
          </div>
          <div className="flex items-center gap-2">
            <h4>შევსება</h4>
            <div className="w-7 h-7 flex justify-center items-center bg-[#d0d8fa] rounded-[4px]">
              <AddIcon fontSize="inherit" color="primary" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start">
          {profileLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-3 group">
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
              className="flex items-center gap-3 group">
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
              className="flex items-center gap-3 group">
              <div className="profile_link">
                {link.Icon && (
                  <link.Icon className="group-hover:text-[#fec900]" />
                )}
              </div>
              <p className="profile_link-p">{link.text}</p>
            </Link>
          ))}
          <div className="flex items-center gap-3 group">
            <div className="profile_link">
              <FiLogOut />
            </div>
            <p className="profile_link-p">გასვლა</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;