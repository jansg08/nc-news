import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { ArticleCard } from "./ArticleCard";
import { listContainer } from "../styles/ListContainer.module.css";
import { TopicCard } from "./TopicCard";
import { LoadingWithGrid } from "./LoadingWithGrid";
import { useSearchParams } from "react-router-dom";

export const ListContainer = ({ type }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const options = {
      params: {
        sort_by: searchParams.get("sort_by") || "votes",
        topic: searchParams.get("topic") || null,
        order: searchParams.get("order") || null,
      },
    };
    setLoading(true);
    apiClient.get(`/${type}`, options).then(({ data }) => {
      setLoading(false);
      setList(data[type]);
    });
  }, [searchParams]);
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
