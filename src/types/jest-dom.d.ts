// Los matchers de jest-dom (toBeInTheDocument, toBeDisabled, ...) se registran
// en jest.setup.ts, que está fuera de `src`: sin esta línea tsc y el build no
// ven sus tipos y rechazan cualquier prueba de componentes que los use.
import "@testing-library/jest-dom";
