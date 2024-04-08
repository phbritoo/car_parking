class ParkingLot {
   constructor() {
      this.slots = [];
      this.registrationNumbersByColor = {};
      this.slotNumbersByColor = {};
      this.slotNumberByRegistrationNumber = {};
   }

   createParkingLot(slotsCount) {
      this.slots = Array.from({ length: slotsCount }, (_, i) => ({ number: i + 1, occupied: false, registrationNumber: null, color: null }));
      console.log(`Created a parking lot with ${slotsCount} slots`);
   }

   parkCar(registrationNumber, color) {
      const availableSlot = this.slots.find(slot => !slot.occupied);
      if (!availableSlot) {
         console.log('Sorry, parking lot is full');
         return;
      }
      availableSlot.occupied = true;
      availableSlot.registrationNumber = registrationNumber;
      availableSlot.color = color;

      this.registrationNumbersByColor[color] = this.registrationNumbersByColor[color] || [];
      this.registrationNumbersByColor[color].push(registrationNumber);
      this.slotNumbersByColor[color] = this.slotNumbersByColor[color] || [];
      this.slotNumbersByColor[color].push(availableSlot.number);
      this.slotNumberByRegistrationNumber[registrationNumber] = availableSlot.number;
      console.log(`Allocated slot number: ${availableSlot.number}`);
   }

   leaveParking(slotNumber) {
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

   printInteractiveStatus() {
      console.log('Slot No.\nRegistration NoColour');
      this.slots.forEach(slot => {
         if (slot.occupied) {
            console.log(`${slot.number}\n${slot.registrationNumber}\n${slot.color}`);
         }
      });
   }

   printFileStatus() {
      console.log('Slot No. Registration No Colour');
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
      const slotNumber = this.slots.find(slot => slot.occupied && slot.registrationNumber === registrationNumber)?.number || 'Not found';
      console.log(slotNumber);
   }
}

module.exports = ParkingLot;
