import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination center">
      {pageNumbers.map(number => (
        <li
          style={{ marginLeft: "5px" }}
          key={number}
          active
          className="active blue"
        >
          <a onClick={() => paginate(number)} href="#!" className="page-link">
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
