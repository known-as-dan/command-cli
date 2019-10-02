import { Command, fire, help, init } from "./command";

export { Command, fire, help, init };

/**
 * @param args Arguments.
 */
function main(args: Array<string>): number {
	init();

	return 0; // By default we return 0(reference=exit_code) to indicate successful code execution.
}

// NOTE: This part should ALWAYS be at the end of the file.
const exit_code: number = main(process.argv)
// --------------------------------------------------------

// TO-DO:
// - Implement main function exit code functionality.