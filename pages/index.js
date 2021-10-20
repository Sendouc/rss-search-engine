import { useEffect, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchResponse, setSearchResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  // Debouncing because otherwise every key stroke would be a new HTTP call
  const debouncedInput = useDebounce(inputValue, 2000);

  useEffect(() => {
    if (!debouncedInput) return;
    setLoading(true);
    fetch(`/api/articles?input=${debouncedInput}`)
      .then((res) => res.json())
      .then((data) => setSearchResponse(data));
    setLoading(false);
  }, [debouncedInput]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>RSS Search Engine</h2>
        <input
          style={{ height: "4rem", width: "24rem" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {searchResponse && !searchResponse.found && (
          <div>
            No results with your query :( Here's some random articles anyway:
          </div>
        )}
        {loading && <div>Fetching articles...</div>}
        {searchResponse?.articles.map((article) => {
          return (
            <a
              key={article.link}
              href={article.link}
              style={{ margin: "1rem 0" }}
            >
              {article.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
