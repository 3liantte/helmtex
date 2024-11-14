import React from 'react';
import { useParams } from 'react-router-dom';
import { collections } from '../data';
import CollectionGrid from '../Collection/CollectionGrid';

function CollectionPage() {
  const { collectionId } = useParams();
  const collection = collections.find(c => c.id === collectionId);

  if (!collection) {
    return <p className="p-4">Collection not found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{collection.title}</h2>
      <CollectionGrid items={collection.items} />
    </div>
  );
}

export default CollectionPage;
