// src/components/ProductCard.jsx
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

const ProductCard = ({ title, imageUrl }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <Image
       src={imageUrl} 
       alt="Samples" 
       className="w-full h-48 object-cover mb-4" 
       priority={true}
       quality={100}
       width={600}
       height={600}
       />
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <Button>
        More Details
      </Button>
    </div>
  );
};

export default ProductCard;
