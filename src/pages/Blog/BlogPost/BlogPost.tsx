import "./BlogPost.scss";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";

import store from "@/app/providers/redux/store";
import { IBlog, IBlogEntry, IBlogFlormorado } from "@/types/configCat";
import { setLoader } from "@/utils/constants/redux/sets";
import { Title } from "@/components/ui";

export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const { blog } = store.getState().main.flags;

  const [entry, setEntry] = useState<IBlogEntry | undefined>(undefined);

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (blog) {
      const { blogFlormorado }: IBlogFlormorado = JSON.parse(blog) as {
        blogFlormorado: IBlog;
      };
      const search: IBlogEntry | undefined = blogFlormorado.entries.find(
        (post: IBlogEntry) => post.slug === slug,
      );
      setEntry(search);
      setLoader(false);
    }
  }, [blog, slug]);

  if (!entry) {
    return (
      <Container className="py-5 text-center">
        <Title title="La entrada no existe o no está disponible." />
      </Container>
    );
  }

  const {
    title,
    excerpt,
    content,
    featuredImage,
    author,
    categories,
    tags,
    publishedAt,
    readingTimeMinutes,
  } = entry;

  return (
    <Container className="py-5 blog-post-page card">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <header className="post-header">
            {/* Categorías */}
            <div className="mb-3">
              {categories?.map((category: string) => (
                <Badge key={category} className="me-2 post-badge">
                  {category}
                </Badge>
              ))}
            </div>

            {/* Título */}
            <h1 className="post-title">{title}</h1>

            {/* Metadatos */}
            <div className="post-meta">
              <span>
                Por <span className="author-name">{author?.name}</span>
              </span>
              <span className="meta-divider">•</span>
              <span>{readingTimeMinutes} min de lectura</span>
              <span className="meta-divider">•</span>
              <span>
                {new Date(publishedAt).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </header>

          {/* Imagen destacada */}
          {featuredImage?.url && (
            <figure className="post-featured-image">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || title}
                fluid
              />
              {featuredImage.caption && (
                <figcaption className="text-muted mt-2 small text-center">
                  {featuredImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Extracto */}
          {excerpt && <p className="post-excerpt">{excerpt}</p>}

          {/* Contenido del post */}
          <article
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: content?.body || "",
            }}
          />

          {/* Tags */}
          {tags && tags?.length > 0 && (
            <div className="post-tags">
              <span className="tag-title">Etiquetas relacionadas:</span>
              <div>
                {tags.map((tag: string) => (
                  <Badge key={tag} className="me-2 post-tag-badge">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Autor */}
          {author && (
            <div className="author-box">
              <Row className="align-items-center">
                <Col xs="auto">
                  {author.avatarUrl && (
                    <Image
                      src={author.avatarUrl}
                      roundedCircle
                      width={80}
                      height={80}
                      alt={author.name}
                      className="author-image"
                    />
                  )}
                </Col>

                <Col>
                  <div className="author-name-title">{author.name}</div>
                  {author.role && (
                    <div className="author-role">{author.role}</div>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPost;
