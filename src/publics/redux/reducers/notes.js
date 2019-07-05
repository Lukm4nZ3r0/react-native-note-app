const initialState = {
    number: 0,
    data: [],
    searchResult: [],
    isLoading:false,
    ascData:[],
    sort:'DESC',
    currentPage:1,
    totalPages:1
}

export default notes = (state = initialState, action)=>{
    let {data} = state
    switch(action.type){
        case 'GET_NOTES_PENDING':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_NOTES_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data.data,
                totalPages: action.payload.data.totalPages
            }
        case 'ADD_NOTES_PENDING':
            return {
                ...state,
                isLoading: false,
            }
        case 'ADD_NOTES_REJECTED':
            return{
                ...state,
                isLoading: false
            }
        case 'ADD_NOTES_FULFILLED':
            let lastData = state.data //global state
            let newElement = {
                id:action.payload.data.data.insertId,
                title:action.payload.data.values.title,
                note:action.payload.data.values.note,
                category:action.payload.data.values.category,
                time: new Date()
            }
            // // thx stackoverflow :*
            // // https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
            let fixedData = [newElement].concat(lastData)
            return {
                ...state,
                data:[newElement, ...data],
                isLoading:false
            }
        case 'ADD_NEXT_PAGE_PENDING':
            return{
                ...state,
                isLoading:true
            }
        case 'ADD_NEXT_PAGE_REJECTED':
            return{
                ...state,
                isLoading:false
            }
        case 'ADD_NEXT_PAGE_FULFILLED':
            return{
                ...state,
                data: [...state.data, ...action.payload.data.data],
                isLoading:false
            }
        case 'UPDATE_NOTE_PENDING':
            return{
                ...state,
                isLoading:true
            }
        case 'UPDATE_NOTE_REJECTED':
            return{
                ...state,
                isLoading:false
            }
        case 'UPDATE_NOTE_FULFILLED':
            let {length} = data
            for(let i=0 ; i<length ; i++){
                if(data[i].id = action.payload.id){
                    data[i].category = action.payload.category
                    data[i].note = action.payload.note
                    data[i].title = action.payload.title
                }
            }
            return {
                ...state,
                data:data,
                isLoading:false
            }
        case 'DELETE_NOTE':
            for(let i = 0 ; i<data.length ; i++){
                if(data[i].id == action.payload.id){
                    data.splice(i,1)
                    i--
                }
            }
            return {
                ...state,
                data:data,
                isLoading:false
            }
        case 'SORTING_DATA_PENDING':
            return{
                ...state,
                isLoading:true
            }
        case 'SORTING_DATA_REJECTED':
            return{
                ...state,
                isLoading:false
            }
        case 'SORTING_DATA_FULFILLED':
            return{
                ...state,
                data: action.payload.data.data,
                sort:action.payload.data.sort,
                isLoading:false
            }
        case 'SEARCH_NOTE_PENDING':
            return{
                ...state,
                isLoading:true
            }
        case 'SEARCH_NOTE_REJECTED':
                return{
                    ...state,
                    isLoading:false
                }
        case 'SEARCH_NOTE_FULFILLED':
            console.log('Hasil search:', action.payload.data)
            return{
                ...state,
                searchResult: action.payload.data.data,
                isLoading:false
            }
        // case 'INC_NUMBER':
        //     return {number: action.payload}
        // case 'DEC_NUMBER':
        //     return {number: action.payload}
        default:
            return state
    }
}