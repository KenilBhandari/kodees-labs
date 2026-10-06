'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './orange-logo.module.css'

/* eslint-disable @next/next/no-img-element -- static SVGs, next/image adds nothing */

// Intro timings mirror the CSS: EXPAND_MS must match the .slider transition.
const INTRO_DELAY = 500
const EXPAND_MS = 300
const HOLD_MS = 1000

export default function OrangeLogo() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()
  const timers = useRef<number[]>([])

  const clearIntro = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timers.current = [
      window.setTimeout(() => setOpen(true), INTRO_DELAY),
      window.setTimeout(() => setOpen(false), INTRO_DELAY + EXPAND_MS + HOLD_MS),
    ]
    return clearIntro
  }, [pathname])

  return (
    <Link
      ref={ref}
      href="/"
      className={styles.logo}
      data-open={open}
      aria-label="Orange ERP home"
      title="Orange ERP"
      draggable={false}
    >
      <img
        src="/logo/1-orange-fruit.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className={styles.fruit}
      />
      <span className={styles.slider} aria-hidden={!open}>
        <span className={styles.clip}>
          <img
            src="/logo/2-orange-text.svg"
            alt=""
            draggable={false}
            className={styles.word}
          />
        </span>
      </span>
      <img
        src="/logo/3-erp-text.svg"
        alt="ERP"
        draggable={false}
        className={styles.erp}
      />
    </Link>
  )
}