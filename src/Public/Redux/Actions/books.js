import Axios from "axios";

export const getBook = () => {
  return {
    type: "GET_BOOK",
    payload: Axios.get("https://nameless-plateau-17084.herokuapp.com/book")
  };
};

export const getBookdetail = id_book => {
  return {
    type: "GET_BOOK_DETAIL",
    payload: Axios.get(
      `https://nameless-plateau-17084.herokuapp.com/book/detail?id=${id_book}`
    )
  };
};

export const postBook = newBook => {
  return {
    type: "POST_BOOK",
    payload: Axios.post(
      "https://nameless-plateau-17084.herokuapp.com/book/addbook",
      newBook,
      {
        headers: {
          Authorization: "bearer " + localStorage.id_token
        }
      }
    )
  };
};

export const updateBook = (newBook, id_book) => {
  return {
    type: "UPDATE_BOOK",
    payload: Axios.put(
      `https://nameless-plateau-17084.herokuapp.com/book/updatebook?id=${id_book}`,
      newBook,
      {
        headers: {
          Authorization: "bearer " + localStorage.id_token
        }
      }
    )
  };
};

export const delBook = id_book => {
  return {
    type: "DEL_BOOK",
    payload: Axios.delete(
      `https://nameless-plateau-17084.herokuapp.com/book/deletebook?id=${id_book}`,
      {
        headers: {
          Authorization: "bearer " + localStorage.id_token
        }
      }
    )
  };
};

export const genBook = gen_book => {
  return {
    type: "GEN_BOOK",
    payload: Axios.get(
      `https://nameless-plateau-17084.herokuapp.com/book/filtergenre?genre=${gen_book}`
    )
  };
};

export const searchBook = title_book => {
  return {
    type: "SEARCH_BOOK",
    payload: Axios.get(
      `https://nameless-plateau-17084.herokuapp.com/book/searchbook?title=${title_book}`
    )
  };
};
// export const registUser = newUser => {
//   return {
//     type: "REGIST_USER",
//     payload: Axios.get("https://nameless-plateau-17084.herokuapp.com/user/register", newUser)
//   };
// };
export const borrowBook = (newBook, id_book) => {
  return {
    type: "BORROW_BOOK",
    payload: Axios.put(
      `https://nameless-plateau-17084.herokuapp.com/book/borrow?id=${id_book}`,
      newBook
    )
  };
};
export const addBorrow = newBorrow => {
  return {
    type: "ADD_BORROW",
    payload: Axios.post(
      "https://nameless-plateau-17084.herokuapp.com/book/addborrow",
      newBorrow
    )
  };
};
export const returnBook = (newBook, id_book) => {
  return {
    type: "RETURN_BOOK",
    payload: Axios.put(
      `https://nameless-plateau-17084.herokuapp.com/book/return?id=${id_book}`,
      newBook
    )
  };
};
export const getWishlist = id_user => {
  return {
    type: "GET_WISHLIST",
    payload: Axios.get(
      `https://nameless-plateau-17084.herokuapp.com/book/wishlist?id=${id_user}`
    )
  };
};
export const addWishlist = newWishlist => {
  return {
    type: "ADD_WISHLIST",
    payload: Axios.post(
      "https://nameless-plateau-17084.herokuapp.com/book/addwishlist",
      newWishlist
    )
  };

  // https://nameless-plateau-17084.herokuapp.com/book/borrow?id_user=9&id_book=25
};
export const getBorrow = (id_user, id_book) => {
  return {
    type: "GET_BORROW",
    payload: Axios.get(
      `https://nameless-plateau-17084.herokuapp.com/book/borrow?id_user=${id_user}&id_book=${id_book}`
    )
  };
};
export const updateBorrow = id_borrow => {
  return {
    type: "UPDATE_BORROW",
    payload: Axios.put(
      `https://nameless-plateau-17084.herokuapp.com/book/updateborrow?id=${id_borrow}`
    )
  };
};
export const getdetailBorrow = id_user => {
  return {
    type: "GET_DETAIL_BORROW",
    payload: Axios.get(
      `https://nameless-plateau-17084.herokuapp.com/book/detailborrow?id=${id_user}`
    )
  };
};
