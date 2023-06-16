import { useState } from "react";

export const BaseInput = ({ type, name }) => {
    const [showEye, setShowEye] = useState(true);
    return (
        <>
            {type === "password" ? (
                <div>
                    <input type={type} />
                    <span onClick={() => setShowEye(!showEye)}>eye</span>
                </div>
            ) : (
                <div>
                    <input type={type} name={name} />
                </div>
            )}
        </>
    );
};
