"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

function ViewProduct() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? (singleProductData?.image?.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === (singleProductData?.image?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const params = useParams();
  const productId = params.id;

  // const session = useSession();
  // const TOKEN = session?.data?.user?.accessToken;

  // ─── Fetch Single Product ─────────────────────────────────────────────
  const { data: singleProductData } = useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product/${productId}`
      );
      if (!res.ok) throw new Error("Failed to fetch product details");
      const result = await res.json();
      return result?.data;
    },
  });

  return (
    <div className="min-h-screen">
      {/* Top Header */}
      <div className="px-5 py-3 flex items-center justify-between mb-[30px]">
        <button className="text-gray-600 hover:text-gray-800 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[36px] leading-[120px] font-bold text-[#000000]">
          Product Details
        </h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 h-[48px] rounded-lg shadow-sm transition-all duration-200">
          <Pencil size={14} />
          Edit Product
        </button>
      </div>

      {/* Main Content */}
      <div className="min-h-screen px-5 py-5">
        {/* Product Top Section */}
        <div className="p-4 mb-5">
          <div className="flex gap-4">
            {/* Thumbnail Column */}
            <div className="flex flex-col gap-2">
              {singleProductData?.image?.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-[120px] h-[58px] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeIndex === i
                      ? "border-blue-500"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    width={500}
                    height={300}
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image with arrows */}
            <div
              className="relative flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: "450px", height: "450px" }}
            >
              <Image
                width={300}
                height={300}
                src={singleProductData?.image?.[activeIndex] || "/images/carusal1.png"}
                alt="product"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handlePrev}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft size={14} className="text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight size={14} className="text-gray-700" />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h2 className="lg:text-[40px] md:text-[35px] text-[30px] font-bold text-[#212121] mb-2">
                {singleProductData?.name}
              </h2>
              <p className="text-[20px] text-[#4E4E4E] leading-[150%] mb-3">
                {singleProductData?.description}
              </p>
              <p className="text-[20px] text-black mb-[20px] font-normal">
                {singleProductData?.category || "Men HRT"}
              </p>
              <p className="lg:text-[40px] md:text-[35px] text-[30px] font-bold text-gray-900 mb-1">
                ${singleProductData?.price}
              </p>
              <p className="text-[20px] text-black mt-[20px] font-normal">
                {singleProductData?.size?.[0] || "Small"}
              </p>
            </div>
          </div>
        </div>

        {/* What will you get */}
        <div className="" style={{ borderColor: "#93c5fd" }}>
          <h3 className="lg:text-[40px] md:text-[35px] text-[30px] font-bold text-[#212121] mb-2">
            What will you get?
          </h3>
          <p className="text-[20px] text-[#4E4E4E] leading-[150%] mb-3">
            {singleProductData?.whatWillYouGet}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;