"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { React, Suspense, useEffect, useState } from "react";
import subset from "../../../lib/subset";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";

const Collection = () => {
  const [productDetails, setProductDetails] = useState({
    id: null,
    title: null,
    imageUrl: null,
  });
  const [matchedSubset, setMatchedSubset] = useState(null);
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");
  const router = useRouter();

  useEffect(() => {
    const title = searchParams.get("title");
    const imageUrl = searchParams.get("imageUrl");
    const id = window.location.pathname.split("/").pop();

    try {
      if (title && id && imageUrl) {
        setProductDetails({ id, title, imageUrl });
        const foundSubset = subset.find((range) => {
          const category = Object.keys(range)[0];
          return category === title;
        });
        setMatchedSubset(foundSubset);
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchParams]);

  const handleClickBack = () => {
    router.push("/products");
  };

  return (
    <div className="p-24">
      <div className="relative mb-8">
        <Image
          src={imageUrl}
          alt=""
          className="object-fill w-full h-72 rounded-xl"
          width={100}
          height={50}
        />
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2 mb-8">
            <Button
              variant="outline"
              className="bg-white hover:bg-blue-500 text-black hover:text-white rounded-xl"
              onClick={handleClickBack}
            >
              {" "}
              <ArrowLeft />
            </Button>
          </div>
        </div>
        <h2 className="absolute top-[40%] left-[38%] text-4xl font-bold text-white">
          {title}
        </h2>
      </div>
      {matchedSubset ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(matchedSubset[productDetails.title]).map(
              ([key, value]) => (
                <div key={key} className="p-4 border rounded-xl">
                  {value.image && (
                    <>
                      <div className="relative">
                        <Image
                          src={value.image}
                          alt={value.title}
                          width={200}
                          height={200}
                          className="rounded-lg object-cover w-full h-76"
                        />
                        <p className="absolute bottom-0 right-0 z-10 mb-2 mr-2 text-blue-500">
                          {value.code}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between items-center pt-4">
                    <p className="text-xl font-semibold">{value.content}</p>

                    <h3 className="text-xl text-blue-500">{value.title}</h3>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <p>No matching subset found.</p>
      )}
    </div>
  );
};

const CollectionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Collection />
    </Suspense>
  );
};

export default CollectionPage;
