import zxcvbn from "zxcvbn";

export function passwordStrengthCheck(password)
{
    const strengthColour = ["#DC2626", "#F97316", "#FACC15", "#4ADE80", "#16A34A"];
    const message = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];

    const score = zxcvbn(password).score;

    const res = {score: score,
                 colour: strengthColour[score],
                 readable: message[score]};

    return res;
}