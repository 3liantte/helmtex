// // app/products/[collectionId]/product/[productId]/page.js

// import React from 'react';
// import { collections } from '@/components/ProductCard/Collection/data';
// import { notFound } from 'next/navigation';

// const page = ({ params }) => {
//     const { collectionId, productId } = params;
//     const collection = collections.find((c) => c.id === collectionId);

//     if (!collection) {
//         return notFound();
//     }

//     const product = collection.products.find((p) => p.id === productId);

//     if (!product) {
//         return notFound();
//     }

//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
//             <img src={product.imageUrl} alt={product.title} className="w-full h-96 object-cover mb-4" />
//             <p className="text-lg mb-4">Details about {product.title} in the {collection.name}.</p>
//         </div>
//     );
// };

// export default page;

"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'

const page = () => {
  const searchParams = useSearchParams("")
  const id = searchParams.get("id")
  return (
    <div className="p-24 flex justify-center items-center h-screen">
      <p className="bg-blue-700">{id}</p>
    </div>
  )
}

export default page

