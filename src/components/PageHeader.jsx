import { useLocation, useSearchParams } from "react-router-dom";
import AscendingIcon from "../icons/up-vote.svg?react";
import DescendingIcon from "../icons/down-vote.svg?react";
import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";

export const PageHeader = ({ headingIcon, heading, buttonIcon }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortByInput, setSortByInput] = useState("votes");
  const [orderInput, setOrderInput] = useState("desc");
  const [topicInput, setTopicInput] = useState("any");
  const [topics, setTopics] = useState();
  const { pathname } = useLocation();
  const columns = [
    ["title", "Title"],
    ["topic", "Topic"],
    ["author", "Author"],
    ["created_at", "Date written"],
    ["votes", "Vote count"],
    ["comment_count", "Comment count"],
  ];

  useEffect(() => {
    apiClient.get("/topics").then(({ data }) => setTopics(data.topics));
  }, []);

  const capitalisedSlug = (slug) =>
    slug && slug[0].toUpperCase() + slug?.slice(1).toLowerCase();

  const handleClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortByChange = (e) => {
    const sortVal = e.target.value;
    setSortByInput(e.target.value);
    fetchNewList({ sortVal });
  };

  const handleOrderChange = (e) => {
    const orderVal = e.target.value;
    setOrderInput(e.target.value);
    fetchNewList({ orderVal });
  };

  const handleTopicChange = (e) => {
    const topicVal = e.target.value;
    setTopicInput(topicVal);
    fetchNewList({ topicVal });
  };

  const fetchNewList = ({
    sortVal = sortByInput,
    orderVal = orderInput,
    topicVal = topicInput,
  }) => {
    const newSearchParams = {
      sort_by: sortVal,
      order: orderVal,
      topic: topicVal === "any" ? "" : topicVal,
      p: searchParams.get("p"),
    };
    setSearchParams(newSearchParams);
  };

  return (
    <header className="w-full">
      <div className="flex items-center gap-2.5 h-[4.5rem]">
        {headingIcon}
        <h2>{capitalisedSlug(searchParams.get("topic")) || heading}</h2>
        {buttonIcon && (
          <button
            onClick={handleClick}
            className="bg-secondary-bg border-none rounded-full ml-auto p-2.5"
          >
            {buttonIcon}
          </button>
        )}
      </div>
      {showSortOptions && pathname === "/" && (
        <div className="big-card mb-6">
          <form className="flex flex-col gap-2">
            <div className="flex items-center">
              <label htmlFor="sortBy" className="w-24 items-center">
                Sort by
              </label>
              <select
                value={sortByInput}
                onChange={handleSortByChange}
                className="select-rounded"
                id="sortBy"
              >
                {columns.map(([value, innerText]) => (
                  <option key={value} value={value}>
                    {innerText}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex items-center">
                <input
                  type="radio"
                  name="order"
                  id="ascending"
                  value="asc"
                  checked={orderInput === "asc"}
                  onChange={handleOrderChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="ascending"
                  className="w-auto cursor-pointer inline-flex items-center"
                >
                  <AscendingIcon
                    className={orderInput === "asc" && "fill-accent"}
                  />
                </label>
                <input
                  type="radio"
                  name="order"
                  id="descending"
                  value="desc"
                  checked={orderInput === "desc"}
                  onChange={handleOrderChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="descending"
                  className="w-auto cursor-pointer inline-flex items-center"
                >
                  <DescendingIcon
                    className={orderInput === "desc" && "fill-accent"}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <label htmlFor="topic" className="w-24 items-center">
                Select topic
              </label>
              <select
                value={topicInput}
                onChange={handleTopicChange}
                className="select-rounded"
                id="topic"
              >
                <option key="any" value="any">
                  Any topic
                </option>
                {topics?.map(({ slug }) => (
                  <option key={slug} value={slug}>
                    {capitalisedSlug(slug)}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      )}
      <hr className="h-rule" />
    </header>
  );
};
