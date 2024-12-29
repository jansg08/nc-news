import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { ArticleCard } from "./ArticleCard";
import { listContainer } from "../styles/ListContainer.module.css";
import { TopicCard } from "./TopicCard";
import { LoadingWithGrid } from "./LoadingWithGrid";
import { useSearchParams } from "react-router-dom";
import { ErrorCard } from "./ErrorCard";

export const ListContainer = ({ type }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const options = {
      params: {
        sort_by: searchParams.get("sort_by"),
        topic: searchParams.get("topic"),
        order: searchParams.get("order"),
      },
    };
    setLoading(true);
    setError(null);
    apiClient
      .get(`/${type}`, options)
      .then(({ data }) => {
        setLoading(false);
        setList(data[type]);
      })
      .catch((err) => {
        setLoading(false);
        if (err.message.startsWith("timeout")) {
          setError(<ErrorCard error="Timeout" />);
        } else if (err.response.status === 400) {
          setError(<ErrorCard error="400" />);
        } else if (err.response.status === 404) {
          setError(<ErrorCard error="404" problem={type} />);
        }
      });
  }, [searchParams, type]);
  return (
    <div className="items-center gap-5 py-6 grid grid-cols-articles auto-rows-auto">
      {error}
      {loading && <LoadingWithGrid currentlyLoading={type} colour="#a3adde" />}
      {!loading &&
        !error &&
        list.map((item, i) => {
          switch (type) {
            case "articles":
              return (
                <ArticleCard
                  key={item.article_id}
                  article={item}
                  firstItem={i === 0}
                />
              );
            case "topics":
              return <TopicCard key={item.slug} topic={item} />;
          }
        })}
    </div>
  );
};
