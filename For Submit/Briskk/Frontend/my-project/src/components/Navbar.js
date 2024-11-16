import React from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    E-Commerce
                </div>
                <div className="flex space-x-4">
                    <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    <a href="/products" className="text-gray-300 hover:text-white">Products</a>
                    <a className="text-gray-300 hover:text-white">Cart</a>
                    <a className="text-gray-300 hover:text-white">Account</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
