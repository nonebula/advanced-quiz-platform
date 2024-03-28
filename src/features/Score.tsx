import { Button, Flex, Heading, Text } from "@chakra-ui/react";

export function Score(props: { history: boolean[]; onNext: () => void }) {
  const rightAnswers = props.history.filter(
    (isValidAnswer: boolean) => isValidAnswer === true
  ).length;

  const renderMessage = () => {
    const rightAnswerPercentage = (rightAnswers * 100) / props.history.length;
    if (rightAnswerPercentage < 30) {
      return "Well, that was a total failure...";
    } else if (rightAnswerPercentage < 50) {
      return "It could be worse, but this was unimpressive.";
    } else if (rightAnswerPercentage < 75) {
      return "Well done, that was quite impressive!";
    } else {
      return "Woah! That was brilliant. Excellent stuff!";
    }
  };

  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Heading fontSize={"3xl"}>Score</Heading>
      <Heading fontSize={"xl"} mt={"5"}>
        {rightAnswers} / {props.history.length}
      </Heading>
      <Text fontWeight={"bold"} mt={20}>
        {renderMessage()}
      </Text>
      <Button
        position="absolute"
        top={"80%"}
        right={"10%"}
        onClick={props.onNext}
      >
        Start A New Game
      </Button>
    </Flex>
  );
}
