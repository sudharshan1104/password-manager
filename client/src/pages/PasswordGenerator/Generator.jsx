import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClipboardOutline } from "react-icons/io5";
import "../../styles/Forms/Generator.css";
// import { VaultNavbar } from "../../components";

const Generator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(14);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const characters = {
    numbers: "0123456789",
    upperCaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCaseLetters: "abcdefghijklmnopqrstuvwxyz",
    specialCharacters: `!'^+%&/()=?_#${[]}|;:>÷<.*-@`,
  };

  const handleGeneratePassword = (e) => {
    e.preventDefault();

    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("You must Select atleast one option", true);
    }
    let characterList = "";

    if (includeLowercase) {
      characterList = characterList + characters.lowerCaseLetters;
    }

    if (includeUppercase) {
      characterList = characterList + characters.upperCaseLetters;
    }

    if (includeNumbers) {
      characterList = characterList + characters.numbers;
    }

    if (includeSymbols) {
      characterList = characterList + characters.specialCharacters;
    }

    setPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleCopyPassword = async (copyMe) => {
    if (password === "") {
      notify("Field is empty", true);
    } else {
      await navigator.clipboard.writeText(copyMe);
      toast.success("Saved to Clip-Board", {
        autoClose: 2000,
        position: "top-center",
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      {/* <VaultNavbar /> */}
      <section className="generator__container">
        <div className="generator__wrapper">
          <h4 className="form__heading">Password Generator</h4>
          <form className="generator__form" onSubmit={handleGeneratePassword}>
            <div>
              <input
                id="password__field"
                style={{ display: "inline" }}
                defaultValue={password}
                disabled
                type="text"
              />
              <IoClipboardOutline
                className="clipboard"
                onClick={() => {
                  handleCopyPassword(password);
                }}
              />
            </div>
            <div>
              <label>Length:</label>
              <input
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                type="number"
                id="password-strength"
                name="password-strength"
                max="25"
                min="10"
              />
            </div>
            <div>
              <label>Uppercase</label>
              <input
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                type="checkbox"
                id="uppercase-letters"
                name="uppercase-letters"
              />
            </div>
            <div>
              <label>Lowercase</label>
              <input
                className="box"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                type="checkbox"
                id="lowercase-letters"
                name="lowercase-letters"
              />
            </div>
            <div>
              <label>Numbers</label>
              <input
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                type="checkbox"
                id="include-numbers"
                name="include-numbers"
              />
            </div>
            <div>
              <label>Symbols</label>
              <input
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                type="checkbox"
                id="include-symbols"
                name="include-symbols"
              />
            </div>
            <button className="password-generator__button">
              Generate Password
            </button>
          </form>
          <ToastContainer position="top-bottom" autoClose={3000} />
        </div>
      </section>
    </>
  );
};

export default Generator;
