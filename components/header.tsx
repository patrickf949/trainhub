import Link from "next/link";

export default function Heading({ name, link, button }: { name: string, link: string, button:string }) {
    return (
        <div className="row">
            <div className="col"> <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;{name}</p>
            </div>
            <div className="col">
                <Link href={link}>
                    <button
                        className='btn btn-sm btn-outline-primary float-end'>
                        {button}
                    </button>
                </Link>
            </div>
        </div>
    );
}