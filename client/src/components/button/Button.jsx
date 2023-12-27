import Link from "next/link";

const Button = ({ link, text, className }) => {
    return (
        <Link href={link}>
            <span className={className}>
                {text}
            </span>
        </Link>
    );
};

export default Button;