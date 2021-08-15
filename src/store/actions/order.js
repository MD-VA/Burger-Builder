import * as actionTypes from "./actionTypes";
import axios from '../../axios';



export const purshaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purshaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
        
    }
};

export const purcahseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,

    }
};

export const purshaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purcahseBurgerStart());
        axios.post('/orders.json?auth=' + token,orderData)
        .then(res => {
            console.log(res);
            dispatch(purshaseBurgerSuccess(res.data.name, orderData))
            
        })
        .catch(err => {
            console.error(err); 
            dispatch (purshaseBurgerFail(err))
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.FETH_ORDER_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return{
        type: actionTypes.FETH_ORDER_START
    };
};

export const fetchOrders = (token, userId) => {

    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + `&orderBy="userId"&equalTo="${userId}"`; 
        //!NOTE in this part we fetch data from the database 
        axios.get('/orders.json' + queryParams)
        .then(res => {
            console.log('Data : ',res.data)
            const fetcheOrders = [];
            for (let key in res.data) {
                fetcheOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            //!NOTE here we call the fucntion fetchOrders to set the state with the fetched data
            dispatch(fetchOrderSuccess(fetcheOrders)) ;
        })
        .catch(err => {
            // console.error(err); 
            dispatch(fetchOrderFail(err));
        })
    }  
}

export const deleteOrders = (id, token) => {
    return dispatch => {
        axios.delete(`/orders/${id}.json?auth=${token}`)
        .then(res => {
            console.log(res,'was deleted')
            dispatch(fetchOrders(token)) ;
        })
        .catch(err => {
            console.error(err);
            // alert('there has been an error');
        })
    } 
}

