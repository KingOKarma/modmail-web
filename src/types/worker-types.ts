/**
 * IPC types between the modmail bot and webserver.
 */
import { MemberState } from './index';

/**
 * All the accepted calls by the modmail bot.
 * @const WORKER_CALLS
 * @prop {string} getRoles get roles of a member from a given guild
 * - ( see also: @interface GetRolesReq )
 * @prop {string} getMember get a member from a given guild
 * - ( see also: @interface GetMemberStateReq )
 * @prop {string} getAllMembers get all members from a guild
 * - ( see also: @interface GetAllMemberStatesReq )
 * @prop {string} getUserState get a user from Discord
 * - ( see also: @interface GetUserStateReq )
 */
export const WORKER_CALLS = {
  getRoles: 'get_member_roles',
  getMember: 'get_member_state',
  getAllMembers: 'get_all_member_states',
  getUserState: 'get_user_state',
  getChannel: 'get_channel_state',
  getRole: 'get_role_state',
}

/**
 * A message from NewCircuit/modmail-server to NewCircuit/modmail
 * @interface ServerMessage
 * @prop {string} id A unique identifier for this request
 * @prop {string} task The worker API call requested
 * (see also: @const WORKER_CALLS)
 * @prop {any[]} args Arguments provided for the API call
 */
export interface ServerMessage {
  id: string;
  task: string;
  args: any[];
}

/**
 * A response from NewCircuit/modmail to NewCircuit/modmail-server
 * @interface ServerResponse
 * @prop {string} id This ID should be matching the server's message ID
 * @prop {any} data Data returned from a worker API call
 */
export interface ServerResponse {
  id: string;
  data: any;
}

/**
 * A message from NewCircuit/modmail-server specific to the "get_member_roles"
 * worker API call.
 * @interface GetRolesReq
 * @prop {[string, string]} args
 * - args[0]: The guild ID
 * - args[1]: The user ID
 */
export interface GetRolesReq extends ServerMessage {
  args: [string, string];
}

/**
 * The response type to the "" worker API call
 * @interface GetRolesRes
 * @prop {string[]} data Role IDs of the member requested
 */
export interface GetRolesRes extends ServerResponse {
  data: string[];
}

/**
 * A message from NewCircuit/modmail-server specific to the "get_member_state"
 * worker API call.
 * @interface GetMemberStateReq
 * @prop {[string, string]} args
 * - args[0]: The guild ID
 * - args[1]: The user ID
 */
export interface GetMemberStateReq extends ServerMessage {
  args: [string, string];
}

/**
 * The response type to the "get_member_state" worker API call
 * @interface GetMemberStateRes
 * @prop {MemberState} data
 */
export interface GetMemberStateRes extends ServerResponse {
  data: MemberState;
}

/**
 * A message from NewCircuit/modmail-server specific to the
 * "get_all_member_states" worker API call.
 * @interface GetAllMemberStatesReq
 * @prop {[string, string?, number?]} args
 * - args[0]: The guild ID
 * - args[1]: Is utilized to fetch all guild members after this member ID
 * - args[2]: limit
 */
export interface GetAllMemberStatesReq extends ServerMessage {
  args: [string, string?, number?];
}

/**
 * The response type to the "get_all_member_states" worker API call
 * @interface GetAllMemberStatesRes
 * @prop {MemberState[]} data
 */
export interface GetAllMemberStatesRes extends ServerResponse {
  data: MemberState[];
}

/**
 * @interface GetStateReq
 * @prop {[string]} args
 * - args[0]: The ID of the user requested
 * - args[1]: Whether to rely on cache only
 */
export interface GetStateReq extends ServerMessage {
  args: [string, boolean];
}

export interface GetStateRes<T> extends ServerResponse {
  data: T;
}
