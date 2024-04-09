const processCommandsFromFile = require('./fileCommands');
const ParkingLot = require('./parkingLot');

function test(name, fn) {
   try {
      fn();
      console.log(`${name} ... PASS ✅`);
   } catch (error) {
      console.error(`${name} ... FAIL ❌`);
      console.error(error);
   }
}

test('>> creates a parking lot with correct slots', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(5);
   if (parking.slots.length !== 5) {
      throw new Error('ERROR: The parking lot was not created with the correct number of slots');
   }
});

test('>> creates a file output through file input.txt', () => {
   processCommandsFromFile('file_inputs.txt');
});

test('>> parks a car in an available slot', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(5);
   parking.parkCar('KA-01-AA-1111', 'White');
   if (!parking.slots[0].occupied) {
      throw new Error('ERROR: The car was not parked in an available slot');
   }
});

test('>> returns the slot of a parked car', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(5);
   parking.parkCar('KA-01-AA-1111', 'White');
   const slotNumber = parking.slotNumberByRegistrationNumber['KA-01-AA-1111'];
   if (slotNumber !== 1) {
      throw new Error('ERROR: The slot of the parked car was not returned correctly');
   }
});

test('>> returns the slots of cars of a color', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(5);
   parking.parkCar('KA-01-AA-1111', 'White');
   parking.parkCar('KA-02-AA-1111', 'White');
   const slotNumbers = parking.slotNumbersByColor['White'];
   if (!slotNumbers || slotNumbers.join(',') !== '1,2') {
      throw new Error('ERROR: The slots of cars of a color were not returned correctly');
   }
});

test('>> returns the registration numbers of cars of a color', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(5);
   parking.parkCar('KA-01-AA-1111', 'White');
   parking.parkCar('KA-02-AA-1111', 'White');
   const registrationNumbers = parking.registrationNumbersByColor['White'];
   if (!registrationNumbers || registrationNumbers.join(',') !== 'KA-01-AA-1111,KA-02-AA-1111') {
      throw new Error('ERROR: The registration numbers of cars of a color were not returned correctly');
   }
});

test('>> frees a slot of a parked car', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(5);
   parking.parkCar('KA-01-AA-1111', 'White');
   parking.leaveParking(1);
   if (parking.slots[0].occupied) {
      throw new Error('ERROR: The slot of a parked car was not freed correctly');
   }
});

test('>> tries to park a car in a full parking lot', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(1);
   parking.parkCar('KA-01-AA-1111', 'White');
   const fn = () => parking.parkCar('KA-02-AA-1111', 'Black');
   if (fn()) {
      throw new Error('ERROR: The car was parked even with the parking lot full');
   }
});

test('>> tries to free an unoccupied slot', () => {
   const parking = new ParkingLot();
   parking.createParkingLot(2);
   const fn = () => parking.leaveParking(1);
   if (fn()) throw new Error('ERROR: An unoccupied slot was freed');
});
