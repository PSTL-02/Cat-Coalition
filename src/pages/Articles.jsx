import { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const endpoint = `${baseUrl}/articles?_embed`;

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(endpoint);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Helper function to get the featured image
  const getFeaturedImage = (article) => {
    if (
      article &&
      article._embedded &&
      article._embedded['wp:featuredmedia'] &&
      article._embedded['wp:featuredmedia'][0].source_url
    ) {
      return article._embedded['wp:featuredmedia'][0].source_url;
    } else {
      return 'https://via.placeholder.com/150';
    }
  };

  return (
    <>
      <Seo
        title="Articles - Community Cat Coalition"
        description="Come read the articles on Community Cat Coalition."
        url={window.location.href}
      />
      <PageHeader title="Articles " image_url="/Header/Artical-header.png"/>

      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="articles-grid">
            {articles.map((article, index) => (
              <div key={article.slug + "-" + index} className="article-container">
                <img
                  src={getFeaturedImage(article)}
                  alt={`${article.title.rendered} profile picture`}
                />
                <h4 className="title">{article.title.rendered}</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                />
                <a href={`#/article/${article.id}`} className="read-more-link">
                  Read More...
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Articles;
