import { Cart } from "./components/Cart";
import { Header } from "./components/Header";
import Main from "./components/Main";
import { Order } from "./components/Order";
import { UserProfile } from "./components/UserProfile";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Order />

      <UserProfile />
      {/* <Cart /> */}
    </>
  );
}
