import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import Drawer from "./Components/Drawer";
import Card from "./Components/Card";
import Carosel2 from "./Components/Carosel2";
import { getBook } from "./Public/Redux/Actions/books";
import { postBook } from "./Public/Redux/Actions/books";
import { genBook } from "./Public/Redux/Actions/books";
import { searchBook } from "./Public/Redux/Actions/books";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tempBooks: {
        title: "",
        author: "",
        url_img: "",
        des: "",
        status: "",
        genre: ""
      },
      data2carosel: []
    };
  }

  async componentDidMount() {
    await this.props.dispatch(getBook());
    this.setState({
      data: this.props.data.bookData,
      data2carosel: this.props.data.bookData
      // onGenre: this.handleGenre.bind(this)
    });
    M.AutoInit();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      tempBooks: { ...this.state.tempBooks, [name]: value }
    });
  };

  handleonAdd = event => {
    event.preventDefault();
    const { title, author, url_img, des, status, genre } = this.state.tempBooks;

    const newBook = {
      title: title,
      author,
      url_img,
      des,
      status,
      genre
    };

    this.props.dispatch(postBook(newBook)).then(() => {
      alert("Added Succes");
      window.location.href = "/";
    });
  };

  handleGenre = event => {
    event.preventDefault();
    const genre = event.target.value;
    if (genre == "All") {
      this.props.dispatch(getBook()).then(() => {
        this.setState({
          data: this.props.data.bookData
        });
      });
    } else {
      this.props.dispatch(genBook(genre)).then(() => {
        this.setState({
          data: this.props.data.bookData
        });
      });
    }
    // console.log("ini genre ", this.state.data);
  };

  handleSearch = event => {
    event.preventDefault();
    const title = event.target.value;
    this.props.dispatch(searchBook(title)).then(() => {
      this.setState({
        data: this.props.data.bookData
      });
    });
    // alert("ITS WORSK");
    // console.log("ini genre ", this.state.data);
  };

  render() {
    const { title, author, url_img, des, status, genre } = this.state.tempBooks;
    return (
      <div>
        <nav style={{ backgroundColor: "#90caf9" }}>
          <ul>
            <li>
              <a href="#">
                <i
                  style={{ color: "black" }}
                  class="material-icons"
                  data-target="slide-out"
                  class="sidenav-trigger"
                >
                  <img
                    style={{
                      width: 30,
                      marginTop: 15
                    }}
                    src="https://image.flaticon.com/icons/svg/130/130912.svg"
                  />
                </i>
              </a>
            </li>
          </ul>

          <div className="nav-wrapper container ">
            <a style={{ color: "black" }} href="/" className="brand-logo right">
              Library
            </a>
            <img
              className="brand-logo right"
              style={{ marginTop: 7, marginRight: 110 }}
              width="50"
              src="https://image.flaticon.com/icons/svg/201/201571.svg"
            />
            <div className="row">
              <div className="col s2." style={{ marginTop: 7 }}>
                <div className="input-field col s12">
                  <select name="genre" id="genre" onChange={this.handleGenre}>
                    <option value="All">All Categories</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Action">Action</option>
                    <option value="Romance">Romance</option>
                    <option value="Horror">Horror</option>
                    {/* <option value="All">Show All</option> */}
                  </select>
                </div>
              </div>
              <div className="col s2" style={{ marginTop: 7 }}>
                <div className="input-field col s12">
                  <select>
                    <option value disabled selected>
                      All Time
                    </option>
                    <option value={1}>2019</option>
                    <option value={2}>2018</option>
                    <option value={3}>2017</option>
                    <option value={4}>2016</option>
                    <option value={5}>2015</option>
                  </select>
                </div>
              </div>

              {/* onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }} */}

              <div className="row">
                <form className="col s4">
                  <div className="row">
                    <div className="input-field col s6">
                      <i
                        className="material-icons prefix"
                        style={{ color: "black" }}
                      >
                        search_circle
                      </i>
                      <input
                        id="icon_prefix"
                        type="text"
                        className="validate"
                        onChange={this.handleSearch}
                      />
                      <label htmlFor="icon_prefix">Search</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </nav>
        <Drawer
          title={title}
          author={author}
          url_img={url_img}
          des={des}
          status={status}
          genre={genre}
          onChange={this.handleChange.bind(this)}
          onAdd={this.handleonAdd.bind(this)}
        />
        <div className="carousel" style={{}}>
          {this.state.data2carosel.map((item, index) => {
            return (
              <Carosel2 title={item.title} image={item.url_img} key={index} />
            );
          })}
        </div>
        <div className="container" style={{ marginTop: "5rem" }}>
          <div className="row">
            {this.state.data.map((item, index) => {
              // console.log("isi id:", item.id);
              return (
                <Card
                  to={{
                    pathname: `/detail/${item.id}`,

                    state: {
                      books: this.state.data
                    }
                  }}
                  title={item.title}
                  description={item.des}
                  image={item.url_img}
                  key={index}
                  id={item.id}
                />
              );
            })}
          </div>
        </div>
        <ul class="pagination center">
          <li class="disabled">
            <a href="#!">
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li class="active">
            <a href="#!">1</a>
          </li>
          <li class="waves-effect">
            <a href="#!">2</a>
          </li>
          <li class="waves-effect">
            <a href="#!">3</a>
          </li>
          <li class="waves-effect">
            <a href="#!">4</a>
          </li>
          <li class="waves-effect">
            <a href="#!">5</a>
          </li>
          <li class="waves-effect">
            <a href="#!">
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

// export default App;

const mapStateToProps = state => {
  return {
    data: state.books, // namaProps: state.namaReducer
    datapost: state.postBook
  };
};

export default connect(mapStateToProps)(App);
