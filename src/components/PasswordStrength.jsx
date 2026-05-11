import { passwordStrengthCheck } from "../utils/passwordStrength";

import "../styles/password-strength.css";

export default function PasswordStrength({ password })
{
    const score = passwordStrengthCheck(password);

    return (
        <div className="password-strength-container">
            {/* Container for the bar AND message ^^ */}
            <div className="password-strength-bar">
                {/* Container for the full bar */}
                <div className="password-variable-bar" style={{width: `${(score.score + 1) * 20}%`, backgroundColor: score.colour}}>
                    {/* Variable length bar according to password strength */}
                </div>
            </div>
            <p className="password-strength-message">{score.readable}</p>
            {/* User message */}
        </div>
    );
}