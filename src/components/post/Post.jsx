import React from "react";
import { Link } from "react-router-dom";

import styles from "./Post.module.css";

export default function Post(props) {
  const post = props.post;
  return (
    <div className={styles.post}>
      <Link to={`/post/${post.link}`}>
        <div
          className={styles["post__image"]}
          style={{
            background: `url(
            ${post.thumbnail.url}
          ) center/cover no-repeat`,
          }}
        ></div>
      </Link>
      <div className={styles["post__info"]}>
        <Link to={`/post/${post.link}`}>
          <span className={styles["post__name"]}>{post.title}</span>
        </Link>
        <span className={styles["post__time"]}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
