import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Layout from './layout/Layout'
import { ThemeProvider } from './providers/ThemeProvider'

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <AppRoutes />
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
