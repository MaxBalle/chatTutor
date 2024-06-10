import {isToday} from "date-fns";
import {useTranslation} from "react-i18next";

import styles from "@/lib/components/ui/FoldableSection/FoldableSection.module.scss";
import {Icon} from "@/lib/components/ui/Icon/Icon";
import {useChatsContext} from "@/lib/context/ChatsProvider/hooks/useChatsContext";

import {ThreadsSection} from "./ThreadsSection/ThreadsSection";
import {isWithinLast30Days, isWithinLast7Days, isYesterday} from "./utils";




export const ThreadsButton = (): JSX.Element => {
    const {allChats} = useChatsContext();
    const {t} = useTranslation("chat");
    const todayChats = allChats.filter((chat) =>
        isToday(new Date(chat.creation_time))
    );
    const yesterdayChats = allChats.filter((chat) =>
        isYesterday(new Date(chat.creation_time))
    );
    const last7DaysChats = allChats.filter((chat) =>
        isWithinLast7Days(new Date(chat.creation_time))
    );
    const last30DaysChats = allChats.filter((chat) =>
        isWithinLast30Days(new Date(chat.creation_time))
    );

    return (
        <div>
            <div className={styles.header_left}>
                <Icon
                    name="history"
                    size="normal"
                    color="primary"
                />
                <p className={styles.header_title} title={t("threads")}></p>
            </div>
            <div>
                <ThreadsSection chats={todayChats} title={t("today")}/>
                <ThreadsSection chats={yesterdayChats} title={t("yesterday")}/>
                <ThreadsSection chats={last7DaysChats} title={t("last7Days")}/>
                <ThreadsSection chats={last30DaysChats} title={t("last30Days")}/>
            </div>
        </div>
    );
};
