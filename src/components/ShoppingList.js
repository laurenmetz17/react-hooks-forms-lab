import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchItem, setSearch] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function search(event) {
    setSearch((searchItem) => searchItem = event.target.value);
    console.log(searchItem);
  }

  function onItemFormSubmit(newItem) {
    setItems([...items,newItem]);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") {
      if(searchItem!== "") {
        return item.name.toLowerCase().includes(searchItem.toLowerCase());
      }
      else return true;
    }
    else return item.category === selectedCategory && item.name.toLowerCase().includes(searchItem.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} search={searchItem} onSearchChange={search}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
