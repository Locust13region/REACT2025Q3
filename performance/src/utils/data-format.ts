export default function dataFormat(n: number) {
  if (n === 0) return '0.0';

  const abs = Math.abs(n);

  if (abs < 0.00001) {
    return n.toExponential(3);
  }

  return Number(n.toFixed(5)).toString();
}
