import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../global.css";
import { SetQuestionQty } from "./features/SetQuestionQty";
import { useEffect, useState } from "react";
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizType,
} from "./types/quiz-type.tsx";
import { SetQuestionCategory } from "./features/SetQuestionCategory.tsx";
import { SetQuestionDifficulty } from "./features/SetQuestionDifficulty.tsx";
import { QuizAPI } from "./api/quiz-api.tsx";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

export function App() {
  //set default state
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    //default values
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });

  const [categories, setCategories] = useState<QuizCategory[]>([]);

  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: "Mix it all up!" },
        ...(await QuizAPI.fetchCategories()),
      ]);
    })();
  }, []);

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount: amount });
              setStep(Step.SetQuestionCategory);
            }}
            defaultValue={10}
            max={30}
            min={5}
            step={5}
          />
        );
      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            categories={categories}
            onClickNext={(category: string) => {
              setQuizParams({
                ...quizParams,
                category: category === "-1" ? "" : category,
              });
              setStep(Step.SetQuestionDifficulty);
            }}
          />
        );
      case Step.SetQuestionDifficulty:
        return <SetQuestionDifficulty />;
      case Step.Play:
        return <Play />;
      case Step.Score:
        return <Score />;
      default:
        return null;
    }
  };
  return (
    <Box py={"10"} h="100%">
      {header}
      <Image
        src={bubbleImg}
        position={"absolute"}
        zIndex={-1}
        right={-120}
        top={100}
      />
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
}
