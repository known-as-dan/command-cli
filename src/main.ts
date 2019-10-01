import { fire, Command } from "./command";

export { fire, Command };

/**
 * This is the main function, it's executed once the rest
 * of the code is finished processing. The main function
 * holds most runtime related logic/behaviour.
 * @param args Arguments(generally command-line arguments).
 */
function main(args: Array<string>): number {
	// Checking if at least a single argument was passed.
	// First two are generally just node and the javascript
	// file, so we're looking for more than that(2).
	if (args.length > 2) {
		const called_command: string = args[2];
		args.splice(0, 3); // Slicing out the initial two arguments(node and js file) and the command, leaving only the arguments.
		fire(called_command, args); // Firing the command and passing the left-over arguments to it.
	} else {
		fire("help"); // Firing the "help" command to print out all available commands if no command was used.
	}

	return 0; // By default we return 0(reference=exit_code) to indicate successful code execution.
}

// Calling main function + passing command-line arguments.
const args: Array<string> = process.argv // Command-line arguments.
const exit_code: number = main(args) // Calling the main function + Storing the exit code.

// TO-DO:
//
// - Implement main function exit code functionality.