
export const Label = ({ children, className = "" }) => (
  <label className={`text-sm font-medium text-black dark:text-white font-fancy ${className}`}>
    {children}
  </label>
);


export const Span = ({ children, className = "" }) => (
    <span className={`text-sm font-medium text-black dark:text-white font-fancy ${className}`}>
      {children}
    </span>
  );

export const Heading = ({ level = 1, children, className = "" }) => {
  const Tag = `h${level}`; // Dynamically render h1, h2, etc.
  const baseStyles = "font-bold text-black dark:text-white font-fancy ";

  const sizeStyles = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };

  return (
    <Tag className={`${baseStyles} ${sizeStyles[level] || ""} ${className}`}>
      {children}
    </Tag>
  );
};

export const Paragraph = ({ children, className = "" }) => (
  <p className={`text-base text-black dark:text-white font-fancy ${className}`}>
    {children}
  </p>
);
