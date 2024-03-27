import axios from "axios";
import { FetchQuizCategoriesResp, QuizCategory } from "../types/quiz-type";

const BASE_URL = "https://opentdb.com";
export class QuizAPI {
  //promise always returned in async function
  static async fetchCategories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesResp>(
      `${BASE_URL}/api_category.php`
    );
    return data.trivia_categories;
  }
}
