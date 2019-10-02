# About
Command is a simple framework for handling command execution within your node application.

# Usage
Recreating the common "echo" command using Command & Typescript:
```Typescript
import { Command, init } from "@known-as-dan/command";

new Command("echo", "<message>", "Send a message.", (args: Array<string>) => {
	const message = args.join();
	console.log(message);
});

init();
```