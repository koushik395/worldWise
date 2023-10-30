import styles from "./CountryItem.module.css";
import Emoji from "./Emoji";
function CountryItem({ country }) {
  console.log(country);
  return (
    <li className={styles.countryItem}>
      <span>
        <Emoji flag={country.emoji} />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
