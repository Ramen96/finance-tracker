import styles from "./addForm.module.scss";

type AddFormPropTypes = {
  columnConfig: any;
}

export default function AddForm({
  columnConfig
}: AddFormPropTypes) {

  return (
    <form
      className={styles.tableRow}
      data-column-count={columnConfig.filter((e: any) => e.inputType).length + 1}
    >
      {columnConfig?.map((element: any) => (
        element.inputType && (
          <span
            key={element.key}
            data-table-grid={columnConfig.length}
          >
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
      <span className={styles.actionsCol}>
        <button type="submit">Save</button>
      </span>
    </form>
  );
}
