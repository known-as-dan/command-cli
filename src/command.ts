/**
 * Command-line command interface.
 */
interface CommandInterface {
	name: string;
	identifier: string;
	usage: string;
	commandFunction(args: Array<string>): void;
}

/**
 * Command-line command class.
 */
export class Command implements CommandInterface {
	name: string;
	identifier: string;
	usage: string;
	commandFunction: (args: Array<string>) => void;
	
	/**
	 * Command-line command class constructor.
	 * @param name Representative command name, so keep this a bit more descriptive.
	 * @param identifier Command identifier that's to be used when firing the command.
	 * @param usage Description of the command parameters. | Example: "<text>" or "<file_path>" etc...
	 * - Pass "null" or an empty string if you don't need this.
	 * @param commandFunction function to be executed when the command is used.
	 */
	constructor(name: string, identifier: string, usage: string, commandFunction: (args: Array<string>) => void) {
		this.name = name;
		this.identifier = identifier;
		this.usage = usage || ""; // Defaulting to an empty string if no command parameter usage description was provided
		this.commandFunction  = commandFunction;

		// Pushing the new command object into the 'commands' array.
		commands.push(this);
	}

	/**
	 * Returns the command's name.
	 */
	getName(): string {
		return this.name;
	}

	/**
	 * Returns the command's name.
	 */
	getIdentifier(): string {
		return this.identifier;
	}

	/**
	 * Returns the command's usage example.
	 */
	getUsage(): string {
		return this.usage;
	}

	/**
	 * Returns the command's function.
	 */
	getFunction(): (args: Array<string>) => void {
		return this.commandFunction;
	}

	/**
	 * Executes the command's function with the passed arguments.
	 * @param args Command arguments.
	 */
	execute(args: Array<string>): void {
		const func: (args: Array<string>) => void = this.getFunction();;
		func(args);
	}
}

/**
 * Holds all command objects.
 */
let commands: Array<Command> = [];

/**
 * Returns an array with all existing "Command" objects.
 */
function getCommands(): Array<Command> {
	return commands;
}

/**
 * Find a command object based on its identifier and/or name.
 * - Returns "null" if no match was found.
 * @param identifier Command identifier.
 * @param name Command name(Optional).
 */
function getCommand(identifier: string, name?: string): Command {
	const commands = getCommands();
	let command: Command;
	let command_identifier: string;
	let command_name: string;
	for (let i: number = 0; i < commands.length; i++) {
		command = commands[i];
		command_identifier = command.getIdentifier();
		command_name = command.getName();
		// Checking if either the identifier or name matches the current command.
		if ((identifier === command_identifier) || (name === command_name)) {
			return command;
		}
	}
	// We can assume that if we're here(beyond the for loop), that we haven't
	// found a match for the specified arguments, so we just return "null" to
	// indicate a failiure.
	return null;
}

/**
 * Print a list of all commands and their
 * information in the console.
 */
function help(): void {
	// format of the command info print-out
	let format = "[command_name] command_identifier command_usage"

	console.log("\nCommand List:");
	console.log(`Reference: ${format}`);

	// Grabbing the array of commands, iterating over them
	// and printing out their information.
	const commands: Array<Command> = getCommands();
	let command_name: string;
	let command_identifier: string;
	let command_usage: string;
	let info: string; // Command info to print.
	commands.forEach((command) => {
		command_name = command.getName();
		command_identifier = command.getIdentifier();
		command_usage = command.getUsage();
		info = `[${command_name}] ${command_identifier} ${command_usage}`
		console.log(info);
	});

	console.log("\n")
}

/**
 * This function is used to execute all kinds of commmands.
 * @param command_identifier Command identifier.
 * @param args Command arguments(Optional, defaults to an empty array: "[]").
 */
export function fire(command_identifier: string, args?: Array<string>): void {
	// If no command was used, then we print out the
	// help list with all the commmands.
	if (command_identifier === "") {
		help();
	} else {
		args = args || []; // Setting "args" to default to an empty array if it wasn't passed.

		// Finding the specified command by its identifier and executing it with the passed arguments
		const command = getCommand(command_identifier);
		command.execute(args);
	}
}


//
//			Default Commands
//

/**
 * Lists all available commands and their usage examples.
 */
new Command("Help", "help", "", (args: Array<string>) => {
	help();
});