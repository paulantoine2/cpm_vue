export default function (input) {
  if (typeof input === 'number' && input < 10) return '0' + input
  return input
};
