export function getConfidenceClass(score)
{
    if (score <= 25)
    {
        return {result: "Low Risk", colour: "#16A34A"}
    };

    if (score <= 75)
    {
        return {result: "Moderate Risk", colour: "#f59e0b"}
    };

    return {result: "High Risk", colour: "#DC2626"};
}