import React from 'react';

const CategoryItem = (props) => {
	const {item,total,selectedCategory} = props;
	return (
		<li className={`resturant-option list-group-item d-flex justify-content-between align-items-center ${selectedCategory === item.category ? 'active' : ''}`} data-name={item.category}>
          {item.category}
          <span className={`badge badge-primary badge-pill ${selectedCategory === item.category ? 'activeBadge' : ''}`}>
            {total}
          </span>
        </li>
	);
}

export default CategoryItem;