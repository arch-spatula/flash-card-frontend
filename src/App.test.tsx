import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("should renders hello world!", () => {
    // Arrange
    render(<App />);

    // Act(선택적)
    // 현재는 생략

    // Expect
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "hello world!"
    );
  });
});
