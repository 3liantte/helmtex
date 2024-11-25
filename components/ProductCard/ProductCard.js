// "use client";

// import React from 'react';
// import { Button } from '../ui/button';
// import Image from 'next/image';
// import { useRouter} from 'next/navigation';

// const ProductCard = ({ id, title, imageUrl, collectionId }) => {
//     const router = useRouter();

//     const handleDetailsClick = (id) => {
//         const query = new  URLSearchParams({id:id}).toString();
//         console.log("this is the query for ID", query);
//         router.push(`/collections/${query}`);
//     };

//     return (
//         <div className="border rounded-lg shadow-md p-4">
//             <Image
//                 src={imageUrl}
//                 alt={title}
//                 className="w-full h-48 object-cover mb-4"
//                 priority={true}
//                 quality={100}
//                 width={600}
//                 height={600}
//             />
//             <h2 className="font-bold text-lg mb-2">{title}</h2>
//             <Button onClick={handleDetailsClick}>More Details</Button>
//         </div>
//     );
// };

// export default ProductCard;
