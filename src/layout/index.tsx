import React, { ReactElement } from "react";

// components
import Topbar from "./Topbar";

interface IndexProps {
  children: ReactElement;
}
const Index = ({ children }: IndexProps) => {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
};

export default Index;
