import FrescaLata from ".//images/products/FrescaLataFigura.png";
import MundetLata from ".//images/products/MundetLataFigura.png";
import FrescaBotella from ".//images/products/FrescaBotellaFigura.png";
import FuzeTea from ".//images/products/FuzeTeaFigura.png";
import PoweradeMoraAzulBotella from ".//images/products/PoweradeBotellaFigura.png";
import DelawarePunchLata from ".//images/products/DelawareLataFigura.png";
import JugoDelValle from ".//images/products/JugoDelValleFigura.png";
import MundetBotella from ".//images/products/MundetBotellaFigura.png";
import CocaColaBotella from ".//images/products/CocaColaBotellaFigura.png";
import PoweradeMoraAzulLata from ".//images/products/PoweradeLataFigura.png";
import CocaColaLata from ".//images/products/CocaColaLataFigura.png";
import OtroProducto from ".//images/products/OtroProductoFigura.png";

export const showSoda = (number) => {
  switch (number) {
    case 1:
      return FrescaLata;
    case 2:
      return MundetLata;
    case 3:
      return FrescaBotella;
    case 4:
      return FuzeTea;
    case 5:
      return PoweradeMoraAzulBotella;
    case 6:
      return DelawarePunchLata;
    case 7:
      return JugoDelValle;
    case 8:
      return MundetBotella;
    case 9:
      return CocaColaBotella;
    case 10:
      return PoweradeMoraAzulLata;
    case 11:
      return CocaColaLata;
    case 12:
      return OtroProducto;
    default:
      return CocaColaBotella;
  }
};

showSoda(1);
