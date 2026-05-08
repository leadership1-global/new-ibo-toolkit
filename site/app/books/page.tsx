import Image from "next/image";

const books = [
  {
    file: "everyone_communicates_few_connect.jpg",
    title: "Everyone Communicates Few Connect",
  },
  {
    file: "how_raised_myself_from_failure_to_success_in_selling.jpg",
    title: "How I Raised Myself from Failure to Success in Selling",
  },
  {
    file: "how_to_win_friends_and_influence_people.jpg",
    title: "How to Win Friends and Influence People",
  },
  {
    file: "magic_of_thinking_big.jpg",
    title: "Magic of Thinking Big",
  },
  {
    file: "the_compound_effect.jpg",
    title: "The Compound Effect",
  },
];

export default function Books() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Recommended Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {books.map((book) => (
          <div key={book.file} className="flex flex-col items-center text-center">
            <div className="relative w-48 h-64 mb-4 shadow-lg rounded-md overflow-hidden">
              <Image
                src={`/book_covers/${book.file}`}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm font-medium max-w-[200px]">{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
