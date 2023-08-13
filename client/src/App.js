import Navbar from "./components/Navbar";
import QuoteCard from "./components/QuoteCard";
import { useState, useRef } from "react";
import { getQuote } from "../../utils/getQuote";

function App() {
  const [quote, setQuote] = useState("");
  const [person, setPerson] = useState("");
  const [image, setImage] = useState("");
  const [visibility, setVisibility] = useState("hidden");
  const cardIsVisible = useRef(false);

  const fetchQuote = async () => {
    const data = await getQuote();
    if (!cardIsVisible.current) {
      setVisibility("visible");
      cardIsVisible.current = true;
    }
    setQuote(data.quote);
    setPerson(data.personality);
    setImage(data.image);
  };

  return (
    <div className="App">
      <div
        class="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center h-screen w-full"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <Navbar fetchQuote={fetchQuote} />
        <div className={`w-fit m-auto mt-10 ${visibility}`}>
          <QuoteCard quote={quote} person={person} image={image} />
        </div>
      </div>
    </div>
  );
}

export default App;
