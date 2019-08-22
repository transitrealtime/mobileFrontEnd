const GET_ROUTE = "GET_ROUTE";
const STORE_ROUTE = "STORE_ROUTE";

const getRoute = () => {
    return {
        type: GET_ROUTE
    }
}

const storeRoute = (route) =>{
    return{
        type: STORE_ROUTE,
        payload: route
    }
}


export const getRouteThunk = () => (dispatch) => {
    dispatch(getRoute());
}

export const storeRouteThunk = (route) => (dispatch) =>{
    dispatch(storeRoute(route));
}

export default directionReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ROUTE:
            return state
        case STORE_ROUTE:
            return action.payload
        default:
            return state;
    }
}