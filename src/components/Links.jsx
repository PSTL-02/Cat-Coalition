import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Store from '../pages/Store';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import Article from '../pages/Article';
import Articles from '../pages/Articles';

const Links = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/store" element={<Store />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
  );
};

export default Links;
