const initialState = {
  bookData: [],
  // counter: 0,
  isLoading: false,
  isRejected: false,
  isFulfilled: false
};

const books = (prevState = initialState, action) => {
  switch (action.type) {
    case "GET_BOOK_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_BOOK_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_BOOK_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "GET_BOOK_DETAIL_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_BOOK_DETAIL_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_BOOK_DETAIL_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response[0]
      };
    case "POST_BOOK_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "POST_BOOK_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "POST_BOOK_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "UPDATE_BOOK_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "UPDATE_BOOK_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "UPDATE_BOOK_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "DEL_BOOK_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "DEL_BOOK_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "DEL_BOOK_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "GEN_BOOK_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GEN_BOOK_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GEN_BOOK_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "SEARCH_BOOK_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "SEARCH_BOOK_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "SEARCH_BOOK_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "BORROW_BOOK_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "BORROW_BOOK_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "BORROW_BOOK_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "GET_WISHLIST_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_WISHLIST_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_WISHLIST_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "ADD_WISHLIST_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "ADD_WISHLIST_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "ADD_WISHLIST_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "ADD_BORROW_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "ADD_BORROW_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "ADD_BORROW_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "GET_BORROW_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_BORROW_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_BORROW_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };
    case "UPDATE_BORROW_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "UPDATE_BORROW_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "UPDATE_BORROW_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };

    case "GET_DETAIL_BORROW_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_DETAIL_BORROW_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_DETAIL_BORROW_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        bookData: action.payload.data.response
      };

    default:
      return prevState;
  }
};

export default books;
