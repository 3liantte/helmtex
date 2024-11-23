import React from 'react';
import { collections } from '@/components/ProductCard/Collection/data';
import { notFound } from 'next/navigation';
import Products from '@/components/ProductCard/Products';

const page = ({ params }) => {
    const { collectionId, productId } = params;
    const collection = collections.find((c) => c.id === collectionId);

    if (!collection) {
        return notFound();
    }

    const product = collection.products.find((p) => p.id === productId);

    if (!product) {
        return notFound();
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <img src={product.imageUrl} alt={product.title} className="w-full h-96 object-cover mb-4" />
            <p className="text-lg mb-4">Details about {product.title} in the {collection.name}.</p>

            <h2 className="text-xl font-semibold mb-2">Other products in {collection.name}:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {collection.products
                    .filter((p) => p.id !== productId) // Exclude current product
                    .map((relatedProduct) => (
                        <Products key={relatedProduct.id} {...relatedProduct} />
                    ))}
            </div>
        </div>
    );
};

export default page;
