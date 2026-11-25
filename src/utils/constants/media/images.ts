import LogoNombre from "@/assets/images/logos/logo-nombre.png";

// QR BRE-B oficial de la llave de la empresa. Es estático y sin monto, así que
// el cliente digita el valor en su banco. Se regeneró a partir del contenido
// exacto del QR que entregó el banco, para que quede derecho y nítido: si
// alguna vez cambia la llave, hay que pedirle el QR nuevo al banco, no editar
// este archivo.
import BreBQr from "@/assets/images/payments/breb-qr.png";

import GirlCollecting from "@/assets/images/illustrations/girl_collecting.svg";
import GirlStanding from "@/assets/images/illustrations/girl_standing.svg";
import CoffeePlant from "@/assets/images/illustrations/coffee_plant.svg";
import Bird from "@/assets/images/illustrations/bird.svg";
import CoffeeGrains from "@/assets/images/illustrations/coffee_grains.svg";
import FlowerOne from "@/assets/images/illustrations/flower_one.svg";

import LogoLoading from "@/assets/images/animations/logo-loading.gif";
import LogoLoading1 from "@/assets/images/animations/logo-loading1.gif";

const logos = {
  LogoNombre,
};

const illustrations = {
  GirlCollecting,
  GirlStanding,
  CoffeePlant,
  Bird,
  CoffeeGrains,
  FlowerOne,
};

export const images = {
  ...illustrations,
  ...logos,
  LogoLoading,
  LogoLoading1,
  BreBQr,
};
