const data = [
  ["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"],
  [
    "AB1",
    "BA2",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1"
  ],
  ["AB1", "BE3", "EAX"],
  ["AB1", "AD10", "BE3", "DE1", "EA2"],
  ["AB1", "AC4", "AD10", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"]
];
export const fakeRoutes = (index: number = 0): string[] => data[index];
