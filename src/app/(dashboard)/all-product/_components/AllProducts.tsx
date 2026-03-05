"use client";

import React from "react";
import { Pencil, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface Product {
  _id: string;
  name: string;
  image: string[]; // API theke array of images
}

function AllProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const result = await res.json();
      return result?.data || [];
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex-1 text-center">
          <h1 className="text-[36px] leading-[120px] font-bold text-[#000000]">
            All Products
          </h1>
        </div>

        <Link href="/all-product/add-product">
          <button className="bg-[#0024DA] hover:bg-[#0024DA]/90 text-white text-sm font-medium px-4 h-[48px] transition-colors duration-200 whitespace-nowrap rounded-[8px]">
            Add Products +
          </button>
        </Link>
      </div>

      {/* Grid Container */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-3 gap-6">
          {data.map((product: Product) => (
            <div key={product._id} className="relative flex flex-col">
              {/* Image */}
              <div className="relative h-[210px] overflow-hidden">
                <Image
                  src={product.image[0] || "/images/product.png"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                {/* Action Icons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md shadow-md px-2 py-1 rounded-full border border-gray-200">
                  <Link href={`/all-product/edit-product/${product._id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-100 transition-all duration-200 hover:scale-105">
                      <Pencil size={13} className="text-blue-600" />
                    </button>
                  </Link>

                  <Link href={`/all-product/view-product/${product._id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-indigo-100 transition-all duration-200 hover:scale-105">
                      <Eye size={13} className="text-indigo-600" />
                    </button>
                  </Link>

                  <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-100 transition-all duration-200 hover:scale-105">
                    <Trash2 size={13} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <div className="px-3 py-2.5 bg-white">
                <p className="text-xl font-medium text-gray-800">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;