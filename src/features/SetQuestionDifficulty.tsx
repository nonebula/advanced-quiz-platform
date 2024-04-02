import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  RadioGroup,
  Button,
  Radio,
  VStack,
} from "@chakra-ui/react";
import { QuizDifficulty } from "../types/quiz-type";
import { useState } from "react";

export function SetQuestionDifficulty(props: {
  onClickNext: (difficulty: QuizDifficulty) => void;
}) {
  const [difficulty, setCurrentDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  );
  const radioList = Object.values(QuizDifficulty).map(
    (diff: QuizDifficulty) => {
      return (
        <Radio key={diff} value={diff}>
          <span style={{ textTransform: "capitalize" }}>
            {diff === QuizDifficulty.Mixed ? "Mixed" : diff}
          </span>
        </Radio>
      );
    }
  );
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          Interesting stuff! Now Choose the Difficulty...
        </Heading>
      </Flex>

      <RadioGroup
        value={difficulty}
        onChange={(value) => setCurrentDifficulty(value as QuizDifficulty)}
      >
        <VStack>{radioList}</VStack>
      </RadioGroup>

      <Button
        onClick={() => props.onClickNext(difficulty)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Play Quiz
      </Button>
    </>
  );
}
