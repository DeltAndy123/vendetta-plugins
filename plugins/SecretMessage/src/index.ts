import { logger, metro, patcher } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { decryptMessage } from "./util/encrypt";

const unload = [
  patcher.before("dispatch", metro.common.FluxDispatcher, ([e]) => {
    switch (e.type) {
      // Decrypt received messages
      case "MESSAGE_CREATE":
        e.message.content = decryptMessage(e.message.content);
        return [e];
      case "MESSAGE_UPDATE":
        e.message.content = decryptMessage(e.message.content);
        return [e];
      case "LOAD_MESSAGES_SUCCESS":
        e.messages.forEach((m) => {
          m.content = decryptMessage(m.content);
        });
        return [e];

      // Encrypt sent messages
      case "sendMessage":
        logger.info(e)
    }
    if (storage.debug) logger.info(e);
  }),
];

export function onUnload() {
  if (storage.debug) logger.info("Unloading SecretMessage");
  unload.forEach((u) => u());
}
export const settings = Settings;
