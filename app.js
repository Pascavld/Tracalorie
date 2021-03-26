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
            { id: 0, name: "Steak Dinner", calories: 1200 },
            { id: 1, name: "Cookie", calories: 400 },
            { id: 2, name: "Eggs", calories: 300 },
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
        addBtn: ".add-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
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
    };

    // Add item submit function
    const itemAddSubmit = function (e) {
        // get form input from UI controller
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if (input.name !== "" && input.calories !== "") {
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        }

        // prevent default
        e.preventDefault();
    };

    // Public methods
    return {
        init: function () {
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Populate lists with items
            UICtrl.populateItemList(items);

            // Load event listeners
            loadEventListeners();
        },
    };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
