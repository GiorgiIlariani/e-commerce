import ProfileTabs from "@/components/shared/TabsComponent";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { Separator } from "@/components/ui/separator";
import { profileTabs } from "@/constants";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f1f3f6]">
      <div className="wrapper">
        <div className="flex flex-1 flex-col gap-5">
          <UserActivityHeader route="Edit account" />
          <ProfileTabs tabs={profileTabs} />
          <Separator className="w-full my-2 bg-[#e4e7ed]" />
          <div className="bg-white rounded-2xl px-6 sm:px-10 pt-10 pb-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
