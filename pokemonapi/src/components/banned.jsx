import React from 'react';

const Banned = ({ bannedAttributes, handleUnbanAttributeClick }) => {
  return (
    <div className="banned">
      <h3>Banned Attributes</h3>
      <ul>
        {bannedAttributes.map((attribute, index) => (
          <div key={index}>
            {/* {attribute}{' '} */}
            <button className="bannedButn" onClick={() => handleUnbanAttributeClick(attribute)}>{attribute}</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Banned;
