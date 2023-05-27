import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { Link } from "react-router-dom";

export const RegistrationForm = ({ isRequired = true }) => {
  const [type, setType] = useState(true);
  const [tags, setTags] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const sendData = (data) => {
    const newData = data.tags.split(" ");
    const sendedData = { ...data, tags: data.tags.split(" ") }({ data });
  };

  const nameRegister = {
    required: {
      value: isRequired,
      message: "Имя тоже обязательно!",
    },
    maxLength: { value: 4, message: "4 is max" },
    minLength: { value: 2, message: "2 is min" },
  };
  const emailRegister = { required: "Имя тоже обязательно!" };
  const passwordRegister = {
    required: {
      value: isRequired,
      message: "pass is required!",
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message:
        "Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру",
    },
  };

  return (
    <div className="incontent">
      <h3>Registration form</h3>
      <form className=" form-example" onSubmit={handleSubmit(sendData)}>
        <div>
          <input
            className="form__input"
            type="text"
            {...register("name", nameRegister)}
            placeholder="name"
          />
          {errors?.name && <span> {errors?.name.message}</span>}
        </div>
        <div>
          <input
            className="form__input"
            type="text"
            {...register("email", { ...emailRegister })}
            placeholder="email"
          />
          {errors?.email && <span> {errors?.email.message}</span>}
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
          <Link to={"/login"}>Авторизация</Link>
        </div>
        <label htmlFor="tags">Введите теги через запятую / слеш / пробел</label>

        <button type="submit"> submit</button>
      </form>
    </div>
  );
};
