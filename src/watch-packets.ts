import { kSocketAuthStatus } from "./symbols";
import { EVENTS } from "./constants";

export const defaultAuthorized = [
  EVENTS.AUTHORIZE,
  EVENTS.AUTH_RESULT,
  EVENTS.AUTH_TIMEOUT
];

export default function watchPackets(
  socket: SocketIO.Socket,
  authorize?: string[]
) {
  const authorizedEvents = authorize
    ? [...authorize, ...defaultAuthorized]
    : defaultAuthorized;

  socket.use((packet, next) => {
    if (socket[kSocketAuthStatus] || authorizedEvents.indexOf(packet[0]) !== -1)
      return next();
  });
}
