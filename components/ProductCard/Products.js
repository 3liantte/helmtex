// src/App.jsx
import React from 'react';
import ProductCard from './ProductCard';

function Products() {
    const products = [
        {
          title: "Customised Fabrics",
          imageUrl: "/assets/customise.jpg",
        },
        {
          title: "Diamond Range",
          imageUrl: "/assets/diamond.jpg",
        },
        {
          title: "Domestic Range",
          imageUrl: "/assets/domestic.jpg",
        },
        {
            title: "Studio Explore",
            imageUrl: "/assets/explore.jpg",
          },
          {
            title: "The Great Outdoor",
            imageUrl: "/assets/outdoor.jpg",
          },
          {
            title: "The Great Plains",
            imageUrl: "/assets/plains.jpg",
          },
          {
            title: "Scape Range",
            imageUrl: "/assets/scape.jpg",
          },
          {
            title: "Slub Plain",
            imageUrl: "/assets/slub.jpg",
          },
          {
            title: "Studio Range",
            imageUrl: "/assets/studio.jpg",
          },
          {
            title: "Tailor Range",
            imageUrl: "/assets/tailor.jpg",
          },
          {
            title: "Valley Range",
            imageUrl: "/assets/valley.jpg",
          },
          {
            title: "Westcliff Range",
            imageUrl: "/assets/westcliff.jpg",
          },
          {
            title: "@Work Range",
            imageUrl: "/assets/workrange.jpg",
          },
      ];

      const sortedProducts = products.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return nameA.localeCompare(nameB);
      });
          
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Product Ranges</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product, index) => (
          <div key={index} className="transition-all duration-300 hover:scale-105">
            <ProductCard {...product} />
          </div>
        ))}
      </div>    
    </div>
  );
}

export default Products;
