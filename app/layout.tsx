export const metadata = {
  title: 'Chat Application',
  description: 'Interactive chat with AI, admin, and users',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>{children}</body>
    </html>
  )
}
