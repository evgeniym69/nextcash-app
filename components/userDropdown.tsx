"use client";

import { UserButton } from "@clerk/nextjs";
import { ChartColumnBigIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const router = useRouter();
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
    >
      <UserButton.MenuItems>
        <UserButton.Action
          label="Dashboard"
          labelIcon={<ChartColumnBigIcon size={16} />}
          onClick={() => router.push("/dashboard")}
        >
          Sign out
        </UserButton.Action>
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserDropdown;
