import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../components/withErrorHandler/wihtErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/spinner';

class Orders extends Component {
    
    componentDidMount() {
       this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        const deleteOrders = (id, token) => {
            this.props.onDeleteOrder(id, token);
            // this.props.onFetchOrders(token);
        }

        let orders = <Spinner/>
        if (!this.props.loading){
            orders = (
            <div>
                {this.props.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                    delete={() => deleteOrders(order.id, this.props.token)}
                    />
                ))}
            </div>
            )
        }
        //!return the JSX
        return orders
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders:(token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder: (id, token) => dispatch(actions.deleteOrders(id, token))
    };
}

export default connect(mapStateToProps ,mapDispatchToProps)(withErrorHandler(Orders, axios)) ;