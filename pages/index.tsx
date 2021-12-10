import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Form from '../components/form'

export default function Home() {
  return (
    <>
    <div className="w-full max-w-xl ">
      <div className="grid place-items-center">
          <main role="main" className="w-full pt-8 items-center">
            <Form />
          </main>
      </div>
  </div>
  <footer className="text-center text-gray-500 text-xs pt-8">
      <Link href="https://github.com/mattmcw">@mattmcw</Link>
  </footer>
    </>
    )
}
