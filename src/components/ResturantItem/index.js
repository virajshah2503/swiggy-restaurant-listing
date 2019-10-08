import React from 'react';

const ResturantItem = (props) => {
	const {picture,item} = props;

	return (
		<div className="col-4 resturant-info" >
          <div className="image-container">
            <img src={picture} alt="resturant pic" className="resturant-pic"/>
          </div>
          {
          	item.isExlusive &&
          	<div className="exclusive-resturant">
          		<div className="exclusive-resturant-label">
          			Exclusive
          		</div>
          	</div>
          }
          <div className="resturant">
            <div className="resturant-name">{item.name}</div>
            <div className="resturant-foodtypes">{item.food_types.join(", ").substring(0,40)}</div>
          </div>
          <div className="extra">
            <div className="rating">
              <span><i className="fas fa-star"></i> {item.ratings !== "" ? item.ratings : "--"}</span>
            </div>
            <div>•</div>
            <div>{item.delivery_time}</div>
            <div>•</div>
            <div>₹{item.price_for_two} FOR TWO</div>
          </div>
        </div>
	);
}

export default ResturantItem;