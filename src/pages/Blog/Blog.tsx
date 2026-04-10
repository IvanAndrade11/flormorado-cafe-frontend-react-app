import { Title } from "@/components/ui";
import "./Blog.scss";

import React, { useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import store from "@/app/providers/redux/store";
import { setLoader } from "@/utils/constants/redux/sets";
import { IBlog, IBlogEntry, IBlogFlormorado } from "@/types/configCat";

export const Blog: React.FC = () => {
  const navigate = useNavigate();

  const [blogList, setBlogList] = React.useState<IBlogEntry[]>([]);

  const { blog } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (blog) {
      const { blogFlormorado }: IBlogFlormorado = JSON.parse(blog) as {
        blogFlormorado: IBlog;
      };
      setBlogList(blogFlormorado.entries);
      setLoader(false);
    }
  }, [blog]);

  if (!blogList.length) {
    return (
      <Container className="py-5 text-center">
        <Title title="No hay entradas disponibles." />
      </Container>
    );
  }

  return (
    <>
      <div className="container">
        <Title title="FLORMORADO BLOG" />
      </div>

      <Container className="py-5 blog-page">
        <Row className="g-4">
          {blogList.map((entry) => (
            <Col key={entry.id} xs={12} md={6} lg={4}>
              <Card
                className="h-100 shadow-sm blog-card"
                onClick={() => navigate(`/blog/${entry.slug}`)}
              >
                {entry.featuredImage?.url && (
                  <Card.Img
                    variant="top"
                    src={entry.featuredImage.url}
                    alt={entry.featuredImage.alt || entry.title}
                    className="card-img-top"
                  />
                )}

                <Card.Body className="d-flex flex-column card-body">
                  <div className="mb-2">
                    {entry.categories?.map((category: string) => (
                      <Badge key={category} className="me-1 blog-badge">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <Card.Title className="card-title">{entry.title}</Card.Title>

                  <Card.Text className="card-text">{entry.excerpt}</Card.Text>

                  <div className="mt-auto">
                    <div className="blog-meta-text mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                      Por {entry.author?.name} · {entry.readingTimeMinutes} min
                    </div>

                    <div className="blog-date-text mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-calendar-event me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                      </svg>
                      {new Date(entry.publishedAt).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <div>
                      <Link
                        to={`/blog/${entry.slug}`}
                        className="dynamic-link stretched-link"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
