
import React, { useState } from 'react';
import axios from "axios";
//material ui
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import './googlebooks.css';


//use styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
/* eslint-disable-next-line */
export interface GooglebooksProps { }

export const Googlebooks:React.FC<GooglebooksProps> = (props: GooglebooksProps) => {
  const classes = useStyles();

  //states 
  const [book, setBook] = useState<string | null>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('ebooks');
  const [bookType, setBookType] = useState<string>('all');
  const [order, setOrder] = useState<string>('relevance');
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyARicyCXgGbkQ3XRUmK4QZEar-26aQkpsE"
  );
 

  //setting the book to the input field
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const book = e.target.value;

    setBook(book);
  }

  //filtering handlers 
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {

    if (filter !== e.target.value) {
      setFilter(e.target.value);
      getBooks();
    }
  }
  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement>) {

    if (order !== e.target.value) {
      setOrder(e.target.value);
      getBooks();
    }
  }
  function handleBookTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (bookType !== e.target.value) {
      setBookType(e.target.value);
      getBooks();
    }
  }

  //getting the books from the API then setting the state to these books when filtering over
  function getBooks() {

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
        book +
        "&filter=" +
        filter +
        "&printType=" +
        bookType +
        '&orderBy=' +
        order +
        "&key=" +
        apiKey +
        "&maxResults=40"
      )
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  //getting the books and setting the to these books for the 1st time without filtering
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
        book +
        "&key=" +
        apiKey +
        "&maxResults=40"
      )
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
        setSubmitted(true);
      });
  }

  //rendering
  if (!submitted) {
    return (
      <div className="container">
        <h1>Book Search</h1>
        <form onSubmit={handleSubmit}>
          <div >
            <input
              type="text"
              onChange={handleChange}
              className="form-control mt-10"
              placeholder="Search for Books"
              autoComplete="off"
            />
          </div>
          <br></br>
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </form>

        {result.map(book => (
          <a target="blank" href={book.volumeInfo.previewLink}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
          </a>
        ))}
      </div>
    );
  }
  else {
    return (
      <div className="container">
      
        <h1>Book Search</h1>
        <form onSubmit={handleSubmit}>
          <div >
            <input
              key='searchInput'
              type="text"
              onChange={handleChange}
              className="form-control mt-10"
              placeholder="Search for Books"
              autoComplete="off"
            />
          </div>
          <br></br>

          <button type="submit" className="btn btn-danger">
            Search
        </button>

        </form>
        <br></br>
        <div>

          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="age-native-simple">Filter</InputLabel>
            <Select
              native
              value={filter}
              onChange={handleFilterChange}

            >
              <option value={'ebooks'}>All</option>
              <option value={'partial'}>Partial</option>
              <option value={'full'}>Full</option>
              <option value={'free-ebooks'}>Free</option>
              <option value={'paid-ebooks'}>Paid</option>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="age-native-simple">Book Type</InputLabel>
            <Select
              native
              value={bookType}
              onChange={handleBookTypeChange}

            >
              <option value={'all'}>All</option>
              <option value={'books'}>Books</option>
              <option value={'magazines'}>Magazines</option>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="age-native-simple">Order</InputLabel>
            <Select
              native
              value={order}
              onChange={handleOrderChange}

            >
              <option value={'relevance'}>Relevance</option>
              <option value={'newest'}>Newest</option>

            </Select>
          </FormControl>
        </div>

        {result.map(book => (
          <a target="blank" href={book.volumeInfo.previewLink}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
          </a>
        ))}
      </div>
    );
  }
};

export default Googlebooks;
