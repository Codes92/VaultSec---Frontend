import { useState } from "react";
import { passwordGenerator } from "../utils/passwordGenerator";
import { clipboard } from "../utils/clipboard";

import "../styles/password-generator.css"

export default function PasswordGenerator({ onUsePassword })
{
    // Store length of password
    const [length, setLength] = useState(16);
    // Store charTypes to be used in password generation
    const [charTypes, setCharTypes] = useState({lowercase: true, uppercase: true, digit: true, special: false});
    // Generated password
    const [passwordString, setPasswordString] = useState(() => passwordGenerator(16, {lowercase: true, uppercase: true, digit: true, special: false}));

    const [copied, setCopied] = useState(false);    

    return (
        <div className="password-generator-container">
            <p className="password-generator-title">Generate a random password</p>
            <div className="slider-container">
                <input type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
                <span className="slider-value">{length}</span>
            </div>
            
            <div className="password-checkbox-container">
                <div className="char-checkbox">
                    <input type="checkbox" 
                        id="lowercase"
                        checked={charTypes.lowercase}
                        onChange={() => setCharTypes({...charTypes, lowercase: !charTypes.lowercase})} />
                    <label htmlFor="lowercase">Lowercase Characters</label>
                </div>
                <div className="char-checkbox">
                    <input type="checkbox" 
                        id="uppercase"
                        checked={charTypes.uppercase}
                        onChange={() => setCharTypes({...charTypes, uppercase: !charTypes.uppercase})} />
                    <label htmlFor="uppercase">Uppercase Characters</label>
                </div>
                <div className="char-checkbox">
                    <input type="checkbox" 
                        id="digit"
                        checked={charTypes.digit}
                        onChange={() => setCharTypes({...charTypes, digit: !charTypes.digit})} />
                    <label htmlFor="digit">Digits</label>
                </div>
                <div className="char-checkbox">
                    <input type="checkbox" 
                        id="special"
                        checked={charTypes.special}
                        onChange={() => setCharTypes({...charTypes, special: !charTypes.special})} />
                    <label htmlFor="special">Special Characters</label>
                </div>
            </div>
            
            <input type="text" className="input-field" readOnly value={passwordString}/>
            
            <div className="generator-buttons">
                <button className="regenerate-button" onClick={() => setPasswordString(passwordGenerator(length, charTypes))}>
                    Regenerate
                </button>
                <button className="copy-button" onClick={async () => {await clipboard(passwordString); setCopied(true); setTimeout(() => setCopied(false), 2000)}}>
                    {copied ? "Copied!" : "Copy"}
                </button>
                <button className="use-this-password-button" onClick={() => onUsePassword(passwordString)}>
                    Use Password
                </button>
            </div>
        </div>
    );
}