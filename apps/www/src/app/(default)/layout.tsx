import DefaultFooter from "@/components/footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
      <DefaultFooter />
    </main>
  )
}
