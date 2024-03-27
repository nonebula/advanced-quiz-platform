import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  defaultValue: number;
  max: number;
  min: number;
  step: number;
  onClickNext: (amount: number) => void;
}
export function SetQuestionQty(props: Props) {
  const [sliderValue, setSliderValue] = useState<number>(props.defaultValue);

  const renderMarks = (): JSX.Element[] => {
    let marks = [];
    for (let i = props.min; i <= props.max; i += props.step) {
      marks.push(
        <SliderMark key={i} ml={-2} pt={3} value={i}>
          {i}
        </SliderMark>
      );
    }
    return marks;
  };

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          Choose your number of questions!
        </Heading>
        <Slider
          value={sliderValue}
          maxW={400}
          max={props.max}
          min={props.min}
          step={props.step}
          colorScheme="yellow"
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
        >
          {renderMarks()}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      <Button
        onClick={() => props.onClickNext(sliderValue)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Category
      </Button>
    </>
  );
}
