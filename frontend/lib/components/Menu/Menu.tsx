import { MotionConfig } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import { MenuControlButton } from "@/app/chat/[chatId]/components/ActionsBar/components/ChatInput/components/MenuControlButton/MenuControlButton";
import { useChatsList } from "@/app/chat/[chatId]/hooks/useChatsList";
import { QuivrLogo } from "@/lib/assets/QuivrLogo";
import { nonProtectedPaths } from "@/lib/config/routesConfig";
import { useMenuContext } from "@/lib/context/MenuProvider/hooks/useMenuContext";

import styles from "./Menu.module.scss";
import { AnimatedDiv } from "./components/AnimationDiv";
import { DiscussionButton } from "./components/DiscussionButton/DiscussionButton";
import { ThreadsButton } from "./components/ThreadsButton/ThreadsButton";

export const Menu = (): JSX.Element => {
  const { isOpened } = useMenuContext();
  const router = useRouter();
  const pathname = usePathname() ?? "";

  useChatsList();

  if (nonProtectedPaths.includes(pathname)) {
    return <></>;
  }

  const displayedOnPages = [
    "/assistants",
    "/chat",
    "/library",
    "/search",
    "studio",
    "/user",
  ];

  const isMenuDisplayed = displayedOnPages.some((page) =>
    pathname.includes(page)
  );

  if (!isMenuDisplayed) {
    return <></>;
  }

  return (
    <MotionConfig transition={{ mass: 1, damping: 10, duration: 0.1 }}>
      <div className={styles.menu_container}>
        <AnimatedDiv>
          <div className={styles.menu_wrapper}>
            <div
              className={styles.quivr_logo_wrapper}
              onClick={() => router.push("/search")}
            >
              <QuivrLogo
                size={50}
              />
            </div>

            <div className={styles.buttons_wrapper}>
              <div className={styles.block}>
                <DiscussionButton />
                <ThreadsButton />
              </div>
            </div>
          </div>
        </AnimatedDiv>
      </div>
      <div
        className={`
        ${styles.menu_control_button_wrapper} 
        ${isOpened ? styles.shifted : ""}
        `}
      >
        <MenuControlButton />
      </div>
    </MotionConfig>
  );
};
