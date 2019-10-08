import resturantPics from '../mockData/resturantPics';

export const getRandomResturantPic = () => resturantPics[Math.floor(Math.random() * resturantPics.length)];