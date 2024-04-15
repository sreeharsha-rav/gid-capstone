/*
 * QuestionRequest interface to define the request object for adding or updating a question
 * title: string - the title of the question
 * body: string - the body of the question
 * topics: string[] - the topics associated with the question
 * userId: number - the ID of the user who posted the question
 */
export interface QuestionRequest {
    title: string;
    body: string;
    topics: string[];
    userId: number;
}