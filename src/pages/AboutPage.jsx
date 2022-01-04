import React, { useEffect, useState } from "react";
import StyledContent from "../components/styledContent/StyledContent";
import { gql } from "@apollo/client";
import client from "../graphql/config";

import styles from "./AboutPage.module.css";
import TableOfContent from "../components/tableOfContent/TableOfContent";
export default function AboutPage() {
  const [fetchStatus, setFetchStatus] = useState("initial");
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const {
          data: { abouts },
        } = await client.query({
          query: gql`
            query {
              abouts {
                name
                facebook
                github
                email
                bio
                image {
                  url
                }
                content {
                  markdown
                }
              }
            }
          `,
        });

        setAbout(abouts[0]);
        console.log(abouts[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchStatus("finished");
      }
    };

    fetchData();
  }, []);

  // scroll to top begin
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <article>
          {fetchStatus === "finished" && (
            <StyledContent>{about.content.markdown}</StyledContent>
          )}
        </article>
      </div>
      <aside className={styles.aside}>
        {fetchStatus === "finished" && <TableOfContent />}
      </aside>
    </div>
  );
}
