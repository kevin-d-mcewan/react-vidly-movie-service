import React from "react";
const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
    props;

  return (
    <ul className="list-group">
      {/* we will use the item bracket notation instead of item dot notation so that we can add these properties,
      dynamically instead of input each one */}
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

/**
|--------------------------------------------------
| We are removing these two properties from the movies.jsx bc it gives the component more flexability with these components
but it means we need to pass more props into this component. When it comes to components the more things you have to
pass in the more likely a mistake will happen. So by doing "ListGroup.defaultProps" we are automatically adding these properties
everytime without making the ListGroup interface to busy.

In the future if we need to use a ListGroup without these props we can override these defaultProps to not have these 
automatically generated for us.
|--------------------------------------------------
*/

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
