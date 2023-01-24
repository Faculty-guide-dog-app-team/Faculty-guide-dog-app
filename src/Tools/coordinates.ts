function p(x: number): number {
  return Math.pow(x, 2);
}

export function coordinates_X_Y(
  na: number,
  nb: number,
  nc: number,
  A: number[],
  B: number[],
  C: number[],
): number[] {
  let X_A = A[0];
  let X_B = B[0];
  let X_C = C[0];
  let Y_A = A[1];
  let Y_B = B[1];
  let Y_C = C[1];

  let X =
    (p(nb) -
      p(nc) -
      p(X_B) +
      p(X_C) -
      ((p(na) - p(nb) - p(X_A) + p(X_B) - p(Y_A) + p(Y_B)) * (Y_C - Y_B)) /
        (Y_B - Y_A) -
      p(Y_B) +
      p(Y_C)) /
    (2 * (X_C - X_B - ((X_B - X_A) * (Y_C - Y_B)) / (Y_B - Y_A)));

  let Y =
    (p(na) - p(nb) - 2 * X * (X_B - X_A) - p(X_A) + p(X_B) - p(Y_A) + p(Y_B)) /
    (2 * (Y_B - Y_A));

  X = Math.round(X * 1000) / 1000;
  Y = Math.round(Y * 1000) / 1000;
  return [X, Y];
}
