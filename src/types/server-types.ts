// NewCircuit/modmail-server types
import { Thread, UserState } from './index';

export type UserStateCache = {
    [key: string]: UserState;
};

/**
 * This is the response body type of "GET /api/:category ID/threads/:thread ID"
 * @type ThreadResponse
 * @prop {UserStateCache} user All the cached users from modmail bot that are
 * mentioned in each message of this thread
 */
export interface ThreadResponse extends Thread {
    users: UserStateCache;
}

/**
 * This is the response body type of "GET /api/:category ID/threads"
 * @type ThreadsResponse
 * @prop {UserStateCache} users All the cached users from modmail bot that are
 * mentioned in each thread
 */
export type ThreadsResponse = {
    threads: Thread[];
    users: UserStateCache;
};

/**
 * This is the response body type of "GET /api/self"
 * @interface ThreadsResponse
 * @prop {string} token OAuth2 token for Discord's API
 */
export interface SelfResponse extends UserState {
    token: string;
}
