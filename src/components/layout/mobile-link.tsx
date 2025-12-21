"use client"

import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type MobileLinkProps = LinkProps & {
  children: React.ReactNode
  className?: string
}

export function MobileLink({
  href,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(className)}
        onClick={() => {
          router.push(href.toString())
        }}
        {...props}
      >
        {children}
      </Link>
    </SheetClose>
  )
}
