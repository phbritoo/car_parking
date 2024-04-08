const fs = require('fs');
const readline = require('readline');

class Parking {
   constructor() {
      this.slots = [];
  }

   initializeParking(slotsCount) {
       this.slots = Array.from({ length: slotsCount }, (_, i) => ({ number: i + 1, occupied: false, registrationNumber: null, color: null }));
       console.log(`>> Created a parking lot with ${slotsCount} slots`);
   }

   carParking(registrationNumber, color) {
      const availableSlot = this.slots.find(slot => !slot.occupied);
      if (!availableSlot) {
          console.log('>> Sorry, parking lot is full :( ');
          return;
      }
      availableSlot.occupied = true;
      availableSlot.registrationNumber = registrationNumber;
      availableSlot.color = color;
      console.log(`>> Allocated slot number: ${availableSlot.number}`);
  }
}

function processCommandsFromFile(fileName) {

}

function processInteractiveCommands() {

}

const fileName = process.argv[2];
if (fileName) {
   processCommandsFromFile(fileName);
} else {
   processInteractiveCommands();
}

