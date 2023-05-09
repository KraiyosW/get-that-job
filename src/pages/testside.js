import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MyComponent() {
    const router = useRouter();

    return (
        <ul>
            <li>
                <Link href="/find-that-job">
                    <button className={`block py-2 px-4 ${router.pathname === '/find-that-job' ? 'bg-white' : 'bg-black'}`}>Page 1</button>
                </Link>
            </li>
            <li>
                <Link href="/applications">
                    <button className={`block py-2 px-4 ${router.pathname === '/applications' ? 'bg-white' : 'bg-black'}`}>Page 2</button>
                </Link>
            </li>
            <li>
                <Link href="/testside">
                    <button className={`block py-2 px-4 ${router.pathname === '/testside' ? 'bg-white' : 'bg-black'}`}>Page 3</button>
                </Link>
            </li>
        </ul>
    );
}
