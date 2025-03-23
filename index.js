//fetch books
const url =
  "https://api.freeapi.app/api/v1/public/books?page=1&limit=10&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech";

const options = { method: "GET", headers: { accept: "application/json" } };

const loader = document.querySelector(".book-loader");

const fetchBooks = async () => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const books = data?.data?.data;

    const container = document.querySelector(".book");
    container.innerHTML = "";

    books.forEach((book) => {
      const volumeInfo = book.volumeInfo;

      const title = volumeInfo.title || "NA";
      const author = volumeInfo.authors ? volumeInfo.authors : "NA";
      const publisher = volumeInfo.publisher || "NA";
      const publishedDate = volumeInfo.publishedDate || "NA";
      const img =
        volumeInfo.imageLinks?.thumbnail ||
        "https://images.vexels.com/media/users/3/256355/isolated/preview/98e3253d2ce2e2212723519b367a347c-closed-book-cartoon.png";

      const bookHTML = `
        <div class="books-item">
          <img src="${img}" alt="${title}" />
          <h3>${title}</h3>
          <p><strong>Author:</strong> ${author}</p>
          <p><strong>Publisher:</strong> ${publisher}</p>
          <p><strong>Published:</strong> ${publishedDate}</p>
        </div>
      `;

      loader.innerHTML = "";

      container.insertAdjacentHTML("beforeend", bookHTML);
    });
  } catch (error) {
    console.error("no books:", error);
  }
};

fetchBooks();
