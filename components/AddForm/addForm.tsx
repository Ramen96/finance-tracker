import styles from "./addForm.module.scss";

type AddFormPropTypes = {
  columnConfig: any;
}

export default function AddForm({
  columnConfig
}: AddFormPropTypes) {

  return (
    <div
      className={styles.tableRow}
      data-column-count={1}
    >
      <form>
        {columnConfig?.map((element: any) => (
          element.inputType && (
            <span key={element.key}>
              <label htmlFor={`${element.key}`} className="sr-only">{ }</label>
              <input
                id={`${element.key}`}
                name="input"
                type={element.inputType === "number" ? "number" : "text"}
                className={`${styles.textInputPrimary} ${styles.withIcon}`}
                placeholder={`${element.label}`}
              />
            </span>
          )
        ))}
      </form>
    </div>
  );
}
