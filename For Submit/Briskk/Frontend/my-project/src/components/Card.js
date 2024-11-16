import React from 'react';

const Card = ({ id, image, title, price, brand, setClick, setClickId }) => {

  const clickHandler = () => {
    setClick(prevClick => !prevClick);
    setClickId(id);
  }

  return (
    <div onClick={clickHandler} className='w-1/5 min-w-[230px] min-h-[300px] cursor-pointer'>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="p-8 rounded-t-lg h-72 object-scale-down" src={image} alt="product image" />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5"></div>
          <div className="flex items-center justify-between ml-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 -ml-1 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{brand}</span>
            <span className="text-3xl font-bold text-gray-900 dark:text-white mr-2">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
