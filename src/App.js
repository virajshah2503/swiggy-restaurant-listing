import React, {PureComponent} from 'react';
import uuid from 'uuid';

/*services*/
import { getResturantData } from './services/getResturantData';
import { getRandomResturantPic } from './services/getRandomResturantPic';

/*helpers*/
import { getResturantsByCategory } from './helpers/getResturantsByCategory';
import {capitalizeFirstLetter} from './helpers/capitalizeFirstLetter';

/*consts*/
import {CATEGORY_TYPE,defaultVisibleResturants} from './consts/index';

/*components*/
import Loader from './components/Loader/index';
import CategoryItem from './components/CategoryItem/index';
import ResturantItem from './components/ResturantItem/index';

/*css*/
import './assets/css/index.css';

class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      isLoaded : false,
      resturantData : [],
      selectedCategory : CATEGORY_TYPE.popularBrands,
      visibleResturants : defaultVisibleResturants,
      showLoadMore : true
    }
  }

  componentDidMount(){
    getResturantData().then(data => {
      this.setState({
        isLoaded: true,
        resturantData: data
      });
    });
  }

  selectResturantOption = (event) => {

    const selectedCategory = event.target.dataset.name;

    this.setState((prev) => {
      if(selectedCategory === prev.selectedCategory){
        return prev;
      }
      return {
        selectedCategory : selectedCategory,
        visibleResturants : selectedCategory === CATEGORY_TYPE.seeAll ? getResturantsByCategory({selectedCategory : selectedCategory, resturantData : prev.resturantData}).length : defaultVisibleResturants,
        showLoadMore : selectedCategory === CATEGORY_TYPE.seeAll ? false : true
      }
    },this.scrollToTop())
  }

  scrollToTop(){
    document.scrollingElement.scrollTop = 0;
  }

  loadMoreRestutants = (event) => {
    this.setState((prev) => {
      const visibleResturants = prev.visibleResturants+defaultVisibleResturants;
      return {
        visibleResturants : visibleResturants,
        showLoadMore : getResturantsByCategory(this.state).length > visibleResturants
      }
    })
  }

  renderCategories(){
    const {selectedCategory,resturantData} = this.state;

    return resturantData.map((item,index) => {
      return (
        <CategoryItem
          key={uuid.v4()}
          selectedCategory = {selectedCategory}
          item = {item}
          total = {getResturantsByCategory({selectedCategory : item.category,resturantData : resturantData}).length}
        />
      );
    })
  }

  renderMoreOptions(){
    const {selectedCategory, resturantData} = this.state;

    return [
      <CategoryItem
          key={uuid.v4()}
          selectedCategory = {selectedCategory}
          item = {{category : CATEGORY_TYPE.onlyOnSwiggy}}
          total = {getResturantsByCategory({selectedCategory : CATEGORY_TYPE.onlyOnSwiggy,resturantData : resturantData}).length}
      />,
      <CategoryItem
          key={uuid.v4()}
          selectedCategory = {selectedCategory}
          item = {{category : CATEGORY_TYPE.seeAll}}
          total = {getResturantsByCategory({selectedCategory : CATEGORY_TYPE.seeAll,resturantData : resturantData}).length}
      />
    ];
  }

  rednerResturants(){
    const {visibleResturants} = this.state;

    const resturants = getResturantsByCategory(this.state).slice(0,visibleResturants);

    return (
      <div className="row">
          {
            resturants.map((item) => {
              return (
                <ResturantItem
                  key={uuid.v4()}
                  picture={getRandomResturantPic()}
                  item={item}
                />
              );
            })
          }
      </div>
    )
  }

  renderCategoryTitle(){
    const {selectedCategory} = this.state;

    return (
      <h3>{capitalizeFirstLetter(selectedCategory)}</h3>
    );
  }

  render(){
    const {isLoaded,showLoadMore} = this.state;

    if(!isLoaded){
      return <Loader/>;
    }

    return (
      <div className="main">
        <div className="row resturantRow">
          <div className="col-3">
            <ul className="list-group" onClick={this.selectResturantOption}>
              {this.renderCategories()}
              {this.renderMoreOptions()}
            </ul>
          </div>
          <div className="col-9">
            {this.renderCategoryTitle()}
            {this.rednerResturants()}
            {
              showLoadMore &&
              <div className="row buttonRow">
                <button type="button" className="btn btn-primary" onClick={this.loadMoreRestutants}>Load more</button>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }


}

export default App;
