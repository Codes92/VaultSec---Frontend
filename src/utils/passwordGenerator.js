// charTypes is an object with boolean properties
export function passwordGenerator(length, charTypes)
{
    const lowerCase = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i)).join("");
    const upperCase = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)).join("");
    const digits = Array.from({length: 10}, (_, i) => String.fromCharCode(48 + i)).join("");
    
    const specials = Array.from({length: 15}, (_, i) => String.fromCharCode(33 + i)).join("") +
                     Array.from({length: 7}, (_, i) => String.fromCharCode(58 + i)).join("") +
                     Array.from({length: 6}, (_, i) => String.fromCharCode(91 + i)).join("") +
                     Array.from({length: 4}, (_, i) => String.fromCharCode(123 + i)).join("");
    
    let countCheck = 0;
    let includedChars = "";

    if (charTypes.lowercase === true)
    {
        countCheck += 1;
        includedChars = includedChars + lowerCase;
    }

    if (charTypes.uppercase === true)
    {
        countCheck += 1;
        includedChars = includedChars + upperCase;
    }

    if (charTypes.digit === true)
    {
        countCheck += 1;
        includedChars = includedChars + digits;
    }

    if (charTypes.special === true)
    {
        countCheck += 1;
        includedChars = includedChars + specials;
    }

    if (countCheck === 0)
    {
        return;
    }

    let generatedPassword = [];

    for (let i = 0; i < length; i++)
    {
        const randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
        const index = randomNumber % includedChars.length;
        generatedPassword[i] = includedChars[index];
    }

    return generatedPassword.join("");
}