import { useEffect, useState } from "react";
import Spinner from "../reusable/Sinner/spinner";
import c from "./style.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailErrorShown, setIsEmailErrorShown] = useState(false);
  const [isEmailShaking, setIsEmailShaking] = useState(false);

  const renderEmailError = (email: string) => {
    if (!email) {
      return "Введите адрес email";
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return "Укажите корректный адрес email";
    }
    return "";
  };

  useEffect(() => {
    setEmailError(renderEmailError(email));
  }, [email]);

  const shakeEmail = () => {
    setIsEmailShaking(true);
    setIsEmailErrorShown(true);
    setTimeout(() => setIsEmailShaking(false), 500);
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordErrorShown, setIsPasswordErrorShown] = useState(false);
  const [isPasswordShaking, setIsPasswordShaking] = useState(false);

  const renderPasswordError = (password: string) => {
    if (!password) {
      return "Введите пароль";
    }
    if (password.length < 8) {
      return "Пароль не может быть меньше 8 символов";
    }
    return "";
  };

  useEffect(() => {
    setPasswordError(renderPasswordError(password));
  }, [password]);

  const shakePassword = () => {
    setIsPasswordErrorShown(true);
    setIsPasswordShaking(true);
    setTimeout(() => setIsPasswordShaking(false), 500);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const emailError = renderEmailError(email);
    const passwordError = renderPasswordError(password);

    if (emailError) shakeEmail();
    if (passwordError) shakePassword();
    if (passwordError || emailError) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <div className={c.wrapper}>
      <div className={c.login_box}>
        {isSubmitting && (
          <div className={c.loading}>
            <Spinner size={30} />
          </div>
        )}

        <h2 className={c.header}>Вход</h2>
        <p className={c.subheader}>Для существующих пользователей</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div
            className={`
            ${c.input_container} 
            ${isEmailShaking ? c.shaking : ""}
            `}
          >
            <label htmlFor="email">
              E-mail: <span>*</span>
            </label>
            <input
              disabled={isSubmitting}
              className={emailError && isEmailErrorShown ? c.error : ""}
              name="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setIsEmailErrorShown(true)}
            />
            <p className={c.hint}>{isEmailErrorShown && emailError}</p>
          </div>
          <div
            className={`
            ${c.input_container} 
            ${isPasswordShaking ? c.shaking : ""}
            `}
          >
            <label htmlFor="password">
              Пароль: <span>*</span>
            </label>
            <input
              disabled={isSubmitting}
              className={passwordError && isPasswordErrorShown ? c.error : ""}
              name="password"
              id="password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setIsPasswordErrorShown(true)}
            />
            <p className={c.hint}>{isPasswordErrorShown && passwordError}</p>
          </div>
          <button disabled={isSubmitting} className={c.submit} type="submit">
            Войти в систему
          </button>
        </form>
      </div>
    </div>
  );
};
