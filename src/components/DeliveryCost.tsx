import React from "react";

interface DeliveryCostProps {
  inputRoutes: string;
  onChange(route: string): void;
  onSubmit(route: string): void;
}

const DeliveryCost: React.FC<DeliveryCostProps> = ({
  inputRoutes,
  onChange,
  onSubmit
}) => {
  return (
    <div>
      <h4>1. Calculate delivey cost</h4>
      <input
        type="text"
        placeholder="Put your route here..."
        value={inputRoutes}
        onChange={e => onChange(e.target.value.toUpperCase())}
        style={{ textTransform: "capitalize" }}
      />
      <button type="submit" onClick={() => onSubmit(inputRoutes)}>
        Submit
      </button>
    </div>
  );
};

export default DeliveryCost;