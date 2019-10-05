export class Command {
	identifier: string;
	usage: string;
	description: string;
	commandFunction: (args: Array<string>) => void;
	
	/**
	 * @param identifier Command identifier that's to be used when firing the command.
	 * @param usage Description of the command parameters. | Example: "<text>" or "<file_path>" etc...
	 * - Pass an empty string if you don't need this.
	 * @param descrption Description of what the command actually does.
	 * @param commandFunction function to be executed when the command is used.
	 */
	constructor(identifier: string, usage: string, description: string, commandFunction: (args: Array<string>) => void) {
		this.identifier = identifier;
		this.usage = usage;
		this.description = description;
		this.commandFunction  = commandFunction;

		commands.push(this);
	}

	getIdentifier(): string {
		return this.identifier;
	}

	getUsage(): string {
		return this.usage;
	}

	getDescription(): string {
		return this.description;
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
	return [...commands];
}

/**
 * Find a command object based on its identifier.
 * - Returns "null" if no match was found.
 * @param identifier Command identifier.
 */
function getCommand(identifier: string): Command | null {
	const commands = getAllCommands();
	let command: Command;
	let command_identifier: string;
	for (let i: number = 0; i < commands.length; i++) {
		command = commands[i];
		command_identifier = command.getIdentifier();
		if (identifier === command_identifier) {
			return command;
		}
	}

	return null;
}

/**
 * Initialize command processing.
 * @param help Set whether or not you want the program to automatically
 * print out the list of available commands, if no command was used.
 * This is "true" by default. (Optional)
 * @param args You can choose to pass your own set of arguments,
 * but by default, the program will use "process.argv". (Optional)
 */
export function init(print_help?: boolean, args?: Array<string>): void {
	if (print_help != false) {
		print_help = true;
	}

	if (args) {
		if (args.length > 0) {
			args = [...args];
			const called_command = args[0]
			args.splice(0, 1)
			fire(called_command, args);
		} else {
			if (print_help) {
				help();
			}
		}
	} else if (process.argv) {
		args = [...process.argv];
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
	console.log("\nCommand List:");
	const commands: Array<Command> = getAllCommands();
	if (commands.length > 0) {
		let command_identifier: string;
		let command_usage: string;
		let command_description: string;
		let info: string;
		commands.forEach((command) => {
			command_identifier = command.getIdentifier();
			command_usage = command.getUsage();
			command_description = command.getDescription();
			info = `${command_identifier} ${command_usage} ${command_description}`
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
	args = [...args];

	const command: Command | null = getCommand(command_identifier);
	if (command instanceof Command) {
		command.execute(args);
	} else {
		const message: string = `Could not find a command named '${command_identifier}'!`;
		console.log(message);
	}
}