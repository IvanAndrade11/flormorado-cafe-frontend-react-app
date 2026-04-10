import { Badge, Card, Row, Col } from "react-bootstrap";
import "./ProductInfo.scss";

export const ProductInfo = ({ product }: { product: any }) => {
  const { process } = product;
  return (
    <div className="product-info">
      <Row className="mt-1">
        <Col>
          <div className="product-price text-center mt-3">
            ${product.price} <span>COP</span>
            <div className="price-per-gram">
              Precio por gramo $
              {Number(
                product.price.replace(/\./g, "") / Number(product.size),
              ).toFixed(1)}
            </div>
          </div>
        </Col>
        <Col>
          <p className="product-description">{product.shortDescription}</p>
        </Col>
      </Row>

      <Card className="product-attributes mt-2">
        <Row>
          <Col>
            <ul>
              <li>
                <strong>Beneficio:</strong> {process.benefit}
              </li>
              <li>
                <strong>Secado:</strong> {process.drying}
              </li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li>
                <strong>Origen:</strong> {product.origin}
              </li>
              <li>
                <strong>Variedad:</strong> {product.variety}
              </li>
            </ul>
          </Col>

          <Col>
            <ul>
              <li>
                <strong>Fermentación:</strong> {process.controlledFermentation}{" "}
                (controlada)
              </li>
              <li>
                <strong>Tostión:</strong> {product.roastOptions}
              </li>
            </ul>
          </Col>
        </Row>
      </Card>

      {/* <hr /> */}
    </div>
  );
};
