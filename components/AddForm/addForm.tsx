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
      data-column-count={columnConfig.length + 1}
    >
      {columnConfig?.map((element: any) => (
        element.inputType ? (
          <span
            className={styles.inputWrapper}
            key={element.key}
          >
            <label htmlFor={`${element.key}`} className="sr-only">{element.label}</label>
            <input
              id={`${element.key}`}
              name={element.key}
              type={element.inputType === "number" ? "number" : "text"}
              className={styles.textInputPrimary}
              placeholder={element.label}
            />
          </span>
        ) : (
          <span key={element.key} aria-hidden="true" />
        )
      ))}
      <span className={styles.actionsCol}>
        <button type="submit">Save</button>
      </span>
    </form>
  );
}
