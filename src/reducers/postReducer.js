import { FETCH_POSTS, DELETE_POST, FILTER_MOVIES } from '../actions/types';
import { filterMovies } from '../actions/postActions';

const initialState = {
    items: [],
    allItems: [],
    item: {},
    cat:[],
    catChecker: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS:{
            const cat = [...new Set(action.payload.map(i => i.category))];
            return {
                ...state,
                items: action.payload,
                allItems: action.payload,
                cat: cat,
                catChecker: cat
            };
        }
        case FILTER_MOVIES: {
            return {
                ...state,
                items: action.payload.moviesFilter,
                catChecker: action.payload.categoriesFiltered
            };
        }
        case DELETE_POST:
            const filteredMovies = state.items.filter(item => item.id !== action.payload.id)
            let remainingCategories = []
            filteredMovies.map( movie => {
                remainingCategories = [...remainingCategories, movie.category]
            })
            const uniqueRemainingCategories = [...new Set(remainingCategories)]
            console.log("uniqueRemainingCategories in reducer", uniqueRemainingCategories)
            return {
                ...state,
                items: filteredMovies,
                cat: uniqueRemainingCategories,
            };
        default:
            return state;
    }
}