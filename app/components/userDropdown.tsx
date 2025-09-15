"use client";

import { UserButton } from "@clerk/nextjs";

const UserDropdown = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: "white",
          },
        },
      }}
      showName
    />
  );
};

export default UserDropdown;
