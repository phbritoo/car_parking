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
      console.log(`>> Created a parking lot with ${slotsCount} slots`);
   }

   parkingEntrance(registrationNumber, color) {
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

   parkingExit(slotNumber) {
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

