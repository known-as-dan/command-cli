interface CommandInterface {
	name: string;
	identifier: string;
	usage: string;
	commandFunction(args: Array<string>): void;
}

export class Command implements CommandInterface {
	name: string;
	identifier: string;
	usage: string;
	commandFunction: (args: Array<string>) => void;
	
	/**
	 * @param name Representative command name, so keep this a bit more descriptive.
	 * @param identifier Command identifier that's to be used when firing the command.
	 * @param usage Description of the command parameters. | Example: "<text>" or "<file_path>" etc...
	 * - Pass an empty string if you don't need this.
	 * @param commandFunction function to be executed when the command is used.
	 */
	constructor(name: string, identifier: string, usage: string, commandFunction: (args: Array<string>) => void) {
		this.name = name;
		this.identifier = identifier;
		this.usage = usage || "";
		this.commandFunction  = commandFunction;

		commands.push(this);
	}

	getName(): string {
		return this.name;
	}

	getIdentifier(): string {
		return this.identifier;
	}

	getUsage(): string {
		return this.usage;
	}

	getFunction(): (args: Array<string>) => void {
		return this.commandFunction;
	}

	/**
	 * @param args Command arguments.
	 */
	execute(args: Array<string>): void {
		const func: (args: Array<string>) => void = this.getFunction();;
		func(args);
	}
}
let commands: Array<Command> = [];

function getAllCommands(): Array<Command> {
	return commands;
}

/**
 * Find a command object based on its identifier and/or name.
 * - Returns "null" if no match was found.
 * @param identifier Command identifier. (Optional)
 * @param name Command name. (Optional)
 */
function getCommand(identifier?: string, name?: string): Command | null {
	identifier = identifier || "";
	name = name || "";

	const commands = getAllCommands();
	let command: Command;
	let command_identifier: string;
	let command_name: string;
	for (let i: number = 0; i < commands.length; i++) {
		command = commands[i];
		command_identifier = command.getIdentifier();
		command_name = command.getName();
		if ((identifier === command_identifier) || (name === command_name)) {
			return command;
		}
	}

	return null;
}

/**
 * 
 * @param help Set whether or not you want the program to automatically
 * print out the list of available commands, if no command was used.
 * This is "true" by default. (Optional)
 * @param args You can choose to pass your own set of arguments,
 * but by default, the program will use "process.argv". (Optional)
 */
export function init(print_help?: boolean, args?: Array<string>): void {
	print_help = print_help || true; // "print_help" defaults to "true".
	
	if (args) {
		if (args.length > 0) {
			const called_command = args[0]
			args.splice(0, 1)
			fire(called_command, args);
		} else {
			if (print_help) {
				help();
			}
		}
	} else if (process.argv) {
		args = process.argv;
		if (args.length > 2) { // ignoring the initial two arguments("node" & "path/to/file.js")
			const called_command = args[2];
			args.splice(0, 3);
			fire(called_command, args);
		} else {
			if (print_help) {
				help();
			}
		}
	}
}

/**
 * Print a list of all commands and their
 * information in the console.
 */
export function help(): void {
	// format of the command info print-out
	let format = "[command_name] command_identifier command_usage"

	console.log("\nCommand List:");
	console.log(`Reference: ${format}`);

	// Grabbing the array of commands, iterating over them
	// and printing out their information.
	const commands: Array<Command> = getAllCommands();
	if (commands.length > 0) {
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
	} else {
		console.log(" - There are no commands!");
	}

	console.log() // Spacing.
}

/**
 * Executes the specified commands.
 * @param command_identifier Command identifier.
 * @param args Command arguments. (Optional)
 */
export function fire(command_identifier: string, args?: Array<string>): void {
	args = args || [];

	const command: Command | null = getCommand(command_identifier);
	if (command instanceof Command) {
		command.execute(args);
	} else {
		const message: string = `Could not find a command named '${command_identifier}'! Use the command "help" to get a list of all available commands.`;
		console.log(message);
	}
}