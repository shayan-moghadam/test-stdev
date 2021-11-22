export function sortAscFunction(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? -1 : 1;
}
export function sortDescFunction(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? 1 : -1;
}
