import Link from "next/link";

export default function Links() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/foo">Foo</Link>
      <Link href="/bar">Bar</Link>
      <Link href="/ssr">SSR</Link>
      <Link href="/ssg">SSG</Link>
    </>
  );
}
