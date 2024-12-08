import React from "react";

interface ITitleProps {
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
}

/**
 * Title component renders a heading element with a specified size and title.
 *
 * @param {ITitleProps} props - The properties for the Title component.
 * @param {string} props.size - The size of the heading element, which determines the HTML tag (e.g., h1, h2).
 * @param {string} [props.className] - Optional additional CSS classes to apply to the heading element.
 * @param {React.Ref<HTMLHeadingElement>} [props.ref] - Optional ref to assign to the heading element.
 *
 * @returns {JSX.Element} The rendered heading element.
 */
function Title(
  { size: As, className = "", children }: Readonly<ITitleProps>,
  ref: React.Ref<HTMLHeadingElement>
) {
  return (
    <As ref={ref} className={`heading-${As} ${className}`.trim()}>
      {children}
    </As>
  );
}

export default React.forwardRef(Title);
