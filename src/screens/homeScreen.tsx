
import { useAuth } from "@/hooks"

export function HomeScreen() {
  const { user } = useAuth()

  return (
    <div className="flex justify-center  items-center">
      { user ? user.email : 'aaa' }
    </div>
  )
}
