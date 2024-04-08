const processCommandsFromFile = require('./fileCommands');
const processInteractiveCommands = require('./interactiveCommands');

const fileName = process.argv[2];
if (fileName) {
   processCommandsFromFile(fileName);
} else {
   processInteractiveCommands();
}
