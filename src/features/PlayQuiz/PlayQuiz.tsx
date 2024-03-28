import {
  Flex,
  Text,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Box,
  HStack,
} from "@chakra-ui/react";
import { QuizItem } from "../../types/quiz-type";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import validAnim from "../../assets/lottie/valid.json";
import invalidAnim from "../../assets/lottie/invalid.json";
import { Timer } from "./Timer";
export function PlayQuiz(props: {
  quiz: QuizItem[];
  onFinished: (history: boolean) => void;
}) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentQuizItem: QuizItem = props.quiz[currentQuizItemIndex];

  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

  const [history, setHistory] = useState<boolean[]>([]);

  const [answer, setAnswer] = useState<string>();
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");

  useEffect(() => {
    setAvailableAnswers(
      [
        currentQuizItem.correct_answer,
        ...currentQuizItem.incorrect_answers,
      ].sort(() => Math.random() - 0.5)
    );
  }, [currentQuizItemIndex]);

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      if (isValid) {
        setQuestionStatus("valid");
      } else {
        setQuestionStatus("invalid");
      }
      setHistory([...history, isValid]);
    }
  }, [answer]);

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  const renderProgressBar = () => {
    return (
      <HStack>
        {props.quiz.map((quizItem, i) => {
          return (
            <Box
              key={i}
              h={3}
              w={25}
              backgroundColor={
                i >= currentQuizItemIndex
                  ? "gray.200"
                  : history[i]
                  ? "green.300"
                  : "red:300"
              }
            />
          );
        })}
      </HStack>
    );
  };

  const radioList = availableAnswers.map((availableAnswer: string) => {
    return (
      <Radio key={availableAnswer} value={availableAnswer}>
        <Text
          color={
            questionStatus === "unanswered"
              ? "black"
              : isValidAnswer(availableAnswer)
              ? "green.400"
              : "red.400"
          }
          dangerouslySetInnerHTML={{ __html: availableAnswer }}
        ></Text>
      </Radio>
    );
  });
  const failQuestion = () => {
    setHistory([...history, false]);
    setQuestionStatus("invalid");
  };
  return (
    <Flex direction={"column"} alignItems={"center"} justify={"center"}>
      {renderProgressBar()}
      {questionStatus === "unanswered" && (
        <Box position={"absolute"} top={50} right={50}>
          <Timer max={10} onFinished={failQuestion} />
        </Box>
      )}
      <Heading
        fontSize={"3xl"}
        mt={100}
        mb={20}
        dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
      />
      <RadioGroup
        value={answer}
        onChange={questionStatus === "unanswered" ? setAnswer : undefined}
      >
        <SimpleGrid columns={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Lottie
        loop={false}
        style={{ marginTop: 100, height: 150 }}
        animationData={
          questionStatus === "unanswered"
            ? null
            : questionStatus === "valid"
            ? validAnim
            : invalidAnim
        }
        onComplete={() => {
          if (currentQuizItemIndex < props.quiz.length - 1) {
            setQuestionStatus("unanswered");
            setCurrentQuizItemIndex(currentQuizItemIndex + 1);
          } else {
            props.onFinished(history);
          }
        }}
      />
    </Flex>
  );
}
