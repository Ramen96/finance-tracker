import styles from "./addForm.module.scss";

type AddFormPropTypes = {
  columnConfig: any;
  onSubmit: (data: Record<string, string | number>) => void;
  onCancel: () => void;
}

export default function AddForm({
  columnConfig,
  onSubmit,
  onCancel
}: AddFormPropTypes) {

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string | number> = {};

    columnConfig.forEach((col: any) => {
      if (col.inputType) {
        const value = formData.get(col.key);
        data[col.key] = col.inputType === "number"
          ? Number(value)
          : String(value);
      }
    });
    onSubmit(data);
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
