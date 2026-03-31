import styles from "./addForm.module.scss";

type AddFormPropTypes = {
  columnConfig: any;
}

export default function AddForm({ columnConfig }: AddFormPropTypes) {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        {columnConfig?.map((element: any) => (
          element.inputType && (
            <div className={styles.field} key={element.key}>
              <label htmlFor={element.key} className={styles.label}>
                {element.label}
              </label>
              <input
                id={element.key}
                name={element.key}
                type={element.inputType === "number" ? "number" : "text"}
                className={styles.input}
                placeholder={element.label}
              />
            </div>
          )
        ))}
        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
}
