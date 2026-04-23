import s from "./index.module.css";

const Accounts = () => {
  return (
    <div className={s.accountsList}>
      <div className={s.accountItem}>
        <div className={s.accountInfo}>
          <div className={s.accountIcon} style={{ backgroundColor: "#4361ee" }}>
            <i className="fas fa-credit-card"></i>
          </div>
          <div className={s.accountDetails}>
            <h4>Тинькофф Black</h4>
            <p>•••• 4512</p>
          </div>
        </div>
        <div className={s.accountBalance}>124,500 ₽</div>
      </div>

      <div className={s.accountItem}>
        <div className={s.accountInfo}>
          <div className={s.accountIcon} style={{ backgroundColor: "#28a745" }}>
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className={s.accountDetails}>
            <h4>Наличные</h4>
            <p>Наличные деньги</p>
          </div>
        </div>
        <div className={s.accountBalance}>15,350 ₽</div>
      </div>

      <div className={s.accountItem}>
        <div className={s.accountInfo}>
          <div className={s.accountIcon} style={{ backgroundColor: "#f8961e" }}>
            <i className="fas fa-piggy-bank"></i>
          </div>
          <div className={s.accountDetails}>
            <h4>Сбережения</h4>
            <p>Накопительный счет</p>
          </div>
        </div>
        <div className={s.accountBalance}>105,000 ₽</div>
      </div>

      <div className={s.accountItem}>
        <div className={s.accountInfo}>
          <div className={s.accountIcon} style={{ backgroundColor: "#f72585" }}>
            <i className="fas fa-university"></i>
          </div>
          <div className={s.accountDetails}>
            <h4>Сбербанк</h4>
            <p>•••• 8891</p>
          </div>
        </div>
        <div className={s.accountBalance}>32,000 ₽</div>
      </div>
    </div>
  );
};

export default Accounts;
