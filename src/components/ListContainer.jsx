import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { ArticleCard } from "./ArticleCard";
import { listContainer } from "../styles/ListContainer.module.css";

export const ListContainer = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    apiClient
      .get("/articles", { sort_by: "votes" })
      .then(({ data }) => setList(data.articles));
  }, []);
  return (
    <div className={listContainer}>
      {list.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
};
