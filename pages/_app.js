import '../styles/globals.css'
import '../styles/products.css'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'
import AuthModal from '../components/AuthModal'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  )
}