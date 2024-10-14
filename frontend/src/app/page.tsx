
import { Order } from "./components/Order";
import { Cart } from "./components/Cart";
import { Address } from "./components/Address";
import { Orderhistory } from "./components/Orderhistory";

export default function Home() {
  return <main className="">
    <Order />
    <Cart />
    <div className="flex">
      <Address />
      <Orderhistory />
    </div>
  </main>;
}
