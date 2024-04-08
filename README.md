Automated Parking System

This project implements an automated parking system in Node.js, allowing users to interact with a multi-storey parking lot via a command-line interface (CLI). The system enables car registration, parking slot allocation, slot release, and various queries.

Features

- Parking Lot Creation: Users can create a parking lot by specifying the number of available slots.
- Car Registration: Register a car in the parking lot by providing the license plate number and the car's color. The system automatically allocates the nearest available slot.
- Slot Release: Release a parking slot by specifying the slot number.
- Status Inquiry: Inquire about the current status of the parking lot, displaying occupied slots and details of parked cars.
- Information Query: Perform queries such as:
  - Registration numbers of cars with a specific color.
  - Slot number where a car with a specific registration number is parked.
  - Slot numbers where cars of a specific color are parked.

Usage Modes

The system supports two usage modes:

1. File Mode: Provide commands in an input file. Processed commands and results are written to an output file.

   Example:
   $ node index.js file_inputs.txt > file_output.txt

2. Interactive Mode: Interact with the system through a command-line interface (CLI) by typing commands directly into the terminal.

   Example:
   $ node index.js



Running Tests:

$ node index.test.js


Project Structure

- fileCommands.js: Process commands provided in an input file.
- interactiveCommands.js: Implement the command-line interface (CLI) for user interaction.
- parkingLot.js: Contains core logic, including parking functionalities.
- index.js: Entry point, controls execution mode (file or interactive).
- file_inputs.txt: Example input file for testing.
- index.test.js: Automated test file.



Author
Developed by Paulo Brito.

License

This project is licensed under the MIT License.
