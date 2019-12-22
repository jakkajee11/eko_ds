import React from "react";

interface PossibleDeliveryRouteProps {
  inputRoutes: string;
  onChange(route: string): void;
  onSubmit(from: string, to: string, k: number): void;
}

const PossibleDeliveryRoute: React.FC<PossibleDeliveryRouteProps> = ({
  inputRoutes,
  onChange,
  onSubmit
}) => {
  return (
    <div>
      <h4>2. Possible delivey routes</h4>
      <input
        type="text"
        placeholder="Put your route here..."
        value={inputRoutes}
        onChange={e => onChange(e.target.value.toUpperCase())}
        style={{ textTransform: "capitalize" }}
      />
      <input type="number" defaultValue={3} min={0} />
      <button
        type="submit"
        onClick={() => onSubmit(inputRoutes[0], inputRoutes[1], 3)}
      >
        Submit
      </button>
    </div>
  );
};

export default PossibleDeliveryRoute;
