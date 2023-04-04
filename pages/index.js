import Navbar from "../components/Navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [category, setCategory] = useState("technology");
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.NEXT_PUBLIC_API}&page=${page}`
      )
      .then((response) => {
        setData(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category, page]);

  return (
    <>
      <Navbar category={category} setCategory={setCategory} setPage={setPage} />
      <div className="max-w-screen-xl mx-auto py-20 px-5">
        {data && data.length !== 0 ? (
          <>
            <div className="flex justify-between mb-4">
              <button
                disabled={page < 2}
                onClick={() => {
                  setPage(page - 1);
                }}
                className="px-6 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed bg-gray-700 text-white font-semibold"
              >
                Prev
              </button>
              <button
                disabled={data.length === 0}
                onClick={() => {
                  setPage(page + 1);
                }}
                className="px-6 py-2 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-md bg-blue-500 text-white font-semibold"
              >
                Next
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {data.map((news, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-md shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={news.urlToImage}
                        alt="Image not available"
                        className="rounded-t-md"
                      />
                      <h2 className="px-4 font-semibold text-md mt-6 mb-4">
                        {news.title}
                      </h2>
                      <p className="px-4 mb-6">{news.description}</p>
                    </div>
                    <div className="text-blue-500 font-semibold text-center mb-6">
                      <a href={news.url} target="_blank">
                        Read more
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="h-screen text-4xl font-semibold flex justify-center items-center">
            No more news to display
          </div>
        )}
      </div>
    </>
  );
}
