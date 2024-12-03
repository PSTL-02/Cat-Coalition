import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [home, setHome] = useState([]);
  const [error, setError] = useState(null);

  const endpoint = `${baseUrl}/homepost?_embed`;

  useEffect(() => {
    const fetchHomePost = async () => {
      try {
        const response = await axios.get(endpoint);
        setHome(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home posts:", err);
        setError("Failed to fetch posts. Please try again later.");
      }
    };

    fetchHomePost();
  }, []);

  const getFeaturedImage = (homePost) => {
    if (
      homePost?._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    ) {
      return homePost._embedded["wp:featuredmedia"][0].source_url;
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <>
      <Seo
        title="Community Cat Coalition"
        description="Where Compassion Meets Management: The Humane Solution for Auckland's Community Cats"
        url={window.location.href}
      />

      <div className="home-page-header">
        <h1>COMMUNITY CAT COALITION</h1>
        <p>
          Where Compassion Meets Management: The Humane Solution for
          Auckland's Community Cats
        </p>
        <button>VOLUNTEER</button>
      </div>

      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div >
            {home.map((homePost, index) => {
              const title = homePost?.title?.rendered || "No Title";
              const excerpt =
                homePost?.excerpt?.rendered || "No Excerpt Available";

              return (
                <div className="home-post-cont" key={homePost.slug + "-" + index}>
                  <h3>{title}</h3>
                  <div className="home-post-cont-inr">
                    {/* Excerpt Section */}
                    <div className="home-para-cont">
                      <div dangerouslySetInnerHTML={{ __html: homePost.content.rendered }} />
                    </div>

                    {/* Image Section */}
                    <div className="home-para-cont">
                      <img src={getFeaturedImage(homePost)} alt={`${title} profile picture`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
