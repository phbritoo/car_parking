const fs = require('fs');
const readline = require('readline');

class Parking {
   constructor() {
      this.slots = [];
      this.slots = [];
      this.registrationNumbersByColor = {};
      this.slotNumbersByColor = {};
      this.slotNumberByRegistrationNumber = {};
   }

   initializeParking(slotsCount) {
      this.slots = Array.from({ length: slotsCount }, (_, i) => ({ number: i + 1, occupied: false, registrationNumber: null, color: null }));
      console.log(`Created a parking lot with ${slotsCount} slots`);
   }

   entranceParking(registrationNumber, color) {
      const availableSlot = this.slots.find(slot => !slot.occupied);
      if (!availableSlot) {
         console.log('Sorry, parking lot is full');
         return;
      }
      availableSlot.occupied = true;
      availableSlot.registrationNumber = registrationNumber;
      availableSlot.color = color;
      console.log(`Allocated slot number: ${availableSlot.number}`);
   }

   exitParking(slotNumber) {
      const slotIndex = slotNumber - 1;
      if (!this.slots[slotIndex] || !this.slots[slotIndex].occupied) {
         console.log(`Slot number ${slotNumber} is already free`);
         return;
      }

      const registrationNumber = this.slots[slotIndex].registrationNumber;
      const color = this.slots[slotIndex].color;

      delete this.slotNumberByRegistrationNumber[slotNumber];
      this.registrationNumbersByColor[color] = this.registrationNumbersByColor[color] || [];
      this.registrationNumbersByColor[color] = this.registrationNumbersByColor[color].filter(reg => reg !== registrationNumber);

      this.slotNumbersByColor[color] = this.slotNumbersByColor[color] || [];
      this.slotNumbersByColor[color] = this.slotNumbersByColor[color].filter(slot => slot !== slotNumber);

      this.slots[slotIndex].occupied = false;
      this.slots[slotIndex].registrationNumber = null;
      this.slots[slotIndex].color = null;

      console.log(`Slot number ${slotNumber} is free`);
   }

   status() {
      console.log('Slot No.');
      console.log('Registration No Colour');
      this.slots.forEach(slot => {
         if (slot.occupied) {
            console.log(`${slot.number} ${slot.registrationNumber} ${slot.color}`);
         }
      });
   }

   getRegistrationNumbersByColor(color) {
      const registrationNumbers = this.slots.filter(slot => slot.occupied && slot.color === color)
         .map(slot => slot.registrationNumber);
      console.log(registrationNumbers.join(', '));
   }

   getSlotNumbersByColor(color) {
      const slotNumbers = this.slots.filter(slot => slot.occupied && slot.color === color)
         .map(slot => slot.number);
      console.log(slotNumbers.join(', '));
   }

   getSlotNumberByRegistrationNumber(registrationNumber) {
      const slotNumber = this.slots.find(slot => slot.occupied && slot.registrationNumber === registrationNumber)?.number || 'Not found, please try again!';
      console.log(slotNumber);
   }


}
function processCommands(commands) {
   const parkingLot = new Parking();

   commands.forEach(command => {
      const [action, ...args] = command.split(' ');
      switch (action) {
         case 'create_parking_lot':
            parkingLot.initializeParking(parseInt(args[0]));
            break;
         case 'park':
            parkingLot.entranceParking(args[0], args[1]);
            break;
         case 'leave':
            parkingLot.exitParking(parseInt(args[0]));
            break;
         case 'status':
            parkingLot.status();
            break;
         case 'registration_numbers_for_cars_with_colour':
            parkingLot.getRegistrationNumbersByColor(args[0]);
            break;
         case 'slot_numbers_for_cars_with_colour':
            parkingLot.getSlotNumbersByColor(args[0]);
            break;
         case 'slot_number_for_registration_number':
            parkingLot.getRegistrationNumbersByColor(args[0]);
            break;
         default:
            console.log('Invalid command');
      }
   });
}

function processInputFromFile(fileName) {
   const commands = fs.readFileSync(fileName, 'utf8').trim().split('\n');
   const parking = new Parking();
   processCommands(commands, parking);
}

function processInteractiveInput() {
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
   });

   const parking = new Parking();
   console.log('Interactive mode. Please input your commands:');
   rl.on('line', input => {
      const [action, ...args] = input.split(' ');
      const commandFunction = commandMappings[action];
      if (commandFunction) {
         commandFunction(args);
      } else {
         console.log('Invalid command');
      }
      if (action === 'exit') {
         rl.close();
      }
   });
}

const fileName = process.argv[2];
if (fileName) {
   processInputFromFile(fileName);
} else {
   processInteractiveInput();
}

