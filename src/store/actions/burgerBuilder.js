import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    };
};

export const setIngredient = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients : ingredients 
    };
}

export const fetchIngredient = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://burger-builder-react-fb3ca-default-rtdb.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(setIngredient(res.data))
        })
        .catch(err => {
            dispatch(fetchIngredient());
        })
    };
};