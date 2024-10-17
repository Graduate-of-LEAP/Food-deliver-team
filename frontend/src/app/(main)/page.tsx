import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Main from "./components/Main";
import { Order } from "./components/Order";
import { UserProfile } from "./components/UserProfile";
import { UserProfileRegister } from "./components/UserProfileRegister";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Order />
      <Footer />
      <UserProfile />
      <UserProfileRegister />
      {/* <Cart /> */}
    </>
  );
}
