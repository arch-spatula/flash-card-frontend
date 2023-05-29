import matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";
import { expect } from "vitest";

expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
