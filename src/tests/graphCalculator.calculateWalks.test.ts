import graphCalculator from "../utils/graphCalculator";

const routes = graphCalculator.buildMatrix([
  "AB1",
  "AC4",
  "AD10",
  "BE3",
  "CD4",
  "CF2",
  "DE1",
  "EA2",
  "EB3",
  "FD1"
]);

test("route exist", () => {
  expect(graphCalculator.calculateWalks(routes, "A", "D", 2)).toBe(1);
  expect(graphCalculator.calculateWalks(routes, "E", "D", 4)).toBe(2);
});

test("route does not exist", () => {
  expect(graphCalculator.calculateWalks(routes, "A", "X", 3)).toBe(0);
});
