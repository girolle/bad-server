import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@types'
import { IBasket } from '@types'

const initialState: IBasket = {
    items: [],
    totalCount: 0,
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addProductCart: (state, { payload }: PayloadAction<IProduct>) => {
            const itemInCart = state.items.find(
                (item) => item._id === payload._id
            ) //undefined or product
            if (itemInCart) {
                return state
            } else {
                state.items.push(payload)
            }
            state.totalCount++
        },
        removeProductCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => {
                return item._id !== action.payload
            })
        },
        resetBasket: () => initialState,
    },
    selectors: {
        selectBasketItems: (state: IBasket) => state.items,
        selectBasketTotalCount: (state: IBasket) => state.totalCount,
    },
})
