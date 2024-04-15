/*
 * Topic request interface to create/edit a topic
 * name: string - the name of the topic
 * description: string - the description of the topic
 */
export interface TopicRequest {
    name: string;
    description: string;
}