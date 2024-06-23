import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { cookies, headers } from "next/headers";

import { ToastProvider } from "@/lib/components/ui/Toast";
import { SupabaseProvider } from "@/lib/context/SupabaseProvider";

import { App } from "./App";
import "./globals.css";
import styles from "./layout.module.scss";

export const metadata = {
  title: "Chat Tutor"
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="de">
      <body
        className={styles.body}
        // className={`bg-white text-black h-screen flex flex-col dark:bg-black dark:text-white w-full ${inter.className}`}
      >
        <ToastProvider>
          <SupabaseProvider session={session}>
            <App>{children}</App>
          </SupabaseProvider>
        </ToastProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
};

export default RootLayout;
