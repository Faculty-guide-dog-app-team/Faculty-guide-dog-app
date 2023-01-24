let start_time = Date.now();

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
  let k = 1 / 2;
  let i = 0;
  let precision = Math.pow(10, -10); // jaka dokładność
  let step = 0.1;
  let poprzedni_warunek = Math.pow(10, 100);

  while (k <= 4) {
    // czy musi aż tyle być

    let X =
      (p(nb ** k) -
        p(nc ** k) -
        p(X_B) +
        p(X_C) -
        ((p(na ** k) - p(nb ** k) - p(X_A) + p(X_B) - p(Y_A) + p(Y_B)) *
          (Y_C - Y_B)) /
          (Y_B - Y_A) -
        p(Y_B) +
        p(Y_C)) /
      (2 * (X_C - X_B - ((X_B - X_A) * (Y_C - Y_B)) / (Y_B - Y_A)));

    let Y =
      (p(na ** k) -
        p(nb ** k) -
        2 * X * (X_B - X_A) -
        p(X_A) +
        p(X_B) -
        p(Y_A) +
        p(Y_B)) /
      (2 * (Y_B - Y_A));

    let warunek = Math.abs(
      p(na ** k) +
        p(nb ** k) +
        p(nc ** k) -
        p(X - X_A) -
        p(Y - Y_A) -
        p(X - X_B) -
        p(Y - Y_B) -
        p(X - X_C) -
        p(Y - Y_C),
    );

    if (Date.now() - start_time > 1500) {
      // zwraca cokolwiek po 1.5 s

      X = Math.round(X * 1000) / 1000;
      Y = Math.round(Y * 1000) / 1000;
      k = Math.round(k * 1000) / 1000;

      return [X, Y]; //
    }

    if (warunek < poprzedni_warunek) {
      // sprawdzam czy jest postęp
      if (warunek <= precision) {
        X = Math.round(X * 1000) / 1000;
        Y = Math.round(Y * 1000) / 1000;

        return [X, Y]; //
      }
    } else {
      step = -step / 2; // gradient
    }

    k += step;
    poprzedni_warunek = warunek;
    i += 1;
  }
}
