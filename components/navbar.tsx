import Link from "next/link";

export default function Navbar(){
    return(<>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand link">Noted</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link href="/todo" className="nav-link">Todo</Link></li>

                        <li className="nav-item"><Link href="/notes" className="nav-link">Notes</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
}