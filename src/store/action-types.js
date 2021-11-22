const SHOW_ALERT = "SHOW_ALERT";

export { SHOW_ALERT };

export default function createAction(type, payload) {
  return {
    type,
    payload,
  };
}
