
const promptSync = require('prompt-sync');
const prompt = promptSync();

let items = [];

function showMenu() {
    console.log("\n--- CRUD Menu ---");
    console.log("1. Create (Add item)");
    console.log("2. Read (Show all items)");
    console.log("3. Update (Edit an item)");
    console.log("4. Delete (Remove an item)");
    console.log("5. Exit");
}

let choice;
do {
    showMenu();
    choice = prompt("Enter your choice (1-5): ");

    switch (choice) {
        case '1':
            const newItem = prompt("Enter item to add: ");
            items.push(newItem);
            console.log("Item added successfully!");
            break;

        case '2':
            console.log("\n--- Item List ---");
            if (items.length === 0) {
                console.log("No items found.");
            } else {
                items.forEach((item, index) => {
                    console.log(`${index + 1}. ${item}`);
                });
            }
            break;

        case '3':
            const updateIndex = parseInt(prompt("Enter item number to update: ")) - 1;
            if (updateIndex >= 0 && updateIndex < items.length) {
                const updatedItem = prompt("Enter new value: ");
                items[updateIndex] = updatedItem;
                console.log("Item updated successfully!");
            } else {
                console.log("Invalid item number.");
            }
            break;

        case '4':
            const deleteIndex = parseInt(prompt("Enter item number to delete: ")) - 1;
            if (deleteIndex >= 0 && deleteIndex < items.length) {
                items.splice(deleteIndex, 1);
                console.log("Item deleted successfully!");
            } else {
                console.log("Invalid item number.");
            }
            break;

        case '5':
            console.log("Exiting program. Goodbye!");
            break;

        default:
            console.log("Invalid choice! Please enter a number from 1 to 5.");
    }
} while (choice !== '5');


