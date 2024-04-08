const fs = require('fs');
const ParkingLot = require('./parkingLot');

function processFileCommands(commands) {
   const parkingLot = new ParkingLot();
   commands.forEach(command => {
      const [action, ...args] = command.split(' ');
      switch (action) {
         case 'create_parking_lot':
            parkingLot.createParkingLot(parseInt(args[0]));
            break;
         case 'park':
            parkingLot.parkCar(args[0], args[1]);
            break;
         case 'leave':
            parkingLot.leaveParking(parseInt(args[0]));
            break;
         case 'status':
            parkingLot.printFileStatus();
            break;
         case 'registration_numbers_for_cars_with_colour':
            parkingLot.getRegistrationNumbersByColor(args[0]);
            break;
         case 'slot_numbers_for_cars_with_colour':
            parkingLot.getSlotNumbersByColor(args[0]);
            break;
         case 'slot_number_for_registration_number':
            parkingLot.getSlotNumberByRegistrationNumber(args[0]);
            break;
         default:
            console.log('Invalid command');
      }
   });
}

function processCommandsFromFile(fileName) {
   const commands = fs.readFileSync(fileName, 'utf8').trim().split('\n');
   processFileCommands(commands);
}

module.exports = processCommandsFromFile;
