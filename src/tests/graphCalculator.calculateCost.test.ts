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

test("route exist at the beginning", () => {
  expect(graphCalculator.calculateCost(routes, "AB")).toBe(1);
});

test("route exist at the middle", () => {
  expect(graphCalculator.calculateCost(routes, "CF")).toBe(2);
});

test("route exist at the end", () => {
  expect(graphCalculator.calculateCost(routes, "DE")).toBe(1);
});

test("route exist but cost is NaN", () => {
  const routes = graphCalculator.buildMatrix([
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "CDX"
  ]);

  expect(graphCalculator.calculateCost(routes, "CD")).toBe(NaN);
});

test("start & end are at the same node", () => {
  expect(graphCalculator.calculateCost(routes, "CC")).toBe(0);
  expect(graphCalculator.calculateCost(routes, "CCCCCCCCC")).toBe(0);
});

test("duplicated at the start node", () => {
  expect(graphCalculator.calculateCost(routes, "AAC")).toBe(4);
});

test("duplicated at the end node", () => {
  expect(graphCalculator.calculateCost(routes, "ACFDD")).toBe(7);
  expect(graphCalculator.calculateCost(routes, "ACFDDDDD")).toBe(7);
});

test("duplicated", () => {
  expect(graphCalculator.calculateCost(routes, "AACCDD")).toBe(8);
});

test("route does not exist", () => {
  const routes = graphCalculator.buildMatrix(["AB1", "BC2", "AD4"]);
  expect(graphCalculator.calculateCost(routes, "AX")).toBe(Infinity);
  expect(graphCalculator.calculateCost(routes, "ABBA")).toBe(Infinity);
});
