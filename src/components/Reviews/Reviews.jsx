

import React, { useContext, useState } from "react";
import { Rating } from "../Rating/Rating";
import { BaseButton } from "../Button/Button";

import s from './index.module.scss'
import { useForm } from "react-hook-form";
import { ReactComponent as Basket } from '../../assets/img/basket.svg'
import { CardsContext } from "../../context/cardContext";

const timeOptions = {
    day: 'numeric',
    month: 'short', year: "numeric"
}


export const Reviews = ({ onSendReview, reviews, onDeleteReview }) => {
    const [showForm, setShowForm] = useState(true);
    const [rate, setRate] = useState(3);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" });

    const { user } = useContext(CardsContext);



    const reviewRegister = {
        required: {
            value: true,
            message: "Обязательное поле для заполнения"
        }
    }

    const onSendFromReview = ({text}) => {
        onSendReview({ text, rating: rate });
        reset();
        setShowForm(false)
    }


    return (<>

        <div className={s.reviews}>
            <div className={s.reviews__controls}>
            <span className={s.price}>Отзывы</span>
            <BaseButton onClick={() => setShowForm(true)}>Оставить отзыв</BaseButton>
            </div>

            {showForm &&
                <form className={s.reviews__form} onSubmit={handleSubmit(onSendFromReview)} >
                    <Rating rating={rate} setRate={setRate} isEditable={true} />
                    <textarea  {...register("text", reviewRegister)} type="text" placeholder="Оставьте ваш отзыв" className="form__input" />
                    <button type="submit" className='btn btn_type_primary' >Send</button>
                </form>}

            <div className={s.reviews__list}>
                <div className={s.reviews__hr} />
                {reviews
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                    .map((e) =>
                        <div key={e._id}>
                            <div className={s.reviews__item} >
                                <div className={s.reviews__author}>
                                    <span> {e.author.name}</span>
                                    <span className={s.reviews__date}> {new Date(e.created_at).toLocaleString('ru-RU', timeOptions)}</span>
                                    {user?._id === e.author._id &&
                                        <Basket onClick={() => onDeleteReview(e._id)} className={s.reviews__basket} />
                                    }
                                </div>
                                <div className={s.rate}>
                                    <Rating rating={e.rating} />
                                </div>
                                <div className={s.text}>{e.text}</div>
                            </div>
                            <div className={s.reviews__hr} /></div>
                    )}
            </div>

        </div>
    </>)
}

