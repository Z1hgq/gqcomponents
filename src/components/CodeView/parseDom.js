export default function parseDom(arg) {
  const objE = document.createElement('div');
  objE.innerHTML = arg;
  return objE;
}
