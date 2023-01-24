let start_time = Date.now();

function p(x: number): number {
    return Math.pow(x,2);
}

function współrzędne_X_Y(na: number, nb: number, nc: number, A: number[], B: number[], C: number[]): number[] {
    let X_A = A[0];
    let X_B = B[0];
    let X_C = C[0];
    let Y_A = A[1];
    let Y_B = B[1];
    let Y_C = C[1];
    let k = -1000;
    let i = 0;
    let precision = Math.pow(10,-10);
    let step = 100;
    let poprzedni_warunek = Math.pow(10,100);

    while (k <=1000) {


        let X = (p(k/nb) - p(k/nc) - p(X_B) + p(X_C) - (p(k/na) - p(k/nb) - p(X_A) + p(X_B) - p(Y_A) + p(Y_B)) * (Y_C - Y_B) / (Y_B - Y_A) - p(Y_B) + p(Y_C)) / (2 * (X_C - X_B - (X_B - X_A) * (Y_C - Y_B) / (Y_B - Y_A)));

        let Y = (p(k/na) - p(k/nb) - 2 * X * (X_B - X_A) - p(X_A) + p(X_B) - p(Y_A) + p(Y_B)) / (2 * (Y_B - Y_A));


        let warunek = Math.abs(p(k/na)+p(k/nb)+p(k/nc)-p(X-X_A)-p(Y-Y_A)-p(X-X_B)-p(Y-Y_B)-p(X-X_C)-p(Y-Y_C));

        if (Date.now()-start_time>1500) {

            X = Math.round(X * 1000) / 1000;
            Y = Math.round(Y * 1000) / 1000;
            k = Math.round(k * 1000) / 1000;

                return [X, Y ];//, k, i, warunek
        }

        if (warunek < poprzedni_warunek) {
            if (warunek <= precision) {

                X = Math.round(X * 1000) / 1000;
                Y = Math.round(Y * 1000) / 1000;
                k = Math.round(k * 1000) / 1000;

                return [X, Y ];//, k, i, warunek
            }
        } else {
            step = -step / k;

        }

        k += step;

        poprzedni_warunek = warunek;

        i += 1;

    }

}