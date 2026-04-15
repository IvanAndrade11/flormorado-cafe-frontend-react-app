import "./ProductDetail.scss";

import { Container, Row, Col, Badge } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  ProductGallery,
  ProductInfo,
  ProductConfigurator,
  Title,
} from "@/components/ui";
import store from "@/app/providers/redux/store";
import { useEffect, useState } from "react";
import { setLoader } from "@/utils/constants/redux/sets";
import { ICoffeeProduct } from "@/types/configCat";
import { URLS } from "@/utils/constants";
import { isMobile } from "react-device-detect";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ICoffeeProduct | undefined>(undefined);

  const { storeProducts } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (storeProducts) {
      const { products } = JSON.parse(storeProducts) as {
        products: ICoffeeProduct[];
      };
      const productFinded: ICoffeeProduct | undefined = products.find(
        (post: ICoffeeProduct) => post.id === productId,
      );
      setProduct(productFinded);
      setLoader(false);
    }
  }, [storeProducts]);

  if (!product)
    return (
      <Container className="py-5 text-center">
        <Title title="El producto no existe o no está disponible." />
      </Container>
    );

  const ProductTitle = () => {
    return (
      <>
        {!product.stock && (
          <div className="text-end">
            <Badge pill bg="secondary" className="stock-badge">
              Agotado
            </Badge>
          </div>
        )}
        <h1 className={`product-title text-center ${isMobile ? "mb-3" : ""}`}>
          {product.name}
        </h1>
      </>
    );
  };

  const ProductDescription = () => {
    return (
      <>
        <div className="product-tags">
          <span className="tag-title">Etiquetas relacionadas:</span>
          <div>
            {product.tags.map((tag: string) => (
              <Badge key={tag} className="me-2 product-tag-badge">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <section className="product-description-section">
          <p style={{ whiteSpace: "pre-line" }}>{product.productDescription}</p>
        </section>
      </>
    );
  };

  return (
    <Container className="py-3">
      <div className="mb-4">
        <Link
          to={URLS.store}
          className="text-decoration-none d-inline-flex align-items-center"
          style={{
            color: "#6d2649",
            fontWeight: 700,
            fontSize: "1.3rem",
            fontFamily: '"Economica", sans-serif',
          }}
        >
          <span className="me-2 fs-4">←</span> Volver a la tienda
        </Link>
      </div>
      <Row className="fmc-product-detail gy-5">
        <Col lg={6}>
          {isMobile && <ProductTitle />}
          <ProductGallery imageUrl={product.imageUrl} />
          {!isMobile && <ProductDescription />}
        </Col>

        <Col lg={6}>
          {!isMobile && <ProductTitle />}
          <ProductInfo product={product} />
          <ProductConfigurator product={product} />
          {isMobile && <ProductDescription />}
        </Col>
      </Row>
    </Container>
  );
};
