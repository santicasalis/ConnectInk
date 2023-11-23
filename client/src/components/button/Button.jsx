import Link from "next/link";

const Button = ({ link, text, className }) => {
    return (
        <Link href={link}>
            <button className={className}>
                {text}
            </button>
        </Link>
    );
};

export default Button;