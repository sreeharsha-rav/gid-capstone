/*
 * Interface to represent the answer request object
 * answer: string - the answer to the question
 * questionId: number - the unique identifier for the question
 * userId: number - the unique identifier for the user
 */
export interface AnswerRequest {
    answer: string;
    questionId: number;
    userId: number;
}