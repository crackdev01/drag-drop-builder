import React, { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen min-w-full flex-col">
        <main className="flex w-full grow">{children}</main>
      </div>
    </>
  );
}
