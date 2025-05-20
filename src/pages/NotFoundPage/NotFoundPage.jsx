import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className={styles.NotFoundPage}>
      <Link to="/">Return Home Page</Link>
    </div>
  );
}
export default NotFoundPage;
