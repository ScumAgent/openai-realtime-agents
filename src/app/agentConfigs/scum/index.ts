import { AgentConfig } from "@/app/types";
import { injectTransferTools } from "../utils";
import scum from "./scum";
import wallet from "./wallet";

// TODO: call o1 then check eligibility for important actions.
scum.downstreamAgents = [wallet];
wallet.downstreamAgents = [scum];

const agents = injectTransferTools([
  scum,
  wallet,
]);

export default agents;
