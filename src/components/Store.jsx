/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQuery } from "react-query"
import { getCategories, getProductByCategories } from "../util/functions"
import Container from "./Container";
import { Link } from "react-router-dom";
import { useState } from "react";

const Store = () => {
    const [activeTab, setActiveTab] = useState(0);

    const { data: categories, isLoading: isCategoryLoading} = useQuery({ queryKey: ['categories'], queryFn: getCategories });

    const handleTabClick = (index) => {
      setActiveTab(index);
    };


  return (
    <div className="w-full pb-20">
        <Container>
            <div className="w-full">
                <h1 className="text-[5rem] text-neutral font-bold text-center">Products</h1>
            </div>
            <div className="w-full py-5">
                <ul className=" grid grid-cols-4 gap-5 border-bottom border-secondary border-solid">
                    { isCategoryLoading ? (
                         Array.from({ length: 4 }, (_, index) => (
                            <div
                              key={`loading_${index}`}
                              className="bg-gray-300/20 animate-pulse w-full p-5 rounded-full"
                            ></div>
                          ))
                    ): (
                        <>
                            {
                                categories?.map((category, index) => {
                                    return (
                                        <li key={`${category}_${index}`} className=" w-full">
                                            <CatButton active={activeTab === index} onClick={() => handleTabClick(index)}>{category}</CatButton>
                                        </li>
                                    )
                                })
                            }
    
                        </>
                    )
                    }
                </ul>
            </div>
            <div className="w-full ">
                { isCategoryLoading? (
                    <div className="">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div
                          key={`loading_${index}`}
                          className="bg-gray-300/20 animate-pulse w-full p-5 rounded-full"
                          ></div>
                      ))}
                    </div>
                ): (
                    <>
                        {
                            categories?.map((category, index) => {
                                return (
                                    <div key={`${category}_${index}`} className={`w-full  ${activeTab === index ? "flex":"hidden"} `}>
                                        <GetProducts category={category}/>
                                    </div>
                                )
                            })
                        }
                    </>
                )
                    }
            </div>
        </Container>
    </div>
  )
}

const CatButton = ({ onClick,active, children })=>{
    return(
        <button className={`${ active ? 'bg-secondary':'' } hover:bg-secondary/70 transition-all hover:scale-[1.1] rounded-full ease-in-out w-full py-2 text-neutral font-medium capitalize`}  onClick={onClick}>{children}</button>
    )
}

const GetProducts = ({category})=>{
    const { data: products, isLoading: isProductLoading} = useQuery({ queryKey: ['products', category], queryFn: () => getProductByCategories(category) });

    return(
        <div className="w-full grid grid-cols-4 gap-5">
            {isProductLoading   ? (
                 Array.from({ length: 4 }, (_, index) => (
                    <div
                      key={`loading_${index}`}
                      className="bg-gray-300/20 animate-pulse w-full p-5 rounded-full"
                    ></div>
                  ))
            ):(
                <>
                    {
                        products?.map((product, index) => {
                            return (
                                <ProductCard key={index} data={product} />
                            )
                        })
                    }
                </>
            )}
        </div>
    )
}

const ProductCard = ({ data })=>{
    return(
        <Link to={`/product/${data.id}`} className="w-full bg-neutral shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <img src={data.image} alt="" className=" h-48 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-full">
            <span className="text-gray-400 mr-3 uppercase text-xs">{data.category}</span>
                <p className="text-lg font-bold text-black block truncate  capitalize">{data.title}</p>
                <Rating rating={data.rating}/>
                <div className="flex items-center">
                    <span className="text-lg font-semibold text-black cursor-auto my-3">${data.price}</span>
                </div>
            </div>
        </Link>
    )
}
import React from 'react';

export const Rating = ({ rating }) => {
    
    const { rate, count } = rating;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rate)) {
        stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
        } else if (i === Math.ceil(rate)) {
        stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
        } else {
        stars.push(<span key={i} className="text-gray-300">&#9733;</span>);
        }
    }

  return (
    <div className="flex items-center">
      <div className="flex">{stars}</div>
      <span className="ml-2 text-gray-700">{rate.toFixed(1)}</span>
      <span className="ml-1 text-gray-500">({count} reviews)</span>
    </div>
  );
};


export default Store