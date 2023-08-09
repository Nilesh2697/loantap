import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/quiz">Go to Quiz Page</Link>
    </div>
  );
}

export default Home;
