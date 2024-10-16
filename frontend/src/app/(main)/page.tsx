import { Cart } from "./components/Cart";
import Main from "./components/Main";
import { Menu } from "./components/Menu";
import { Order } from "./components/Order";

export default function Home() {
  return (
    <>
      <Main />
      <Order />
      {/* <Cart /> */}
      <Menu/>
    </>
  );
}
