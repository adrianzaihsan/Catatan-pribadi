import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get("q") || "";

  const handleKeywordChange = (keyword) => {
    if (keyword.trim()) {
      setSearchParams({ q: keyword });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="app">
      <Header
        keyword={searchKeyword}
        onKeywordChange={handleKeywordChange}
        showSearch={true}
      />
      <main className="container">
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
