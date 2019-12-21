import React from "react";

const CheapestDeliveryRoute: React.FC = () => {
  return (
    <div>
      <h4>3. Find cheapest delivey route</h4>
      <input
        type="text"
        placeholder="Put your route here..."
        value={"inputRoutes"}
        //onChange={e => onChange(e.target.value.toUpperCase())}
        style={{ textTransform: "capitalize" }}
      />
      <button
        type="submit"
        //onClick={() => onSubmit(inputRoutes)}
      >
        Submit
      </button>
    </div>
  );
};

export default CheapestDeliveryRoute;
