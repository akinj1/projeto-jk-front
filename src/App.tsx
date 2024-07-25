import { RootNavigator } from "@/navigator";
import { ThemeProvider, AuthProvider } from "@/contexts";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>  
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
