import React, { useState } from "react";

import { useForm } from "react-hook-form";
import "../index.scss";
import { Link } from "react-router-dom";
import { api } from "../../../utils/api";
import { BaseButton } from "../../Button/Button";
import { emailRegister, passwordRegister } from "../Login/Login";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../Notification/Notification";
export const RegisterForm = () => {
  const [type, setType] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const sendData = async (data) => {
    try {
      await api.signup(data);
      openNotification("success", "Вы успешно зарегистрированы!");
      navigate("/login");
    } catch (error) {
      openNotification("success", `Ошибка: ${error.message}`);
    }
  };

  return (
    <div className="incontent">
      <h3>Регистрация</h3>
      <form className=" form-example" onSubmit={handleSubmit(sendData)}>
        <div>
          <input
            className="form__input"
            type="text"
            {...register("email", { ...emailRegister })}
            placeholder="email"
          />
          {errors?.email && <span> {errors?.email.message}</span>}
        </div>
        <div>
          <input
            className="form__input"
            type="number"
            {...register("group")}
            placeholder="group"
          />
          {errors?.group && <span> {errors?.group.message}</span>}
        </div>
        <div className="form__pass">
          <input
            className="form__input"
            type={!type ? "password" : "text"}
            {...register("password", { ...passwordRegister })}
            placeholder="password"
          />
          <span onClick={() => setType(!type)} className={`form__pass__icon`}>
            {type ? "0" : "X"}
          </span>
          {errors?.password && <span> {errors?.password.message}</span>}
        </div>
        <div>
          <Link to={"/login"}>Я уже зарегистрирован</Link>
        </div>
        <BaseButton type="submit"> Зарегистрироваться </BaseButton>
      </form>
    </div>
  );
};
