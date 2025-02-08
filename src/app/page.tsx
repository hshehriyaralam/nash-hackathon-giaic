

import Header from "./Components/Header/Header";
import ProductCards from "./Components/Products/page";
import Footer from "./Components/Footer/Footer";


export default function Home() {
  return (
   <div  className="w-full h-screen bg-white">
    <Header />
    <ProductCards />
    <Footer />
   </div>
  );
}
