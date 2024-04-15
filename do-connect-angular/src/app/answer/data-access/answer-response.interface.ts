/*
 * Interface for the response from the API when getting answers
 * id: number - the unique identifier for the answer
 * answer: string - the answer to the question
 * datePosted: string - the date the answer was posted
 * questionId: number - the unique identifier for the question
 * user: object - the user who posted the answer
 */
export interface AnswerResponse {
    id: number;
    answer: string;
    datePosted: string;
    questionId: number;
    user: {
        id: number;
        name: string;
    }
}