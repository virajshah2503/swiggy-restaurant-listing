import resturantData from '../mockData/resturantData';

export const getResturantData = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(resturantData);
  }, 1500);
});