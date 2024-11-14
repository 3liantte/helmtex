import React from 'react';

function CollectionItem({ title, date, image }) {
  return (
    <div className="group">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-md"
      />
      <div className="mt-2">
        <h2 className="text-md font-semibold group-hover:underline">{title}</h2>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
}

export default CollectionItem;
