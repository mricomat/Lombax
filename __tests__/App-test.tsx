import { render } from "@testing-library/react-native";
import React from "react";
import "react-native";

import App from "src/screens/dummy-file";
// Note: test renderer must be required after react-native.

test("renders correctly", () => {
  render(<App />);
});
