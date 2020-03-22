import { Socket } from "socket.io";
///<reference types="socket.io" />
///<reference types="socket.io-client" />

export = Extensor;
export as namespace Extensor;

declare namespace Extensor {
  interface Storage {
    get(key: string): Promise<string | null>;
    set(key: string, value: any): Promise<string>;
    del(key: string): Promise<number>;
    deleteAll(keys: string[]): Promise<number | void | null>;
  }

  /**
   * Authorization options
   */
  type AuthOptions = {
    /**
     * Authorization timeout, in ms
     * @default false // Don't set timeout
     */
    timeout?: number | boolean;

    /**
     * Allowed events before authentication
     * @default 'Extensor defaults'
     */
    authorizedEvents?: string[];
  };

  /**
   * Force unique connection options
   */
  type UniqueOptions = {
    /**
     * Identifier for prevent multiple connection attemp
     * @default false Mix of ip and user-agent
     */
    identifier?: string | boolean;

    /**
     * Set error handler for unique middleware
     * @default 'e => debug("%s: %s", e.local, e.message);'
     */
    onError?: (local: string, eror: Error, socket: Socket) => void;

    /**
     * Manager of connections state data
     * @default ExtensorSimpleStore
     */
    storage?: Storage;
  };

  type AuthResultResponse = {
    error?: string;
    merge: { [prop: string]: any };
  };

  type ServerSocket = SocketIO.Socket & {
    [prop: string]: any;
    /**
     * Handler socket authentication
     */
    auth: Promise<unknown>;
  };

  type ClientSocket = SocketIOClient.Socket & {
    [prop: string]: any;
    /**
     * Handler socket authentication
     */
    auth: Promise<unknown>;
  };

  type AuthHandler = (ctx: {
    /**
     * Socket that requests authentication
     */
    socket: SocketIO.Socket;
    /**
     * Sent data
     */
    data: any;
    /**
     * Resolve authentication
     */
    done: (response: AuthDoneResponse) => void;
  }) => AuthDoneResponse | void | Promise<AuthDoneResponse>;

  type AuthDoneResponse = boolean | object | Error;

  type Schema = string | { [prop: string]: Schema };

  /**
   * Extensor Options
   * @param timeout Authorization timeout, in ms
   * @param authorizedEvents Allowed events before authentication
   * @param identifier Identifier for prevent multiple connection attemp
   * @param onError Set error handler for unique middleware
   * @param storage Storage for connections
   */
  type ParserMapSchemas = {
    [eventName: string]: {
      id: number;
      schema: Schema;
    };
  };

  type ParserIDMap = {
    [id: number]: string;
  };

  type ParserPacket = {
    type: number;
    data: any[];
    nsp: string;
    id?: number;
    options?: {
      compress: boolean;
    };
  };

  type Parser = {
    encode: (data: any) => Buffer;
    decode: (buffer: Buffer) => any;
  };

  type ParsersList = {
    [event: string]: Parser;
  };
}
