import { useSearchParams } from "react-router-dom";
import AscendingIcon from "../icons/up-vote.svg?react";
import DescendingIcon from "../icons/down-vote.svg?react";
import {
  pageHeader,
  headingItems,
  showOptionsButton,
  formRow,
  orderRadioGroup,
  optionsForm,
} from "../styles/PageHeader.module.css";
import { articleCard } from "../styles/ArticleCard.module.css";
import { submitButton } from "../styles/AddComment.module.css";
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
        <div className={`${optionsForm} ${articleCard}`}>
          <form onSubmit={handleSubmit}>
            <div className={formRow}>
              <label htmlFor="sortBy">Sort by</label>
              <select
                value={sortByInput}
                onChange={handleSortByChange}
                id="sortBy"
              >
                {columns.map(([value, innerText]) => (
                  <option value={value}>{innerText}</option>
                ))}
              </select>
              <div className={orderRadioGroup}>
                <input
                  type="radio"
                  name="order"
                  id="ascending"
                  value="asc"
                  checked={orderInput === "asc"}
                  onChange={handleOrderChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="ascending">
                  <AscendingIcon />
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
                <label htmlFor="descending">
                  <DescendingIcon />
                </label>
              </div>
            </div>
            <div className={formRow}>
              <label htmlFor="topic">Select topic</label>
              <select
                value={topicInput}
                onChange={handleTopicChange}
                id="topic"
              >
                <option value="any">Any topic</option>
                {topics.map(({ slug }) => (
                  <option value={slug}>{capitalisedSlug(slug)}</option>
                ))}
              </select>
              <button type="submit" className={submitButton}>
                Search
              </button>
            </div>
          </form>
        </div>
      )}
      <hr className="h-rule" />
    </header>
  );
};
