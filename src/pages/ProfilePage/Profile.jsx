/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, updateUser } from "../../storage/slices/userSlice";
import "./style.scss";
import { BaseButton } from "../../components/Button/Button";
import { useForm } from "react-hook-form";

export const ProfilePage = ({ setModalActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, loading } = useSelector((s) => s.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    dispatch(getMyUser("dataFromUp here"));
  }, [dispatch]);

  const sendData = (data) => {
    dispatch(updateUser(data));
    reset();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setModalActive(true);
    navigate("/login");
  };

  return (
    <>
      {loading || !user._id ? (
        "loading"
      ) : (
        <div className="profile">
          <div>
            <form className=" form-example" onSubmit={handleSubmit(sendData)}>
              <div>
                <input
                  className="form__input"
                  type="text"
                  {...register("name")}
                  placeholder="name"
                  defaultValue={user.name}
                />
              </div>
              <div className="form__pass">
                <input
                  className="form__input"
                  type="text"
                  {...register("about")}
                  placeholder="about me"
                  defaultValue={user.about}
                />
              </div>

              <BaseButton type="submit">Send</BaseButton>
            </form>
          </div>
          <div>
            <form className=" form-example" onSubmit={handleSubmit(sendData)}>
              <img
                src={user?.avatar}
                className="profile__avatar"
                alt="this is avatar"
              />
              <div>
                <input
                  className="form__input"
                  type="text"
                  {...register("avatar")}
                  placeholder="avatar"
                />
              </div>
              <BaseButton type="submit">Send</BaseButton>
            </form>
            <BaseButton onClick={logout}>Logout</BaseButton>
          </div>
        </div>
      )}
    </>
  );
};
