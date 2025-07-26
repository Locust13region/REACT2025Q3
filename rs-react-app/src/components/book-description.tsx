import { type FC } from 'react';
// import { useParams } from 'react-router';

const BookDescription: FC = () => {
  // const { bookId } = useParams();
  return (
    <article className="book-description">
      <button>X</button>
      <h2>Book Title</h2>
      <h3>Author</h3>
      <p>book description</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste architecto
        sint perferendis atque maxime natus neque rerum error exercitationem
        ratione? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
        cupiditate, consectetur est doloremque repellat ut, quo eos tempore
        porro modi quis corrupti. Ab quidem veritatis molestiae ex maiores harum
        optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
        magnam odit ipsum aperiam est, harum quam eos mollitia temporibus
        nostrum neque non deleniti quia cupiditate saepe ipsa earum dolorem
        recusandae exercitationem magni reiciendis fugiat atque blanditiis
        totam. Asperiores illo delectus libero ipsum quasi natus mollitia Lorem
      </p>
    </article>
  );
};

export default BookDescription;
