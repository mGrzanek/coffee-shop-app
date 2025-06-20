export enum Weight {
  standard = '100',
  medium = '200',
  max = '300',
}

export const weightMultiplier = (weight: Weight) => {
  switch (weight) {
    case Weight.medium:
      return 1.8;
    case Weight.max:
      return 2.7;
    default:
      return 1;
  }
};
