import React, { useState } from "react";
import "../index.scss";
import { useForm } from "react-hook-form";
import { emailRegister, passwordRegister } from "../Login/Login";
import { api } from "../../../utils/api";
import Link from "antd/es/typography/Link";

export const ResetPass = () => {
  const [haveToken, setHaveToken] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const sendData = async (data) => {
    console.log({ data });

    if (data.token) {
      try {
        const res = await api.resetPassWithToken(data.token, {
          password: data.password,
        });
        localStorage.setItem("token", res.token);
      } catch (error) {
        alert("Ошибка");
      }
    } else {
      try {
        const res = await api.resetPass(data);
        console.log(res);
        setHaveToken(true);
      } catch (error) {
        alert("Ошибка!");
      }
    }
  };

  return (
    <>
      <div className="incontent">
        <h3>Восстановление пароля</h3>
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
          {haveToken ? (
            <>
              <div>
                <input
                  className="form__input"
                  type="text"
                  {...register("token", { ...emailRegister })}
                  placeholder="token"
                />
                {errors?.token && <span> {errors?.token.message}</span>}
              </div>
              <div>
                <input
                  className="form__input"
                  type="password"
                  {...register("password", { ...passwordRegister })}
                  placeholder="password"
                />
                {errors?.password && <span> {errors?.password.message}</span>}
              </div>
            </>
          ) : (
            <></>
          )}
          <div>
            <Link to={"/login"}>Я вспомнил пароль</Link>
          </div>
          <button type="submit"> Восстановить пароль</button>
        </form>
      </div>
    </>
  );
};
