// src/App.jsx
import React from 'react';
import Product from '../Product';
import { collections } from './data';

function Products() {
    return (
        <div className="container mx-auto px-4 py-6">
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold">Product Ranges</h1>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {collections.map((collection) =>
                    collection.products.map((product) => (
                        <Product 
                            key={product.id} 
                            {...product} 
                            collectionId={collection.id} 
                        />
                    ))
                )}
            </div>    
        </div>
    );
}

export default Products;
