import React from "react";
import { default as ReactSelect } from "react-select";

interface CustomSelectProps {
  value: object | null | undefined;
  onChange: (value: object | null | undefined) => void;
  options: Array<object>;
}

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
  return <ReactSelect value={value} options={options} onChange={onChange} />;
};

export default CustomSelect;
