//fetch books
let currentPage = 1;
const options = { method: "GET", headers: { accept: "application/json" } };

const dropdown = document.getElementById("books-dropdown");
const bookWrapper = document.querySelector(".book");
const loader = document.querySelector(".book-loader");
const booksContainer = document.querySelector(".books");
const sort = document.getElementById("books-dropdown-sort");
let totalPage = 2;
const prev = document.getElementById("prev");
const next = document.getElementById("next");

console.log(sort);
let books = [];
const fetchBooks = async () => {
  try {
    loader.style.display = "flex";
    const url = `https://api.freeapi.app/api/v1/public/books?page=${currentPage}&limit=10&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech`;
    const response = await fetch(url, options);
    const data = await response.json();
    totalPage = data?.data?.totalPages;
    books = data?.data?.data;

    const listofBooks = data?.data?.data;
    addBooks(listofBooks);
    loader.style.display = "none";

    prev.disabled = currentPage === 1;
    next.disabled = currentPage === totalPage;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    loader.innerHTML = "Failed to load books.";
  }
};

const addBooks = (books) => {
  if (!books || books.length === 0) {
    const divHeader = document.querySelector(".book-null");
    divHeader.innerHTML = "No books found";
  }

  booksContainer.innerHTML = "";

  books.forEach((book) => {
    const volumeInfo = book.volumeInfo;
    const title = volumeInfo.title || "NA";
    const author = volumeInfo.authors?.join(", ") || "NA";
    const publisher = volumeInfo.publisher || "NA";
    const publishedDate = volumeInfo.publishedDate || "NA";
    const img =
      volumeInfo.imageLinks?.thumbnail ||
      "https://images.vexels.com/media/users/3/256355/isolated/preview/98e3253d2ce2e2212723519b367a347c-closed-book-cartoon.png";

    const bookId = book.id || book._id || "unknown";
    const bookHTML = `
        <div class="books-item" data-id="${bookId}">
          <img src="${img}" alt="${title}" />
          <div>
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Publisher:</strong> ${publisher}</p>
            <p><strong>Published:</strong> ${publishedDate}</p>
          </div>
        </div>
      `;

    booksContainer.insertAdjacentHTML("beforeend", bookHTML);
  });
};

dropdown.addEventListener("change", (e) => {
  bookWrapper.classList.remove("list-view", "grid-view");
  bookWrapper.classList.add(`${e.target.value}-view`);
});

//sorting books on title and date
sort.addEventListener("change", (e) => {
  console.log(e.target.value);
  const sortedBooks = books.sort((a, b) => {
    if (e.target.value === "title") {
      return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
    } else {
      return (
        new Date(a.volumeInfo.publishedDate) -
        new Date(b.volumeInfo.publishedDate)
      );
    }
  });

  addBooks(sortedBooks);
});

//search books on filter

const inputBox = document.querySelector("input");
let inputValues = "";
inputBox.addEventListener("input", (e) => {
  const search = e.target.value.trim().toLowerCase();
  inputValues = search;

  const filteredBooks = books.filter((book) => {
    return book.volumeInfo.title.toLowerCase().includes(search);
  });

  if (search.length === 0) {
    const divHeader = document.querySelector(".book-null");
    divHeader.innerHTML = "";
  }

  addBooks(filteredBooks);
});

//added pagiantion

prev.addEventListener("click", () => {
  if (currentPage > 1 && currentPage <= totalPage) {
    currentPage--;
    fetchBooks();
  }
});

next.addEventListener("click", () => {
  if (currentPage < totalPage && currentPage >= 1) {
    currentPage++;
    fetchBooks();
  }
});

fetchBooks();

const fetchBookById = async (id) => {
  const url = "https://api.freeapi.app/api/v1/public/books/39";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

//added event listener to get book details

booksContainer.addEventListener("click", (e) => {
  const bookItem = e.target.closest(".books-item");
  console.log(bookItem);
  if (bookItem) {
    const bookId = bookItem.dataset.id;
    fetchBookById(bookId);
  }
});
