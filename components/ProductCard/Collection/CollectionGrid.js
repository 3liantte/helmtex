import React from 'react';
import CollectionItem from './CollectionItem';

function CollectionGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {items.map((item, index) => (
        <CollectionItem
          key={index}
          title={item.title}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default CollectionGrid;
