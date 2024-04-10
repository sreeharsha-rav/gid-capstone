export interface QuestionResponse {
    id: number;
    title: string;
    body: string;
    datePosted: string;
    topics: string[];
    userId: number;
}