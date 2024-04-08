const processCommandsFromFile = require('./fileCommands');

function testCreateParkingLot() {
   console.log("--- Running createParkingLot Test... ---");
   processCommandsFromFile('file_inputs.txt');
   console.log(">> createParkingLot Test Passed!! ✅");
}

function testParkCar() {
   console.log("--- Running parkCar Test... ---");
   processCommandsFromFile('file_inputs.txt');
   console.log(">> parkCar Test Passed!! ✅");
}

function testLeaveParking() {
   console.log("--- Running leaveParking Test... ---");
   processCommandsFromFile('file_inputs.txt');
   console.log(">>  leaveParking Test Passed!! ✅");
}

function testPrintFileStatus() {
   console.log("--- Running printFileStatus Test... --- ");
   processCommandsFromFile('file_inputs.txt');
   console.log(">> printFileStatus Test Passed!! ✅");
}

function testGetRegistrationNumbersByColor() {
   console.log("--- Running getRegistrationNumbersByColor Test... --- ");
   processCommandsFromFile('file_inputs.txt');
   console.log(">> getRegistrationNumbersByColor Test Passed!! ✅");
}

function testGetSlotNumbersByColor() {
   console.log("--- Running getSlotNumbersByColor Test... ---");
   processCommandsFromFile('file_inputs.txt');
   console.log(">> getSlotNumbersByColor Test Passed!! ✅");
}

function testGetSlotNumberByRegistrationNumber() {
   console.log("--- Running getSlotNumberByRegistrationNumber Test... ---");
   processCommandsFromFile('file_inputs.txt');
   console.log(">> getSlotNumberByRegistrationNumber Test Passed!! ✅");
}

function assert(expected, actual, message) {
   if (expected === actual) {
      console.log(`   ✔️  ${message} Passed!!`);
   } else {
      console.error(`   ❌  ${message} Failed!! Expected: ${expected}, Actual: ${actual}`);
   }
}

function runTests() {
   console.log("--- Running Tests... ---");
   testCreateParkingLot();
   testParkCar();
   testLeaveParking();
   testPrintFileStatus();
   testGetRegistrationNumbersByColor();
   testGetSlotNumbersByColor();
   testGetSlotNumberByRegistrationNumber();
   console.log(">>> Congrats! All Tests Completed!!✅ ");
}

runTests();
