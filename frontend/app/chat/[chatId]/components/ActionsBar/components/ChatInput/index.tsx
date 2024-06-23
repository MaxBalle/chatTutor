"use client";


import { CurrentBrain } from "@/lib/components/CurrentBrain/CurrentBrain";
import Button from "@/lib/components/ui/Button";
import Icon from "@/lib/components/ui/Icon/Icon";
import { LoaderIcon } from "@/lib/components/ui/LoaderIcon/LoaderIcon";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

import { ChatEditor } from "./components/ChatEditor/ChatEditor";
import { useChatInput } from "./hooks/useChatInput";
import styles from "./index.module.scss";


export const ChatInput = (): JSX.Element => {
  const { setMessage, submitQuestion, generatingAnswer, message } =
    useChatInput();
  const { currentBrain } = useBrainContext();

  const handleSubmitQuestion = () => {
    if (message.trim() !== "") {
      submitQuestion();
    }
  };
  
  const getExercises = () => {
    setMessage("Stell mir bitte eine neue Frage.");
    submitQuestion();
  }
  const endSession = () => {
    setMessage("Danke, ich habe das Thema verstanden und brauche keine Hilfe mehr.");
    submitQuestion();
  }
  const explainFurther = () => {
    setMessage("Kannst du das bitte genauer erklären?");
    submitQuestion();
  }

  return (
    <>
      <form
          data-testid="chat-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitQuestion();
          }}
      >
        <div className={styles.chat_container}>
          <CurrentBrain allowingRemoveBrain={false}/>
          <div
              className={`
            ${styles.chat_wrapper}
            ${currentBrain ? styles.with_brain : ""}
          `}
          >
            <ChatEditor
                message={message}
                setMessage={setMessage}
                onSubmit={handleSubmitQuestion}
            />
            {generatingAnswer ? (
                <LoaderIcon size="large" color="accent"/>
            ) : (
                <Icon
                    name="followUp"
                    size="large"
                    color="accent"
                    disabled={!message}
                    handleHover={true}
                    onClick={handleSubmitQuestion}
                />
            )}
          </div>
        </div>
        <div className={styles.button_container}>
          <Button onClick={getExercises} variant={"primary"}>
            Neue Frage
            <Icon name={"bulb"} size={"normal"} color={"black"}/>
          </Button>
          <Button onClick={explainFurther} variant={"primary"}>
            Weitere Erklärung
            <Icon name={"question"} size={"normal"} color={"black"}/>
          </Button>
          <Button onClick={endSession} variant={"danger"}>
            Thema verstanden
            <Icon name={"thumbsUp"} size={"normal"} color={"black"}/>
          </Button>
        </div>
      </form>
    </>
  );
};
