import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetailCard = ({ clickId }) => {
  const [product, setProduct] = useState(null);

  const getresponse = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/products/${clickId}`);
      setProduct(res.data.data);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    if (clickId) {
      getresponse();
    }
  }, [clickId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" mt-8 flex mx-auto w-full max-w-[1000px]  border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
      <div>
        <a href="#">
            <img className="p-8 rounded-t-lg" src={product.image} alt={product.name} />
        </a>
      </div>
      <div>
      <div className="px-5 pb-5 mt-8">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
        </a>
        <p className="text-gray-700 dark:text-gray-200">{product.description}</p>
        <div className="flex items-center mt-2.5 mb-5"></div>
        <div className="flex items-center justify-between ml-1">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 -ml-1 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.brand}</span>
          <span className="text-3xl font-bold text-gray-900 dark:text-white mr-2">${product.price}</span>
        </div>
        <div className="flex mt-5">
            <span className=' text-gray-200 '>Description</span>
            <div className=' text-gray-200 ' >:- {product.description}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default DetailCard;
