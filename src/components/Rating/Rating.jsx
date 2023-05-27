import React, { useCallback, useEffect, useState } from "react"
import s from './index.module.scss';
import { ReactComponent as Star } from './star.svg'
import cn from "classnames";

const emptyFragments = new Array(5).fill(<></>)
export const Rating = ({ rating, setRate = () => { }, isEditable = false }) => {
    const [ratingArr, setRatingArr] = useState(emptyFragments);

    const changeRating = useCallback((r) => {
        if (!isEditable) {
            return
        }
        setRate(r)
    }, [setRate, isEditable]);

    const changeDisplay = (r) => {
        if (!isEditable) {
            return
        }
        constructRating(r)
    }

    const constructRating = useCallback((rate) => {
        const updatedArray = emptyFragments.map((elem, index) =>
            <Star
                className={cn(s.star, {
                    [s.filled]: index < rate,
                    [s.editable]: isEditable
                })}
                onMouseEnter={() => changeDisplay(index + 1)}
                onMouseLeave={() => changeDisplay(rating)}
                onClick={() => changeRating(index + 1)}
            />
        )
        setRatingArr(updatedArray);
    }, [rating, isEditable]);


    useEffect(() => {
        constructRating(rating)
    }, [constructRating])

    return (<div>
        {ratingArr.map((e, i) => (
            <span key={i}>{e}</span>
        ))}
    </div>)

}