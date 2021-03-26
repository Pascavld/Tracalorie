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
    };
})();

// App Controller with the other controllers
const App = (function (ItemCtrl, UICtrl) {
    // Public methods
    return {
        init: function () {
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Populate lists with items
            UICtrl.populateItemList(items);
        },
    };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
