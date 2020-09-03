import dayjs from "dayjs"
import React from "react"

export const GanttHeader: React.FC<{
  columns: Date[]
}> = ({ columns, children }) => {
  const labels = columns.filter(
    e =>
      e.getDate() === 1 ||
      e.getDay() === 0 ||
      columns.indexOf(e) === 0 ||
      columns.indexOf(e) === columns.length - 1
  )
  const colSpans = labels.slice(0, -1).map((e, i) => {
    return columns.indexOf(labels[i + 1]) - columns.indexOf(e)
  })
  return (
    <thead>
      <tr>
        <th>{children}</th>
        {labels.map((e, i) => (
          <td key={e.getTime()} colSpan={colSpans[i]}>
            <span>{dayjs(e).format("(M/D)")}</span>
          </td>
        ))}
      </tr>
    </thead>
  )
}
