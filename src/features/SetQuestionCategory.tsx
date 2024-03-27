import { useEffect, useState } from "react";
import { QuizCategory } from "../types/quiz-type";
import { QuizAPI } from "../api/quiz-api";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  RadioGroup,
  Stack,
  Radio,
  SimpleGrid,
} from "@chakra-ui/react";

export function SetQuestionCategory(props: {
  categories: QuizCategory[];
  onClickNext: (categoryId: string) => void;
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    props.categories[0].id.toString()
  );

  const radioList = props.categories.map((category: QuizCategory) => {
    return <Radio value={category.id.toString()}>{category.name}</Radio>;
  });
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          Great, Now choose your category!
        </Heading>
      </Flex>

      <RadioGroup
        display={"flex"}
        justifyContent={"center"}
        value={selectedCategoryId}
        onChange={setSelectedCategoryId}
      >
        <SimpleGrid columns={[1, 3, 4]} spacing={"4"}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>

      <Button
        onClick={() => props.onClickNext(selectedCategoryId)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Difficulty
      </Button>
    </>
  );
}
