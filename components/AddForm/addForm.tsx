import styles from "./addForm.module.scss";

export default function AddForm() {
  return (
    <div
      className={styles.tableRow}
      data-column-count={1}
    >
      <form>
        <label htmlFor={"1"} className="sr-only">{ }</label>
        <input
          id="1"
          name="input"
          type="text"
          className={`${styles.textInputPrimary} ${styles.withIcon}`}
          placeholder="Item Name"
        />
      </form>
    </div>
  )
}
