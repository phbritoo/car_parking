const processCommandsFromFile = require('./fileCommands');
const processInteractiveCommands = require('./interactiveCommands');

const fileName = process.argv[2];
fileName ? processCommandsFromFile(fileName) : processInteractiveCommands()
