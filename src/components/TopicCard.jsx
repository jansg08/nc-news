import { Link } from "react-router-dom";
import { articleCard, articleImg } from "../styles/ArticleCard.module.css";

export const TopicCard = ({ topic }) => {
  return (
    <Link to={`/?topic=${topic.slug}`} className="link">
      <div className={articleCard}>
        <img src={`/src/imgs/${topic.slug}.jpg`} className={articleImg} />
        <h3>{topic.slug}</h3>
        <p>{topic.description}</p>
      </div>
    </Link>
  );
};
