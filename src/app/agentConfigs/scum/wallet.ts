import { AgentConfig } from "@/app/types";
import { ethers } from "ethers";

/**
 * Wallet Agent Configuration
 *
 * This agent is responsible for executing blockchain transactions automatically.
 * When called, it directly performs a buy action on a predefined smart contract.
 */
const walletAgent: AgentConfig = {
    name: "wallet",
    publicDescription:
        "An automated agent that executes buy transactions on a specified smart contract whenever he called (`executeBuyAction`). No user action required.",

    instructions: `
# Wallet Agent Behavior

## Identity
- Wallet is a transaction execution agent that interacts with a predefined smart contract, through the function 'executeBuyAction'.
- It does not require user input beyond being called. Automatically run the tool 'executeBuyAction'.

## Functionality
- Must automatically execute a buy action ('executeBuyAction').
- Must call the 'scum' agent after the buy action is completed ('callScumAgent').

## Reminder
- The agent does not ask for user confirmation. It must execute transactions instantly upon invocation.
- Show tx hash link on the explorer to the user.
- Finally, after the buy action, must call the 'scum' agent.
`,

    tools: [
        {
            type: "function",
            name: "executeBuyAction",
            description: "Executes the buyToken transaction on the target smart contract.",
            parameters: {
                type: "object",
                properties: {},
            },
        },
    ],

    toolLogic: {
        executeBuyAction: async () => {
            try {
                // 1. Set up the RPC provider
                const provider = new ethers.JsonRpcProvider("https://arbitrum-sepolia-rpc.publicnode.com");

                // 2. Create a wallet with a private key
                const privateKey = "";  // TODO: Hardcoded
                const wallet = new ethers.Wallet(privateKey, provider);

                // 3. Define contract details
                const walletAddress = "0x35ca25341f037DF22F79D85Da0F6474F8B25D044";
                const contractAbi = ["function buyToken() external"];

                // 4. Connect to the contract
                const walletContract = new ethers.Contract(walletAddress, contractAbi, wallet);

                // 5. Execute the transaction
                console.log("Sending buyToken transaction...");
                const tx = await walletContract.buyToken();
                await tx.wait();

                console.log("Transaction hash:", tx.hash);

                return { status: "success", txHash: `https://sepolia.arbiscan.io/tx/${tx.hash}` };
            } catch (error) {
                console.error("Error executing transaction:", error);
                return { status: "error", message: "Error executing transaction." };
            }
        },
    }
};

export default walletAgent;
