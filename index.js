'use strict';

const STORE = [
    {id: cuid(), name: "apples", checked: false},
    {id: cuid(), name: "oranges", checked: false},
    {id: cuid(), name: "milk", checked: true},
    {id: cuid(), name: "bread", checked: false},
];

function generateItemElement(item, itemIndex, template) {
    return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
    }

function generateShoppingItemsString(shoppingList) {
    console.log("Generating shopping list element");

    const items = shoppingList.map((item) => 
    generateItemElement(item)); 
    
    return items.join("");
}

function renderShoppingList() {
    // this function will be responsible for rendering the shopping list in
    // // the DOM
    // ----------------------------------------------------------------------------------
    // for each item in store, generate string representing and <li> with:
    //     the item name rendered as inner text 
    //     the items index in the store set as a data attribute on the <li>
    //     the items checked state (true/false) rendered as the presence 
    //     or absence of a css class for indicating checked items (specifically, .shopping-item__checked from index.css)
    // join together the individual item into one long string
    // insert the <li>'s string inside the .js-shopping-list <ul> in the DOM
    console.log('`renderShoppingList` ran');

    const shoppingListItemsString = generateShoppingItemsString(STORE);

    $('.js-shopping-list').html(shoppingListItemsString);
  }
  
  function addItemToShoppingList(itemName) {
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.push({name: itemName, checked: false});
  }

  function handleNewItemSubmit() {
    // this function will be responsible for when users add a new shopping list item
    // ----------------------------------------------------------------------------------
    $('#js-shopping-list-form').submit(function(event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      console.log(newItemName);
      $('.js-shopping-list-entry').val(''); 
      addItemToShoppingList(newItemName);
      renderShoppingList();
    })
  }
  
  function toggleCheckedForListItem(itemId) {
    console.log("Toggling checked property for item with id " + itemId);
    const item = STORE.find(item => item.id === itemId);
    item.checked = !item.checked;
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('li')
      .data('item-id');
  }

  function handleItemCheckClicked() {
    // this function will be responsible for when users click the "check" button on
    // a shopping list item.
    // ----------------------------------------------------------------------------------
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
      console.log('`handleItemCheckClicked` ran');
      const id = getItemIdFromElement(event.currentTarget);
      toggleCheckedForListItem(id);
      renderShoppingList();
    })
  }
  
  function deleteItemFromList(itemId) {
    console.log("Deleting item with id " + itemId);
    // const item = STORE.find(item => item.id === itemId);
    STORE.splice(STORE.findIndex(item => item.id === itemId), 1);
  }

  function handleDeleteItemClicked() {
    // this function will be responsible for when users want to delete a shopping list
    // item
    $('.js-shopping-list').on('click', `.js-item-delete`, event => {
      console.log('`handleDeleteItemClicked` ran')
      const id = getItemIdFromElement(event.currentTarget);
      deleteItemFromList(id);
      renderShoppingList();
    })
  }
  
  // this function will be our callback when the page loads. it's responsible for
  // initially rendering the shopping list, and activating our individual functions
  // that handle new item submission and user clicks on the "check" and "delete" buttons
  // for individual shopping list items.
  function handleShoppingList() {
      renderShoppingList();
      handleNewItemSubmit();
      handleItemCheckClicked();
      handleDeleteItemClicked();
  }

  $(handleShoppingList);