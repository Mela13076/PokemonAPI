import React from 'react';

const History = ({ prevImages }) => {
  return (
    <div className="history">
      <h3>Previous Pokemon:</h3>
      <div className="image-container">
        {prevImages.map((image, index) => (
          <img src={image} alt={`Previous Pokemon ${index + 1}`} key={index} />
        ))}
      </div>
    </div>
  );
};

export default History;
