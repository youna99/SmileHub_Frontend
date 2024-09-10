import React from 'react';

const PageNotFound = () => {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="text-center">
        <a href="/">
          <h1 className="text-9xl font-bold outline-text">PAGE NOT FOUND</h1>
        </a>
      </div>
      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #0000ff; /* Change #0000ff to the desired outline color */
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;
