import { Plus, Edit2, Trash2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import styles from "./dataTable.module.scss";

// ============================================================================
// TYPES
// ============================================================================

type ColumnConfig<DataItem, K extends keyof DataItem = keyof DataItem> = {
  key: K;
  label: string;
  className?: string;
  format: (value: DataItem[K]) => string | number;
};

type Category<DataItem> = {
  name: string;
  icon: LucideIcon;
  items: DataItem[];
};

type DataTableProps<DataItem> = {
  categories: Category<DataItem>[];
  columns: ColumnConfig<DataItem, keyof DataItem>[];
  onAdd?: (categoryName: string) => void;
  onEdit?: (item: DataItem) => void;
  onDelete?: (item: DataItem) => void;
  totalKey?: keyof DataItem;
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function DataTable<DataItem extends { id: number | string }>({
  categories,
  columns,
  onAdd,
  onEdit,
  onDelete,
  totalKey,
}: DataTableProps<DataItem>) {

  const calculateCategoryTotal = (items: DataItem[]) => {
    if (!totalKey) return null;
    return items.reduce((sum, item) => sum + (Number(item[totalKey]) || 0), 0);
  };

  return (
    <section className={styles.categoriesGrid}>
      {categories.map((category) => {
        const IconComponent = category.icon;
        const categoryTotal = calculateCategoryTotal(category.items);

        return (
          <section key={category.name} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <IconComponent className={styles.categoryIcon} size={24} />
              <h2>{category.name}</h2>
            </div>

            {onAdd && (
              <button
                className={styles.addBtn}
                onClick={() => onAdd(category.name)}
              >
                <Plus size={18} />
                Add {category.name}
              </button>
            )}

            <div className={styles.dataTable}>
              {/* Dynamic Table Header - Desktop only */}
              <div
                className={styles.tableHeader}
                data-column-count={columns.length + 1}
              >
                {columns.map((col) => (
                  <span
                    key={String(col.key)}
                    className={col.className || styles[`${String(col.key)}Col`]}
                  >
                    {col.label}
                  </span>
                ))}
                <span className={styles.actionsCol}>Actions</span>
              </div>

              {/* Dynamic Table Body */}
              <div className={styles.tableBody}>
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className={styles.tableRow}
                    data-column-count={columns.length + 1}
                  >
                    {columns.map((col) => (
                      <span
                        key={String(col.key)}
                        className={col.className || styles[`${String(col.key)}Col`]}
                        data-label={col.label}
                      >
                        {col.format(item[col.key])}
                      </span>
                    ))}
                    <span className={styles.actionsCol}>
                      {onEdit && (
                        <button
                          className={styles.editBtn}
                          onClick={() => onEdit(item)}
                          aria-label="Edit item"
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className={styles.deleteBtn}
                          onClick={() => onDelete(item)}
                          aria-label="Delete item"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Category Total */}
              {categoryTotal !== null && (
                <div className={styles.categoryTotal}>
                  <span className={styles.totalLabel}>Category Total:</span>
                  <span className={styles.totalAmount}>
                    ${categoryTotal.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </section>
  );
}
