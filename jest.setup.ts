import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

// React Router 7 usa TextEncoder al cargar y jsdom no lo trae; sin esto no se
// puede montar ningún componente que use el router.
Object.assign(global, { TextDecoder, TextEncoder });
