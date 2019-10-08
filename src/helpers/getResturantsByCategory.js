import {CATEGORY_TYPE} from '../consts/index';

export const getResturantsByCategory = ({selectedCategory, resturantData}) => {
	switch(selectedCategory){

		case CATEGORY_TYPE.onlyOnSwiggy:
			return resturantData
			       .map((item) => item.restaurantList)
			       .flat()
			       .filter((list) => list.isExlusive)

		case CATEGORY_TYPE.seeAll:
			return resturantData
				   .map((item) => item.restaurantList)
				   .flat();

		default:
			return resturantData.filter((item) => item.category === selectedCategory)[0]['restaurantList'];
	}
}
