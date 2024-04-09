const readline = require('readline');
const ParkingLot = require('./parkingLot');

const parking = new ParkingLot();
function processInteractiveCommands() {
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
   });

   console.log('Please input your commands: ("exit" to quit)');
   rl.on('line', input => {
      const [action, ...args] = input.split(' ');
      if (action === 'exit') {
         rl.close();
         return;
      }
      const commandFunction = interactiveCommandMappings[action];
      commandFunction ? commandFunction(args) : console.log('Invalid command, try again!');
   });
}

const interactiveCommandMappings = {
   'create_parking_lot': args => parking.createParkingLot(parseInt(args[0])),
   'park': args => parking.parkCar(args[0], args[1]),
   'leave': args => parking.leaveParking(parseInt(args[0])),
   'status': () => parking.printInteractiveStatus(),
   'registration_numbers_for_cars_with_colour': args => parking.getRegistrationNumbersByColor(args[0]),
   'slot_numbers_for_cars_with_colour': args => parking.getSlotNumbersByColor(args[0]),
   'slot_number_for_registration_number': args => parking.getSlotNumberByRegistrationNumber(args[0])
};

module.exports = processInteractiveCommands;
