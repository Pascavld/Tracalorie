// Storage Controller
const StorageCtrl = (function () {
    // public methods
    return {
        // create the store item function
        storeItem: function (item) {
            let items;

            // check if any items in ls
            if (localStorage.getItem("items") === null) {
                items = [];

                // push new item
                items.push(item);

                // set ls
                localStorage.setItem("items", JSON.stringify(items));
            } else {
                // get the existing items
                items = JSON.parse(localStorage.getItem("items"));

                // push the new item
                items.push(item);

                // reset ls
                localStorage.setItem("items", JSON.stringify(items));
            }
        },
        // create get items from storage function
        getItemsFromStorage: function () {
            let items;

            // check if there are any items in storage
            if (localStorage.getItem("items") === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem("items"));
            }
            return items;
        },
        // create the update item storage function
        updateItemStorage: function (updatedItem) {
            // get the items
            let items = JSON.parse(localStorage.getItem("items"));

            // loop through each item and splice the old one while using the updated one instead
            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            // reset ls
            localStorage.setItem("items", JSON.stringify(items));
        },
        // create the delete item from storage function
        deleteItemFromStorage: function (id) {
            // get the items
            let items = JSON.parse(localStorage.getItem("items"));

            // loop through each item and splice the old one while using the updated one instead
            items.forEach((item, index) => {
                if (id === item.id) {
                    items.splice(index, 1);
                }
            });
            // reset ls
            localStorage.setItem("items", JSON.stringify(items));
        },
        // create the clear items from storage function
        clearItemsFromStorage: function () {
            localStorage.removeItem("items");
        },
    };
})();

// Item Controller
const ItemCtrl = (function () {
    // Item Constructor with id, name, calories
    const Item = function (id, name, calories, date) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.date = date;
    };

    // Data Structure / State with items, current item and total calories + hard-coded data
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
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
        addItem: function (name, calories, date) {
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
            newItem = new Item(ID, name, calories, date);

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
        updateItem: function (name, calories, date) {
            // calories to number
            calories = parseInt(calories);

            // create found and set to null
            let found = null;

            // loop through the items, and if ids are the same update name and calories
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    item.date = date;
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
        // create the delete all items function
        clearAllItems: function () {
            data.items = [];
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
        clearBtn: ".clear-btn",
        itemNameInput: "#item-name",
        itemDateInput: "#item-date",
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
                    <strong>${item.name}: </strong> <em>${item.calories} Calories,</em>
                    <strong> Date: </strong><em>${item.date}</em>
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
                date: document.querySelector(UISelectors.itemDateInput).value,
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
            <strong> Date: </strong><em>${item.date}</em>
            <a href="#" 
            class="secondary-content"
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
                    <strong> Date: </strong><em>${item.date}</em>
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
            document.querySelector(UISelectors.itemDateInput).value = "";
        },
        // create the add item to form function
        addItemToForm: function () {
            document.querySelector(
                UISelectors.itemNameInput
            ).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(
                UISelectors.itemCaloriesInput
            ).value = ItemCtrl.getCurrentItem().calories;
            document.querySelector(
                UISelectors.itemDateInput
            ).value = ItemCtrl.getCurrentItem().date;
            UICtrl.showEditState();
        },
        //create remove items function
        removeItems: function () {
            // get the all list items
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into array
            listItems = Array.from(listItems);

            // loop through the array and remove each item
            listItems.forEach(function (item) {
                item.remove();
            });
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
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
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

        // clear all button event
        document
            .querySelector(UISelectors.clearBtn)
            .addEventListener("click", clearAllItemsClick);

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
        if (input.name !== "" && input.calories !== "" && input.date !== "") {
            // Add Item
            const newItem = ItemCtrl.addItem(
                input.name,
                input.calories,
                input.date
            );

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total cal to the UI
            UICtrl.showTotalCalories(totalCalories);

            // store in local storage
            StorageCtrl.storeItem(newItem);

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
        const updatedItem = ItemCtrl.updateItem(
            input.name,
            input.calories,
            input.date
        );

        // Update ui
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total cal to the UI
        UICtrl.showTotalCalories(totalCalories);

        // update local storage
        StorageCtrl.updateItemStorage(updatedItem);

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

        // delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        e.preventDefault();
    };

    // create the clear items event function
    const clearAllItemsClick = function () {
        // delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total cal to the UI
        UICtrl.showTotalCalories(totalCalories);

        // remove from UI
        UICtrl.removeItems();

        //clear all items from local storage
        StorageCtrl.clearItemsFromStorage();

        // hide the ul
        UICtrl.hideList();
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
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
