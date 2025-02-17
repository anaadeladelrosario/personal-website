import React from "react";

export interface IngredientProps {
  name: string;
  optional: boolean;
  quantity: number;
  unit: string;
}
const Ingredient: React.FC<IngredientProps> = ({
  name,
  optional,
  quantity,
  unit,
}) => {
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <div style={{ width: "70%", textAlign: "left" }}>
        {name}
        {optional ? "(Opt.)" : ""}
      </div>
      <div style={{ width: "30%", fontWeight: "bold" }}>{quantity}</div>
      <div style={{ width: "20%", fontWeight: "bold" }}>{unit}</div>
    </div>
  );
};

export default Ingredient;
