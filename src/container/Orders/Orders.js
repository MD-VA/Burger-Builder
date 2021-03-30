import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../components/withErrorHandler/wihtErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            console.log('Data : ',res.data)
            const fetcheOrders = [];
            for (let key in res.data) {
                fetcheOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({loading: false, orders: fetcheOrders})
            // console.log('fioejrof',fetcheOrders);
            // console.log('fioejrof',this.state.orders);
        })
        .catch(err => {
            console.error(err); 
            this.setState({loading: false});
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios) ;