import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { ArticleCard } from "./ArticleCard";
import { TopicCard } from "./TopicCard";
import { LoadingWithGrid } from "./LoadingWithGrid";
import { useSearchParams } from "react-router-dom";
import { ErrorCard } from "./ErrorCard";
import { BeatLoader, SyncLoader } from "react-spinners";

export const ListContainer = ({ type }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMoreArticles, setLoadingMoreArticles] = useState(false);
  const [noMoreArticles, setNoMoreArticles] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOptions, setSortOptions] = useState({
    sort_by: searchParams.get("sort_by") || undefined,
    topic: searchParams.get("topic") || undefined,
    order: searchParams.get("order") || undefined,
  });

  const loadMoreArtictles = () => {
    setLoadingMoreArticles(true);
    const params = {
      ...sortOptions,
      p: (+searchParams.get("p") || 1) + 1,
    };
    const newSearchParams = {};
    apiClient
      .get("/articles", { params: { ...params, limit: 15 } })
      .then(({ data: { articles: newArticles, total_count } }) => {
        setList((currList) => {
          return newArticles ? [...currList, ...newArticles] : currList;
        });
        setNoMoreArticles(newArticles.length + list.length === total_count);
        setLoadingMoreArticles(false);
      })
      .catch((err) => {
        setLoading(false);
        setLoadingMoreArticles(false);
        if (err.message.startsWith("timeout")) {
          setError(<ErrorCard error="Timeout" />);
        } else if (err.response?.status === 400) {
          setError(<ErrorCard error="404" problem={type} />);
        } else if (err.response?.status === 404) {
          setError(<ErrorCard error="404" problem={type} />);
        }
      });
    for (const key in params) {
      if (params[key]) {
        newSearchParams[key] = params[key];
      }
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const params = ["sort_by", "topic", "order"];
    if (
      params.some((param) => searchParams.get(param) !== sortOptions[param])
    ) {
      setSortOptions(() => {
        const newSortOptions = {};
        params.forEach((param) => {
          newSortOptions[param] = searchParams.get(param);
        });
        return newSortOptions;
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const options = {
      params: {
        sort_by: searchParams.get("sort_by"),
        topic: searchParams.get("topic") || null,
        order: searchParams.get("order"),
        limit: (searchParams.get("p") || 1) * 15,
      },
    };
    setLoading(true);
    setError(null);
    apiClient
      .get(`/${type}`, options)
      .then(({ data }) => {
        setLoading(false);
        setList(data[type]);
        setNoMoreArticles(data[type].length === data["total_count"]);
      })
      .catch((err) => {
        setLoading(false);
        if (err.message.startsWith("timeout")) {
          setError(<ErrorCard error="Timeout" />);
        } else if (err.response.status === 400) {
          setError(<ErrorCard error="404" problem={type} />);
        } else if (err.response.status === 404) {
          setError(<ErrorCard error="404" problem={type} />);
        }
      });
  }, [sortOptions, type]);

  return (
    <>
      <div className="items-center gap-5 py-6 grid grid-cols-articles auto-rows-auto">
        {error}
        {loading && (
          <LoadingWithGrid currentlyLoading={type} colour="#a3adde" />
        )}
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
      {!error && !loading && !noMoreArticles && (
        <div className="w-full flex justify-center items-center">
          <button
            onClick={loadMoreArtictles}
            className="mb-6 bg-secondary-bg w-44 py-2 rounded-full"
            disabled={loadingMoreArticles}
          >
            {loadingMoreArticles ? (
              <BeatLoader color="#edeaea" speedMultiplier={0.75} size={10} />
            ) : (
              "Load more articles"
            )}
          </button>
        </div>
      )}
    </>
  );
};
