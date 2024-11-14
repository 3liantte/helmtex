// src/App.jsx
import React from 'react';
import ProductCard from './ProductCard';

function Products() {
    const products = [
        { id: 1, title: "Customised Fabrics", imageUrl: "/assets/customise.jpg" },
        { id: 2, title: "Diamond Range", imageUrl: "/assets/diamond.jpg" },
        { id: 3, title: "Domestic Range", imageUrl: "/assets/domestic.jpg" },
        { id: 4, title: "Studio Explore", imageUrl: "/assets/explore.jpg" },
        { id: 5, title: "The Great Outdoor", imageUrl: "/assets/outdoor.jpg" },
        { id: 6, title: "The Great Plains", imageUrl: "/assets/plains.jpg" },
        { id: 7, title: "Scape Range", imageUrl: "/assets/scape.jpg" },
        { id: 8, title: "Slub Plain", imageUrl: "/assets/slub.jpg" },
        { id: 9, title: "Studio Range", imageUrl: "/assets/studio.jpg" },
        { id: 10, title: "Tailor Range", imageUrl: "/assets/tailor.jpg" },
        { id: 11, title: "Valley Range", imageUrl: "/assets/valley.jpg" },
        { id: 12, title: "Westcliff Range", imageUrl: "/assets/westcliff.jpg" },
        { id: 13, title: "@Work Range", imageUrl: "/assets/workrange.jpg" },
    ];

    const sortedProducts = products.sort((a, b) => {
        const nameA = a.title || '';
        const nameB = b.title || '';
        return nameA.localeCompare(nameB);
    });
          
    return (
        <div className="container mx-auto px-4 py-6">
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold">Product Ranges</h1>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="transition-all duration-300 hover:scale-105">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>    
        </div>
    );
}

export default Products;
