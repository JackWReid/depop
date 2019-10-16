export default function clock(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT_CLOCK':
      return state + 1
    case 'DECREMENT_CLOCK':
      return state - 1
    case 'RESET_CLOCK':
      return 0;
    default:
      return state;
  }
}
