import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { ArticleCard } from "./ArticleCard";
import { listContainer } from "../styles/ListContainer.module.css";
import { TopicCard } from "./TopicCard";

export const ListContainer = ({ type }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    apiClient
      .get(`/${type}`, { sort_by: "votes" })
      .then(({ data }) => setList(data[type]));
  }, []);
  return (
    <div className={listContainer}>
      {list.map((item) => {
        switch (type) {
          case "articles":
            return <ArticleCard key={item.article_id} article={item} />;
          case "topics":
            return <TopicCard key={item.slug} topic={item} />;
        }
      })}
    </div>
  );
};
