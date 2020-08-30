import React from 'react'

export const ExclamationSvg = ({
  fill = 'CurrentColor',
  width = '16px',
  height = '16px',
}) => {
  return (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="https://www.w3.org/2000/svg"
      {...{ fill, width, height }}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  )
}