import React from 'react';

import loadingIcon from '../../assets/images/loader.gif';

const Loader = () => {
  return (
    <React.Fragment>
        <img src={loadingIcon}  height="150px" alt="Loading...." className="image-icon"/>
    </React.Fragment>
  )
};

export default Loader;