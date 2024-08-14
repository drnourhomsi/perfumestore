import { ProductsProvider } from "@/context/ProductProvider";

function ContextProviders({ children }) {
  return (
        <ProductsProvider>
            { children }
        </ProductsProvider>
  )
}

export default ContextProviders