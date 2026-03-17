import styles from "./addForm.module.scss";

type AddFormPropTypes = {
  columnConfig: any;
}

export default function AddForm({
  columnConfig
}: AddFormPropTypes) {

  (() => {
    columnConfig.map((e: any) => (
      console.log(e.format())
    ));
  })();


  return (
    <div
      className={styles.tableRow}
      data-column-count={1}
    >
      <form>
        {columnConfig?.map((element: any) => (
          <span key={element.key}>
            <label htmlFor={"1"} className="sr-only">{ }</label>
            <input
              id={`${element.key}`}
              name="input"
              type="text"
              className={`${styles.textInputPrimary} ${styles.withIcon}`}
              placeholder={`${element.label}`}
            />
          </span>
        ))}

      </form>
    </div>
  );
}
