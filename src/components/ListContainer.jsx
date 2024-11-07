import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { ArticleCard } from "./ArticleCard";
import { listContainer } from "../styles/ListContainer.module.css";
import { TopicCard } from "./TopicCard";
import { LoadingWithGrid } from "./LoadingWithGrid";

export const ListContainer = ({ type }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    apiClient.get(`/${type}`, { sort_by: "votes" }).then(({ data }) => {
      setLoading(false);
      setList(data[type]);
    });
  }, []);
  return (
    <div className={listContainer}>
      {loading ||
        list.map((item) => {
          switch (type) {
            case "articles":
              return <ArticleCard key={item.article_id} article={item} />;
            case "topics":
              return <TopicCard key={item.slug} topic={item} />;
          }
        })}
      {loading && <LoadingWithGrid currentlyLoading={type} colour="#a3adde" />}
    </div>
  );
};
