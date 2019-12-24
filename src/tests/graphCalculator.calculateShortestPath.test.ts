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

test("single route", () => {
  expect(graphCalculator.calculateShotestPath(routes, "A", "B")).toBe(1);
});

test("multiple route", () => {
  expect(graphCalculator.calculateShotestPath(routes, "E", "D")).toBe(9);
});

test("cyclic route 2 nodes", () => {
  expect(graphCalculator.calculateShotestPath(routes, "E", "B")).toBe(3);
});

test("cyclic route multiple nodes", () => {
  const routes = graphCalculator.buildMatrix([
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "BA2",
    "CD4",
    "CF2",
    "DE1",
    "EA4",
    "EB1",
    "FD1"
  ]);
  expect(graphCalculator.calculateShotestPath(routes, "E", "D")).toBe(10);
});

test("start & end are same node no route back to start", () => {
  expect(graphCalculator.calculateShotestPath(routes, "A", "A")).toBe(0);
  expect(graphCalculator.calculateShotestPath(routes, "B", "B")).toBe(0);
});

test("start & end are same node has route back to start", () => {
  expect(graphCalculator.calculateShotestPath(routes, "A", "A")).toBe(6);
});

test("route does not exist", () => {
  const routes = graphCalculator.buildMatrix(["AB1", "BC2", "AD4"]);
  expect(graphCalculator.calculateShotestPath(routes, "A", "X")).toBe(
    undefined
  );
});
