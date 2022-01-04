import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { gql } from "@apollo/client";
import client from "../graphql/config";

import TableOfContent from "../components/tableOfContent/TableOfContent";

import styles from "./PostDetailPage.module.css";
import StyledContent from "../components/styledContent/StyledContent";

let scrollY = 0;

export default function PostDetailPage() {
  const [fetchStatus, setFetchStatus] = useState("initial");
  const [postDetail, setPostDetail] = useState(null);

  const params = useParams();

  // get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const {
          data: { posts },
        } = await client.query({
          query: gql`
                  query {
                    posts(where: { link: "${params.slug}" }) {
                      id
                      title
                      desc
                      content {
                        markdown
                      }
                      link
                      thumbnail {
                        url
                      }
                      categories {
                        name
                        link
                      }
                      
            
                      publishedAt
                    }
                  }
                `,
        });

        setPostDetail(posts[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchStatus("finished");
      }
    };

    fetchData();
  }, [params]);

  // css for header
  useEffect(() => {
    const header = document.querySelector("header");

    const handleScroll = (e) => {
      if (window.scrollY > scrollY) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = null;
      }

      scrollY = window.scrollY;
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      header.style.transform = null;
    };
  }, []);

  // scroll to top begin
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles["container"]}>
      {fetchStatus === "loading" && (
        <article className={styles.article}>
          <div className={styles["loading__thumbnail"]}>
            <Skeleton
              baseColor="var(--color-skeleton)"
              highlightColor="var(--color-skeleton-animation)"
              className={styles["thumbnail__skeleton"]}
            />
          </div>
          <div className={styles["loading__title"]}>
            <Skeleton
              baseColor="var(--color-skeleton)"
              highlightColor="var(--color-skeleton-animation)"
              height={80}
              className={styles["title__skeleton"]}
            />
          </div>
          <div>
            <Skeleton
              baseColor="var(--color-skeleton)"
              highlightColor="var(--color-skeleton-animation)"
              className={styles["content__skeleton"]}
              count={4}
            />
          </div>
        </article>
      )}

      {fetchStatus === "finished" && (
        <article className={styles.article}>
          <div className={styles["thumbnail"]}>
            <img src={postDetail.thumbnail.url} alt="" />
          </div>
          <h1 className={styles["title"]}>{postDetail.title}</h1>
          <StyledContent fetchStatus={fetchStatus}>
            {postDetail.content.markdown}
          </StyledContent>
        </article>
      )}

      <aside className={styles.aside}>
        {fetchStatus === "loading" && (
          <>
            <div>
              <Skeleton
                baseColor="var(--color-skeleton)"
                highlightColor="var(--color-skeleton-animation)"
                className={styles["toc__skeleton"]}
              />
            </div>
            <div>
              <Skeleton
                baseColor="var(--color-skeleton)"
                highlightColor="var(--color-skeleton-animation)"
                className={styles["toc__skeleton"]}
                count={4}
              />
            </div>
          </>
        )}
        {fetchStatus === "finished" && <TableOfContent />}
      </aside>
    </div>
  );
}
