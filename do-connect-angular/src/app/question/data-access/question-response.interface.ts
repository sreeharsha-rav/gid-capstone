/*
 * This file is created to define the response interface for the question.
 * id: number - the unique identifier for the question
 * title: string - the title of the question
 * body: string - the body of the question
 * datePosted: string - the date the question was posted
 * topics: string[] - the topics associated with the question
 * user: object - the user who posted the question
 */
export interface QuestionResponse {
    id: number;
    title: string;
    body: string;
    datePosted: string;
    topics: string[];
    user: {
        id: number;
        name: string;
    }
}