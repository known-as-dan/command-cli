import { Command, init, fire, help } from "./command";

export { Command, init, fire, help };

/**
 * @param args Arguments.
 */
function main(args: Array<string>): number {
	return 0; // 0 == successful execution
}

// NOTE: This part should ALWAYS be at the end of the file!
const exit_code: number = main([...process.argv]);

// TO-DO:
// - Implement main function exit code functionality.