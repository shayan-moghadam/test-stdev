export default class SharedReducer {
  constructor(name) {
    this.name = name;
    this.initialState = {};
    this.sagaFetchActions = {};
    this.reducer = {};
    this.actions = {};

    this.createInitialStateAndActions();
    this.createReducer();
  }

  createInitialStateAndActions = () => {
    this.sagaFetchActions = {
      ...this.sagaFetchActions,
      fetch: `${this.name}/FETCH`,
      fetchSuccess: `${this.name}/FETCH_SUCCESS`,
      fetchFailure: `${this.name}/FETCH_FAILURE`,
    };

    this.initialState = {
      fetching: false,
      fetched: false,
      error: {},
      data: {},
      form: {},
    };

    const { fetch, fetchSuccess, fetchFailure } = this.sagaFetchActions;

    this.actions = {
      ...this.actions,
      fetch: (payload = {}) => ({
        type: fetch,
        payload,
      }),
      fetchSuccess: (payload = {}) => ({
        type: fetchSuccess,
        payload,
      }),
      fetchFailure: (payload = {}) => ({
        type: fetchFailure,
        payload,
      }),
    };
  };

  createReducer = () => {
    this.reducer = (state = this.initialState, action) => {
      switch (action.type) {
        case `${this.name}/FETCH`:
          return {
            ...state,
            fetching: true,
            fetched: false,
            form: action.payload,
          };
        case `${this.name}/FETCH_SUCCESS`:
          return {
            ...state,
            fetching: false,
            fetched: true,
            data: action.payload,
          };
        case `${this.name}/FETCH_FAILURE`:
          return {
            ...state,
            fetching: false,
            fetched: true,
            error: action.payload,
          };
        case `${this.name}/RESET_CACHE`:
          return this.initialState;
        default:
          return state;
      }
    };
  };
}
