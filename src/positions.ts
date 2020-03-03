const positionFactor = 50 * 650000;

export function calculateNewPosition(
  previousPosition: number,
  nextPosition: number
): number {
  return (previousPosition + nextPosition) / 2;
}

export function calculateNewPositionMinCollision(
  previousPosition: number,
  nextPosition: number
): number {
  const newPos = calculateNewPosition(previousPosition, nextPosition);
  const theRandomNumber = getRandomArbitraryNumber(
    0,
    (newPos - previousPosition) / 2
  );
  return newPos + randomNegative(theRandomNumber);
}

function getRandomArbitraryNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getOneOrZero(): number {
  return Math.round(Math.random());
}

function randomNegative(input: number, seed: number = getOneOrZero()): number {
  return input * (1 + -2 * seed);
}

export function getNextPosition({
  previousPosition,
  positionConstant = positionFactor
}: {
  previousPosition: number;
  positionConstant?: number;
}): number {
  return previousPosition + positionConstant;
}

export function getNextPositionMinCollision(
  previousPosition: number,
  positionConstant: number = positionFactor
): number {
  return calculateNewPositionMinCollision(
    previousPosition,
    previousPosition + positionConstant * 2
  );
}

export function getPrependPosition(
  nextPosition: number,
  positionConstant: number = positionFactor
): number {
  let prevPosition = nextPosition - positionConstant;
  if (prevPosition < 0 || prevPosition > nextPosition) prevPosition = 0;
  return calculateNewPosition(prevPosition, nextPosition);
}

export function getPrependPositionMinCollision(
  nextPosition: number,
  positionConstant: number = positionFactor
): number {
  let prevPosition = nextPosition - positionConstant;
  if (prevPosition < 0) prevPosition = 0;
  return calculateNewPositionMinCollision(prevPosition, nextPosition);
}

export function reformatPositions<T>(
  positions: T[],
  comparisonFunction: (a: T, b: T) => number,
  setterFunction: (value: T, newPosition: number) => T,
  positionConstant: number = positionFactor
): T[] {
  const positionsSorted = positions.sort(comparisonFunction);
  return positionsSorted.map((val, index) => {
    return setterFunction(val, positionConstant * (index + 1));
  });
}

export function triggerReformation(
  previousPosition: number,
  position: number,
  positionConstant: number = positionFactor
): boolean {
  return (
    position < 1 / positionConstant ||
    position > Number.MAX_VALUE - 2 * positionConstant ||
    position - previousPosition < 1 / positionConstant
  );
}
