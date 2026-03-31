import { useState, useCallback } from 'react';
import styles from './Table.module.css';

/** Describes a single table column */
export interface TableColumn {
  /** Unique key for this column; corresponds to a data field */
  key: string;
  /** Display label for the column header */
  label: string;
  /** Whether this column is sortable */
  sortable?: boolean;
}

/** Sort direction */
export type SortDirection = 'asc' | 'desc';

/** Props for the Table component */
export interface TableProps {
  /** Column definitions */
  columns: TableColumn[];
  /** Array of row data objects */
  data: Record<string, unknown>[];
  /** Show loading skeleton rows */
  loading?: boolean;
  /** Enable striped row backgrounds */
  striped?: boolean;
}

/**
 * Table — A data table with sortable columns, striped rows, loading skeleton,
 * and responsive horizontal scroll on overflow.
 */
export const Table = ({
  columns,
  data,
  loading = false,
  striped = false,
}: TableProps) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
    },
    [sortKey]
  );

  const sortedData = (() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null || bVal == null) return 0;

      const aStr = String(aVal);
      const bStr = String(bVal);

      const comparison = aStr.localeCompare(bStr, undefined, { numeric: true });
      return sortDir === 'asc' ? comparison : -comparison;
    });
  })();

  const renderSortIndicator = (column: TableColumn) => {
    if (!column.sortable) return null;

    const isActive = sortKey === column.key;
    const indicatorClass = [
      styles.sortIndicator,
      isActive ? styles['sortIndicator--active'] : '',
    ]
      .filter(Boolean)
      .join(' ');

    const symbol = isActive ? (sortDir === 'asc' ? '▲' : '▼') : '⇅';

    return (
      <span className={indicatorClass} aria-hidden="true">
        {symbol}
      </span>
    );
  };

  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table} role="grid">
        <thead>
          <tr>
            {columns.map((col) => {
              const headerClass = [
                styles.headerCell,
                col.sortable ? styles['headerCell--sortable'] : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <th
                  key={col.key}
                  className={headerClass}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {col.label}
                  {renderSortIndicator(col)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading
            ? skeletonRows.map((i) => (
                <tr key={`skeleton-${i}`} className={styles.row}>
                  {columns.map((col) => (
                    <td key={col.key} className={styles.cell}>
                      <div
                        className={styles.skeleton}
                        style={{ width: `${60 + Math.random() * 30}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            : sortedData.map((row, rowIndex) => {
                const rowClassNames = [
                  styles.row,
                  striped ? styles['row--striped'] : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <tr key={rowIndex} className={rowClassNames}>
                    {columns.map((col) => (
                      <td key={col.key} className={styles.cell}>
                        {row[col.key] != null ? String(row[col.key]) : ''}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};
