import React from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

const Paginate = ({
  onPageChange,
  totalArtists,
  currentPage,
  artistsPerPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalArtists / artistsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center mt-4 mb-9  text-primary text-xl font-bold  focus:outline-none"'>
      <nav>
        <ul className="flex space-x-2">
          {currentPage > 1 && (
            <li className="flex items-center">
              <button onClick={() => onPageChange(currentPage - 1)}>
                <RiArrowLeftSLine className="text-[30px]"/>
              </button>
            </li>
          )}

          {pageNumbers.map((number) => (
            <li className="" key={number}>
              <button
                className={`text-xl font-bold ${
                  currentPage === number
                    ? "border-[2px] border-primary text-black bg-primary rounded-2xl"
                    : "border-[2px] border-primary text-primary bg-transparent rounded-2xl"
                } px-4 py-2 focus:outline-none`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}

          {currentPage < pageNumbers.length && (
            <li className="flex items-center">
              <button
                className="flex items-center justify-center"
                onClick={() => onPageChange(currentPage + 1)}
              >
                  <RiArrowRightSLine className="text-[30px]"/>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
