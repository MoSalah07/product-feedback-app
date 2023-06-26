import styles from "./FeeBackContent.module.css";
import Button from "../../buttons/links/Button";

function FeedBackContent({item: {likes, description, title, type, comments, id} = []}) {
  return (
    <div className={styles.feed_back_content}>
          <Button href={`/${id}`} >
      <div>
        <div>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke="#4661E6"
              strokeWidth="2"
              fill="none"
            ></path>
          </svg>
          <b>{likes}</b>
        </div>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{type}</span>
      </div>
      <div>
        <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
            fill="#CDD2EE"
          ></path>
              </svg>
        <h3>{comments?.length}</h3>
      </div>
    </Button>
    </div>

  );
}

export default FeedBackContent;
