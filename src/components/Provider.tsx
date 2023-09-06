"use client";
import React from "react";
import { store } from "@/Redux/store";
import { Provider } from "react-redux";

const ProviderComp = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderComp;
