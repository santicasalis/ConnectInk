import React from "react";

const PaginateAdmin = ({
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
    <div className='flex justify-center mt-4 mb-9  text-admin text-xl font-bold  focus:outline-none"'>
      <nav>
        <ul className="flex space-x-2">
          {currentPage > 1 && (
            <li className="">
              <button onClick={() => onPageChange(currentPage - 1)}>
                {"<"}
              </button>
            </li>
          )}

          {pageNumbers.map((number) => (
            <li className="" key={number}>
              <button
                className={`text-xl font-bold ${
                  currentPage === number
                    ? "border-[2px] border-admin text-black bg-admin rounded-2xl"
                    : "border-[2px] border-admin text-admin bg-transparent rounded-2xl"
                } px-4 py-2 focus:outline-none`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}

          {currentPage < pageNumbers.length && (
            <li className="">
              <button
                className=" "
                onClick={() => onPageChange(currentPage + 1)}
              >
                {">"}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default PaginateAdmin;
