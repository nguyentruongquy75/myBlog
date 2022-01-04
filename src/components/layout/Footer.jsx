import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FacebookProvider, Page } from "react-facebook";
import { gql } from "@apollo/client";
import client from "../../graphql/config";

import AvatarMaker from "../../assets/img/AvatarMaker.png";
import Facebook from "../../assets/img/facebook.png";
import Github from "../../assets/img/github.png";
import Gmail from "../../assets/img/gmail.png";
import Linkedin from "../../assets/img/linkedin.png";
import Youtube from "../../assets/img/youtube.png";

import styles from "./Footer.module.css";
export default function Footer() {
  const [fetchStatus, setFetchStatus] = useState("initial");
  const [categories, setCategories] = useState([]);
  const [about, setAbout] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const { data } = await client.query({
          query: gql`
            query {
              categories {
                id
                name
                link
              }
              abouts {
                facebook
                github
                email
                youtube
                linkedin
              }
            }
          `,
        });

        setCategories(data.categories);
        setAbout(data.abouts[0]);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchStatus("finished");
      }
    };

    fetchData();
  }, []);

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__container"]}>
        <div className={styles["footer__top"]}>
          <div className={styles["footer__logo-container"]}>
            <div className={styles["footer__logo"]}>
              <img src={AvatarMaker} alt="Logo" />
              <h2>Bug Creator</h2>
            </div>
            <span>Thank you for reading!</span>
          </div>
          <div>
            <h2 className={styles["footer__title"]}>Blog</h2>
            <div>
              <ul>
                {fetchStatus === "finished" &&
                  categories.map((cate) => (
                    <li key={cate.id}>
                      <Link to={`/posts/${cate.link}`}>{cate.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className={styles["footer__title"]}>Fanpage</h2>
            <div>
              <FacebookProvider appId={668629721213137}>
                <Page
                  height={200}
                  href="https://www.facebook.com/bugcreator75"
                  tabs="timeline"
                  showFacepile={true}
                  smallHeader={true}
                />
              </FacebookProvider>
            </div>
          </div>
        </div>
        <div className={styles["footer__bottom"]}>
          <div className={styles["copyright"]}>
            <p>&copy; 2022 Bug Creator</p>
          </div>

          {fetchStatus === "finished" && (
            <div>
              <ul className={styles["social__list"]}>
                {about.facebook && (
                  <li>
                    <Link to={about.facebook}>
                      <img src={Facebook} alt="facebook" />
                    </Link>
                  </li>
                )}

                {about.github && (
                  <li>
                    <Link to={about.github}>
                      <img src={Github} alt="github" />
                    </Link>
                  </li>
                )}

                {about.linkedin && (
                  <li>
                    <Link to={about.linkedin}>
                      <img src={Linkedin} alt="Linkedin" />
                    </Link>
                  </li>
                )}

                {about.gmail && (
                  <li>
                    <Link to={about.gmail}>
                      <img src={Gmail} alt="Gmail" />
                    </Link>
                  </li>
                )}

                {about.youtube && (
                  <li>
                    <Link to={about.youtube}>
                      <img src={Youtube} alt="Gmail" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
