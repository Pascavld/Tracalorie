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
        logData: function () {
            return data;
        },
    };
})();

// UI Controller
const UICtrl = (function () {
    // Public Methods
    return {};
})();

// App Controller with the other controllers
const App = (function (ItemCtrl, UICtrl) {
    // Public methods
    return {
        init: function () {},
    };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
