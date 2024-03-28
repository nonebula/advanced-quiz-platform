import { Box, Flex, Heading, Image, Spinner } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../global.css";
import { SetQuestionQty } from "./features/SetQuestionQty";
import { useEffect, useState } from "react";
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizItem,
  QuizType,
} from "./types/quiz-type.tsx";
import { SetQuestionCategory } from "./features/SetQuestionCategory.tsx";
import { SetQuestionDifficulty } from "./features/SetQuestionDifficulty.tsx";
import { QuizAPI } from "./api/quiz-api.tsx";
import { PlayQuiz } from "./features/PlayQuiz/PlayQuiz.tsx";
import { Score } from "./features/Score.tsx";

enum Step {
  Loading,
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

export function App() {
  //set default state
  const [step, setStep] = useState<Step>(Step.Loading);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    //default values
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });

  const [categories, setCategories] = useState<QuizCategory[]>([]);

  const [quiz, setQuiz] = useState<QuizItem[]>([]);

  const [history, setHistory] = useState<boolean[]>;

  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: "Mix it all up!" },
        ...(await QuizAPI.fetchCategories()),
      ]);
      setStep(Step.SetQuestionQty);
    })();
  }, []);

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.Loading:
        return (
          <Flex
            top={0}
            position={"absolute"}
            justify={"center"}
            alignItems={"center"}
            minH={"100vh"}
            width={"100%"}
          >
            <Spinner />
          </Flex>
        );
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
        return (
          <SetQuestionDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = {
                ...quizParams,
                difficulty,
              };
              setQuizParams(params);
              const quizResp = await QuizAPI.fetchQuiz(params);
              if (quizResp.length > 0) {
                setQuiz(quizResp);
                setStep(Step.Play);
              } else {
                alert(
                  `Sorry, we couldn't find ${params.amount} questions for this category, restarting selection now!`
                );
                setStep(Step.SetQuestionQty);
              }
            }}
          />
        );
      case Step.Play:
        return (
          <PlayQuiz
            onFinished={(history_: boolean[]) => {
              setHistory(history_);
              setStep(Step.Score);
            }}
            quiz={quiz}
          />
        );
      case Step.Score:
        return (
          <Score
            history={history}
            onNext={() => {
              setStep(Step.SetQuestionQty);
            }}
          />
        );
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
