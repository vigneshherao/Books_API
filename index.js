//fetch books

const url =
  "https://api.freeapi.app/api/v1/public/books?page=1&limit=10&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech";

const options = { method: "GET", headers: { accept: "application/json" } };

const fetchBooks = async () => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const books = data?.data;
    console.log(books);
  } catch (error) {
    console.error(error);
  }
};

const loadBooks = () => {
  fetchBooks();
};
