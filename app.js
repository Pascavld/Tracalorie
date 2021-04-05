// Storage Controller

// Item Controller
const ItemCtrl = (function () {
    // Item Constructor with id, name, calories
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure / State with items, current item and total calories + hard-coded data
    const data = {
        items: [
            // { id: 0, name: "Steak Dinner", calories: 1200 },
            // { id: 1, name: "Cookie", calories: 400 },
            // { id: 2, name: "Eggs", calories: 300 },
        ],
        currentItem: null,
        totalCalories: 0,
    };

    // Public method that returns data
    return {
        // return the data items
        getItems: function () {
            return data.items;
        },
        // add item function
        addItem: function (name, calories) {
            let ID;

            // create id
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // calories to number
            calories = parseInt(calories);

            // Create new item and push it to the data items
            newItem = new Item(ID, name, calories);

            data.items.push(newItem);

            // return the new item
            return newItem;
        },

        // create the get item by id function
        getItemById: function (id) {
            let found = null;

            // Loop through the items and check for the id
            data.items.forEach(function (item) {
                if (item.id === id) {
                    found = item;
                }
            });

            return found;
        },
        // create update item function
        updateItem: function (name, calories) {
            // calories to number
            calories = parseInt(calories);

            // create found and set to null
            let found = null;

            // loop through the items, and if ids are the same update name and calories
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },
        // create the delete item function
        deleteItem: function (id) {
            // get the ids using map
            const ids = data.items.map(function (item) {
                return item.id;
            });

            // get the index
            const index = ids.indexOf(id);

            // remove item
            data.items.splice(index, 1);
        },
        // create the set current item function
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        //create get current item function
        getCurrentItem: function () {
            return data.currentItem;
        },
        // create the get total calories function
        getTotalCalories: function () {
            let total = 0;

            // loop through items and add cal
            data.items.forEach(function (item) {
                total += item.calories;
            });

            // Set total cal in data structure
            data.totalCalories = total;

            // return total calories
            return data.totalCalories;
        },
        logData: function () {
            return data;
        },
    };
})();

// UI Controller
const UICtrl = (function () {
    // Create the UI Selectors object with their ids
    const UISelectors = {
        itemList: "#item-list",
        listItems: "#item-list li",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        totalCalories: ".total-calories",
        editBtn: "edit-item",
    };

    // Public Methods
    return {
        // Populate item list looping through the items
        populateItemList: function (items) {
            let html = "";

            items.forEach(function (item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"
                        ><i class="edit-item fa fa-pencil"></i
                    ></a>
                </li>
                `;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        // get item input
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput)
                    .value,
            };
        },
        // create add list item function
        addListItem: function (item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display =
                "block";

            // create li element
            const li = document.createElement("li");

            // add class
            li.className = "collection-item";

            //add ID
            li.id = `item-${item.id}`;

            // Add HTML, just what's inside
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"
                ><i class="edit-item fa fa-pencil"></i
            ></a>
            `;

            // insert item - insert adjacent element, beforeend, li
            document
                .querySelector(UISelectors.itemList)
                .insertAdjacentElement("beforeend", li);
        },
        // create update list item function
        updateListItem: function (item) {
            // get the list items
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into array
            listItems = Array.from(listItems);

            // loop through the list items, get the id of the item list and if it matches and if it does change the inner html of that element
            listItems.forEach(function (listItem) {
                const itemID = listItem.getAttribute("id");

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"
                        ><i class="edit-item fa fa-pencil"></i
                    ></a>
                    `;
                }
            });
        },
        // create the delete list item function, get the id, select and remove it
        deleteListItem: function (id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        // create clear input function
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        // create the add item to form function
        addItemToForm: function () {
            document.querySelector(
                UISelectors.itemNameInput
            ).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(
                UISelectors.itemCaloriesInput
            ).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        // create hide list function
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = "none";
        },
        // create the show total calories function
        showTotalCalories: function (totalCalories) {
            document.querySelector(
                UISelectors.totalCalories
            ).textContent = totalCalories;
        },
        // create clear edit state function, hide buttons and show add
        clearEditState: function () {
            UICtrl.clearInput();

            document.querySelector(UISelectors.updateBtn).style.display =
                "none";
            document.querySelector(UISelectors.deleteBtn).style.display =
                "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },
        // create show edit state function, display the buttons
        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display =
                "inline";
            document.querySelector(UISelectors.deleteBtn).style.display =
                "inline";
            document.querySelector(UISelectors.backBtn).style.display =
                "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },
        // return the UI selectors
        getSelectors: function () {
            return UISelectors;
        },
    };
})();

// App Controller with the other controllers
const App = (function (ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // get the UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document
            .querySelector(UISelectors.addBtn)
            .addEventListener("click", itemAddSubmit);

        // disable submit on enter, prevent default and return false
        document.addEventListener("keypress", function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // edit icon click event
        document
            .querySelector(UISelectors.itemList)
            .addEventListener("click", itemEditClick);

        // update item event
        document
            .querySelector(UISelectors.updateBtn)
            .addEventListener("click", itemUpdateSubmit);

        // delete button event
        document
            .querySelector(UISelectors.deleteBtn)
            .addEventListener("click", itemDeleteSubmit);

        // Back button event
        document
            .querySelector(UISelectors.backBtn)
            .addEventListener("click", function (e) {
                UICtrl.clearInput();

                document.querySelector(UISelectors.updateBtn).style.display =
                    "none";
                document.querySelector(UISelectors.deleteBtn).style.display =
                    "none";
                document.querySelector(UISelectors.backBtn).style.display =
                    "none";
                document.querySelector(UISelectors.addBtn).style.display =
                    "inline";

                e.preventDefault();
            });
    };

    // Add item submit function
    const itemAddSubmit = function (e) {
        // get form input from UI controller
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if (input.name !== "" && input.calories !== "") {
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total cal to the UI
            UICtrl.showTotalCalories(totalCalories);

            // clear input fields
            UICtrl.clearInput();
        }

        // prevent default
        e.preventDefault();
    };

    // item edit click function
    const itemEditClick = function (e) {
        //init the Ui selectors
        const UISelectors = UICtrl.getSelectors();

        // check to work only when the click is on the edit button
        if (e.target.classList.contains(UISelectors.editBtn)) {
            // Get list item id (item-0, item-1) of the parent
            const listId = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArr = listId.split("-");

            // get the actual ID
            const id = parseInt(listIdArr[1]);

            // get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // add item to Form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    };

    // create update item submit function
    const itemUpdateSubmit = function (e) {
        // get item input
        const input = UICtrl.getItemInput();

        // update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update ui
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total cal to the UI
        UICtrl.showTotalCalories(totalCalories);

        // clear the edit state
        UICtrl.clearEditState();

        e.preventDefault();
    };

    // create the item delete submit function
    const itemDeleteSubmit = function (e) {
        // get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // clear the edit state
        UICtrl.clearEditState();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total cal to the UI
        UICtrl.showTotalCalories(totalCalories);

        e.preventDefault();
    };

    // Public methods
    return {
        init: function () {
            // clear edit state / set initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // check if any items, and if the length is 0 hide list, otherwise populate it
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate lists with items
                UICtrl.populateItemList(items);
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total cal to the UI
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        },
    };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
