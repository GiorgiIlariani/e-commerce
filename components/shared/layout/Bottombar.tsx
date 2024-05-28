"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottombarLinks } from "@/constants";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import ProfileModal from "../modals/ProfileModal";

const Bottombar = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: user, refetch } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  const pathname = usePathname();

  return (
    <>
      <section className="bottombar shadow-top">
        <div className="bottombar_container">
          {bottombarLinks.slice(0, isAuthenticated ? 4 : 5).map((link) => {
            const isActive = pathname === link.route;

            return link.route ? (
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${isActive ? "bg-primary" : ""}`}>
                {link.icon}
                <p className="max-xs:hidden text-sm font-medium">
                  {link.label.split(/\s+/)[0]}
                </p>
              </Link>
            ) : (
              <div
                key={link.label}
                className="bottombar_link cursor-pointer"
                onClick={() => setShowProfileModal(true)}>
                {link.icon}
                <p className="max-xs:hidden text-sm font-medium">
                  {link.label.split(/\s+/)[0]}
                </p>
              </div>
            );
          })}
          {isAuthenticated && (
            <div
              className="bottombar_link cursor-pointer"
              onClick={() => setShowProfileModal(true)}>
              <Image
                src={user ? user?.image : "/assets/images/default-user.svg"}
                width={24}
                height={24}
                alt="person"
                className="rounded-full w-6 h-6 object-cover"
              />
              <p className="max-xs:hidden text-sm font-medium">Profile</p>
            </div>
          )}
        </div>
      </section>
      {showProfileModal && (
        <ProfileModal
          setShowProfileModal={setShowProfileModal}
          showProfileModal={showProfileModal}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      )}
    </>
  );
};

export default Bottombar;
