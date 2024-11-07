import { useSearchParams } from "react-router-dom";
import AscendingIcon from "../icons/up-vote.svg?react";
import DescendingIcon from "../icons/down-vote.svg?react";
import {
  pageHeader,
  headingItems,
  showOptionsButton,
} from "../styles/PageHeader.module.css";
import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";

export const PageHeader = ({ headingIcon, heading, buttonIcon }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortByInput, setSortByInput] = useState("votes");
  const [orderInput, setOrderInput] = useState("desc");
  const [topicInput, setTopicInput] = useState("any");
  const [topics, setTopics] = useState();
  const columns = [
    ["title", "Title"],
    ["topic", "Topic"],
    ["author", "Author"],
    ["created_at", "Date written"],
    ["votes", "Number of votes"],
    ["comments", "Comment count"],
  ];

  useEffect(() => {
    apiClient.get("/topics").then(({ data }) => setTopics(data.topics));
  }, []);
  const capitalisedSlug = (slug) =>
    slug && slug[0].toUpperCase() + slug?.slice(1).toLowerCase();
  const handleClick = () => {
    setShowSortOptions(!showSortOptions);
  };
  const handleSortByChange = (e) => setSortByInput(e.target.value);
  const handleOrderChange = (e) => setOrderInput(e.target.value);
  const handleTopicChange = (e) => setTopicInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearchParams = {
      sort_by: sortByInput,
      order: orderInput,
      topic: topicInput === "any" ? "" : topicInput,
    };
    setSearchParams(newSearchParams);
  };
  return (
    <header className={pageHeader}>
      <div className={headingItems}>
        {headingIcon}
        <h2>{capitalisedSlug(searchParams.get("topic")) || heading}</h2>
        {buttonIcon && (
          <button onClick={handleClick} className={showOptionsButton}>
            {buttonIcon}
          </button>
        )}
      </div>
      {showSortOptions && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Sort by:
              <select value={sortByInput} onChange={handleSortByChange}>
                {columns.map(([value, innerText]) => (
                  <option value={value}>{innerText}</option>
                ))}
              </select>
            </label>
            <label>
              Order:
              <label>
                <AscendingIcon />
                <input
                  type="radio"
                  name="order"
                  value="asc"
                  checked={orderInput === "asc"}
                  onChange={handleOrderChange}
                  style={{ display: "none" }}
                />
              </label>
              <label>
                <DescendingIcon />
                <input
                  type="radio"
                  name="order"
                  value="desc"
                  checked={orderInput === "desc"}
                  onChange={handleOrderChange}
                  style={{ display: "none" }}
                />
              </label>
            </label>
            <label>
              Select topic:
              <select value={topicInput} onChange={handleTopicChange}>
                <option value="any">Any topic</option>
                {topics.map(({ slug }) => (
                  <option value={slug}>{capitalisedSlug(slug)}</option>
                ))}
              </select>
            </label>
            <button type="submit">Search</button>
          </form>
        </div>
      )}
      <hr className="h-rule" />
    </header>
  );
};
