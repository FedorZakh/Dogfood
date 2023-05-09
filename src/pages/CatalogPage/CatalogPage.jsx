import React, { useContext } from 'react'
import { CardList } from "../../components/CardList/CardList"
import './index.css'
import { CardsContext } from '../../context/cardContext'
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from '../../constants/constants'

export const CatalogPage = () => {
    const getIssues = (numb) => {
        const tmp = numb % 10;
        if (!tmp || !numb) {
            return ' товаров'
        }
        if (tmp === 1) {
            return ' товар'
        }
        if (tmp > 1 && tmp < 5) {
            return ' товара'
        }

    }

    const { cards, onSort, search } = useContext(CardsContext)

    const sortedItems = [{ id: POPULAR, title: 'Популярные' }, { id: NEWEST }, { id: CHEAPEST }, { id: RATE }, { id: EXPENSIVE }, { id: SALE }];


    return (
        <>
            {search && <p className='search'> По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'}  {cards.length}{getIssues(cards.length)}</p>}
            <div className='sort-cards'>
                {sortedItems.map(e =>
                    <span className='sort-item' key={e.id} onClick={() => onSort(e.id)}>{e.id}</span>
                )}
            </div>
            <CardList cards={cards} />
        </>
    )
}