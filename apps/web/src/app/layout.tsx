export const metadata = {
  title: 'Next.js with Bazel',
  description: 'A Next.js app built with Bazel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 