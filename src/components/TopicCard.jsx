import { Link } from "react-router-dom";
import { articleCard, articleImg } from "../styles/ArticleCard.module.css";
import {
  topicSlug,
  imgWithSlug,
  description,
} from "../styles/TopicCard.module.css";

export const TopicCard = ({ topic }) => {
  return (
    <Link to={`/?topic=${topic.slug}`} className="link">
      <div className={articleCard}>
        <div className={imgWithSlug}>
          <img src={`/src/imgs/${topic.slug}.jpg`} className={articleImg} />
          <span className={topicSlug}>{topic.slug}</span>
        </div>
        <p className={description}>{topic.description}</p>
      </div>
    </Link>
  );
};
