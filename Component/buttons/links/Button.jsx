import Link from "next/link";

function Button({ children, href, style = '' }) {
  return (
    <Link href={href}>
      <a style={{...style}}>{children}</a>
    </Link>
  );
}

export default Button;
