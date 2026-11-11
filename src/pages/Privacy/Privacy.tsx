import { Title } from "@/components/ui";
import { DATA_CONTROLLER, DATA_POLICY, URLS } from "@/utils/constants";
import "./Privacy.scss";

import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Privacy: React.FC = () => {
  return (
    <div className="container py-4 fmc-legal">
      <Title title="POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES" />

      <p className="fmc-legal__intro">
        Esta política explica qué datos personales recogemos en{" "}
        {DATA_CONTROLLER.site}, para qué los usamos, con quién los compartimos y
        cómo puedes controlarlos. La adoptamos para cumplir el artículo 15 de la
        Constitución, la Ley 1581 de 2012 y el Decreto 1377 de 2013, hoy
        compilado en el Decreto 1074 de 2015.
      </p>

      <h2 className="h5 mt-4">1. Quién responde por tus datos</h2>
      <Table responsive bordered size="sm" className="fmc-legal__table">
        <tbody>
          <tr>
            <th scope="row">Responsable</th>
            <td>
              {DATA_CONTROLLER.legalName} ({DATA_CONTROLLER.brand})
            </td>
          </tr>
          <tr>
            <th scope="row">{DATA_CONTROLLER.taxIdLabel}</th>
            <td>{DATA_CONTROLLER.taxId}</td>
          </tr>
          <tr>
            <th scope="row">Domicilio</th>
            <td>{DATA_CONTROLLER.city}, Colombia</td>
          </tr>
          <tr>
            <th scope="row">Dirección</th>
            <td>{DATA_CONTROLLER.address}</td>
          </tr>
          <tr>
            <th scope="row">Correo</th>
            <td>
              <a href={`mailto:${DATA_CONTROLLER.email}`}>
                {DATA_CONTROLLER.email}
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">Teléfono y WhatsApp</th>
            <td>
              <a href={DATA_CONTROLLER.phoneHref}>
                {DATA_CONTROLLER.phoneLabel}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
      <p>
        Las peticiones, consultas y reclamos sobre datos personales las atiende{" "}
        <strong>{DATA_CONTROLLER.privacyContact}</strong>, en{" "}
        <a href={`mailto:${DATA_CONTROLLER.email}`}>{DATA_CONTROLLER.email}</a>.
      </p>

      <h2 className="h5 mt-4">2. Qué datos recogemos</h2>
      <p>
        Solo pedimos lo que necesitamos para venderte café y entregártelo. No
        recogemos <strong>datos sensibles</strong> —salud, origen étnico, datos
        biométricos, opiniones políticas, convicciones religiosas o vida sexual—
        y nunca tendrás que darlos para comprar.
      </p>
      <h3 className="h6 mt-3">Cuando haces un pedido</h3>
      <ul>
        <li>Nombre y apellido, correo electrónico y número de celular.</li>
        <li>
          Tipo y número de documento de identidad. Nos sirven para identificar a
          quien recibe el pedido en la entrega y para respaldar el pago.
        </li>
        <li>
          Ciudad, barrio, dirección y las indicaciones adicionales que escribas
          para la entrega.
        </li>
        <li>
          El detalle del pedido: productos, molienda, cantidades, totales, medio
          de pago elegido, fecha y estado.
        </li>
        <li>
          Tu respuesta a la casilla de novedades por WhatsApp, marcada o no, y
          la versión del texto que viste al responderla.
        </li>
      </ul>
      <h3 className="h6 mt-3">Cuando nos escribes</h3>
      <ul>
        <li>
          Del formulario de contacto: nombre, correo, celular (opcional), asunto
          y mensaje.
        </li>
        <li>
          Si nos escribes por WhatsApp, el número desde el que lo haces y lo que
          nos cuentes en la conversación.
        </li>
      </ul>
      <h3 className="h6 mt-3">Mientras navegas</h3>
      <p>
        El sitio no usa cookies de publicidad ni de seguimiento. Lo que guarda
        queda <strong>en tu propio navegador</strong> y no llega a nosotros
        hasta que envías un pedido o un mensaje:
      </p>
      <ul>
        <li>Tu carrito, durante 14 días.</li>
        <li>
          Tus datos de contacto y entrega, <em>solo</em> si marcas la casilla
          «guardar mi información» en el checkout, para no volver a escribirlos.
          Los datos de pago nunca se guardan.
        </li>
        <li>
          La confirmación de tu último pedido, mientras dure la pestaña, para
          que puedas recargar la página sin perderla.
        </li>
      </ul>
      <p>
        Para distinguir personas de robots usamos Cloudflare Turnstile, que
        analiza datos técnicos de tu conexión y de tu navegador. No lo usamos
        para perfilarte ni para publicidad.
      </p>

      <h2 className="h5 mt-4">3. Para qué los usamos</h2>
      <ul>
        <li>Recibir, preparar, cobrar y entregar tu pedido.</li>
        <li>
          Enviarte la confirmación del pedido y mantenerte al tanto de su
          estado.
        </li>
        <li>Responder tus preguntas, quejas y reclamos.</li>
        <li>
          Llevar el historial de tus compras, para atenderte mejor y resolver
          cualquier reclamo posterior.
        </li>
        <li>
          Enviarte novedades y ofertas por WhatsApp,{" "}
          <strong>solo si lo autorizaste</strong> (sección 4).
        </li>
        <li>
          Cumplir nuestras obligaciones legales, contables y tributarias, y
          atender requerimientos de autoridades competentes.
        </li>
        <li>
          Proteger la tienda contra fraude y abuso, por ejemplo limitando
          pedidos automatizados.
        </li>
      </ul>
      <p>
        No vendemos, alquilamos ni intercambiamos tus datos personales con
        nadie, y no tomamos decisiones automatizadas que te afecten.
      </p>

      <h2 className="h5 mt-4">4. Las novedades por WhatsApp son opcionales</h2>
      <p>
        La casilla «{""}
        <em>Enviarme novedades y ofertas por WhatsApp</em>» del checkout es una
        autorización aparte: puedes comprar sin marcarla y nunca condiciona tu
        pedido. Si la marcas, el negocio te escribe a mano desde su propio
        número de WhatsApp; no hay envíos automáticos.
      </p>
      <p>
        Guardamos tu respuesta en cada pedido junto con la versión del texto que
        viste, como prueba de lo que autorizaste. Manda tu último pedido: si
        haces uno nuevo sin marcar la casilla, dejamos de escribirte. También
        puedes revocar la autorización en cualquier momento escribiéndonos a{" "}
        <a href={`mailto:${DATA_CONTROLLER.email}`}>{DATA_CONTROLLER.email}</a>{" "}
        o por{" "}
        <a
          href={DATA_CONTROLLER.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        , sin dar explicaciones y sin costo.
      </p>

      <h2 className="h5 mt-4">5. Con quién los compartimos</h2>
      <p>
        Para operar la tienda nos apoyamos en proveedores que tratan los datos{" "}
        <strong>por cuenta nuestra y siguiendo nuestras instrucciones</strong>,
        no para sus propios fines:
      </p>
      <Table responsive bordered size="sm" className="fmc-legal__table">
        <thead>
          <tr>
            <th scope="col">Proveedor</th>
            <th scope="col">Para qué</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cloudflare</td>
            <td>
              Servidor y base de datos donde viven los pedidos, y verificación
              anti-robots
            </td>
          </tr>
          <tr>
            <td>Resend</td>
            <td>Envío de los correos de confirmación</td>
          </tr>
          <tr>
            <td>GitHub Pages</td>
            <td>Publicación de este sitio web</td>
          </tr>
          <tr>
            <td>Zoho Mail</td>
            <td>Buzón de correo del negocio</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Quien realiza la entrega recibe tu nombre, dirección, teléfono y el
        detalle del pedido, que es lo mínimo para poder entregártelo. También
        entregamos información cuando una autoridad competente la solicita en
        ejercicio de sus funciones.
      </p>
      <p>
        Esos proveedores operan servidores <strong>fuera de Colombia</strong>,
        principalmente en Estados Unidos. Al aceptar esta política autorizas de
        forma expresa esa transferencia internacional, en los términos del
        artículo 26 de la Ley 1581 de 2012.
      </p>

      <h2 className="h5 mt-4">6. Cuánto tiempo los conservamos</h2>
      <ul>
        <li>
          <strong>Pedidos y sus soportes:</strong> mientras dure la relación
          comercial y después por el tiempo que exigen las normas comerciales y
          tributarias, hoy diez años.
        </li>
        <li>
          <strong>Mensajes de contacto:</strong> hasta resolver lo que nos
          planteas y un tiempo prudencial después, por si vuelves sobre el mismo
          asunto.
        </li>
        <li>
          <strong>Autorización de novedades:</strong> hasta que la revoques. La
          prueba de lo que autorizaste se conserva mientras pueda sernos
          exigida.
        </li>
        <li>
          <strong>Lo que guarda tu navegador:</strong> el carrito caduca a los
          14 días y los datos de «guardar mi información» siguen ahí hasta que
          los borres desde tu navegador.
        </li>
      </ul>

      <h2 className="h5 mt-4">7. Tus derechos</h2>
      <p>Como titular de los datos puedes, gratuitamente:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos.</li>
        <li>Pedir prueba de la autorización que nos diste.</li>
        <li>Ser informado sobre el uso que les hemos dado.</li>
        <li>
          Revocar la autorización y pedir que suprimamos tus datos, cuando no
          exista un deber legal o contractual que nos obligue a conservarlos.
        </li>
        <li>Acceder de forma gratuita a los datos que tengamos sobre ti.</li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio por
          infracciones a la ley.
        </li>
      </ul>

      <p>
        Cuando pidas que <strong>suprimamos</strong> tus datos, borramos tu
        ficha de cliente —nombre, correo, documento y celular— y los mensajes
        que nos hayas enviado por el formulario.{" "}
        <strong>Tus pedidos se conservan</strong> tal como están: son el soporte
        contable que las normas comerciales y tributarias nos obligan a guardar,
        y la ley permite negar la supresión en ese caso. Cuando venza ese plazo,
        también se van. Te lo decimos de frente para que sepas exactamente qué
        queda.
      </p>

      <h2 className="h5 mt-4">8. Cómo ejercerlos</h2>
      <p>
        Escríbenos a{" "}
        <a href={`mailto:${DATA_CONTROLLER.email}`}>{DATA_CONTROLLER.email}</a>{" "}
        con el asunto «Datos personales», por{" "}
        <a
          href={DATA_CONTROLLER.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>{" "}
        o desde el <Link to={URLS.contact}>formulario de contacto</Link>.
        Cuéntanos tu nombre, un dato con el que podamos ubicar tu información
        (el correo o el celular del pedido) y qué necesitas. Es gratis y no
        tienes que justificarlo.
      </p>
      <p>Estos son los plazos que cumplimos, fijados por la ley:</p>
      <ul>
        <li>
          <strong>Consultas</strong> (saber qué datos tenemos): respondemos en
          máximo <strong>diez días hábiles</strong>. Si no alcanzamos, te
          explicamos por qué y respondemos dentro de los cinco días hábiles
          siguientes.
        </li>
        <li>
          <strong>Reclamos</strong> (corregir, actualizar, suprimir o revocar):
          respondemos en máximo <strong>quince días hábiles</strong> contados
          desde el día siguiente a su recibo, prorrogables hasta por ocho días
          hábiles más si te avisamos. Si falta información te la pedimos dentro
          de los cinco días siguientes; si pasan dos meses sin que respondas,
          entendemos que desististe. Mientras lo resolvemos, el dato queda
          marcado como «reclamo en trámite».
        </li>
      </ul>
      <p>
        Si no quedas conforme puedes acudir a la Superintendencia de Industria y
        Comercio. La ley exige agotar primero este trámite con nosotros.
      </p>

      <h2 className="h5 mt-4">9. Niñas, niños y adolescentes</h2>
      <p>
        La tienda no está dirigida a menores de edad y no recogemos sus datos a
        sabiendas. Si crees que un menor nos dio información, escríbenos y la
        suprimimos.
      </p>

      <h2 className="h5 mt-4">10. Cómo los protegemos</h2>
      <p>
        El sitio y la tienda viajan cifrados con HTTPS, el panel donde el
        negocio consulta los pedidos exige clave y los datos se guardan en
        proveedores con medidas de seguridad estándar de la industria. Ningún
        sistema es infalible: si llegara a ocurrir un incidente que afecte tus
        datos, lo reportaremos a la Superintendencia de Industria y Comercio
        como manda la ley.
      </p>

      <h2 className="h5 mt-4">11. Cambios a esta política</h2>
      <p>
        Publicaremos cualquier cambio en esta misma página con su nueva fecha.
        Si el cambio es sustancial —quién responde por tus datos o para qué los
        usamos— te lo comunicaremos antes de aplicarlo.
      </p>

      <h2 className="h5 mt-4">12. Vigencia</h2>
      <p>
        Versión {DATA_POLICY.version}, vigente desde el{" "}
        {DATA_POLICY.effectiveDate}. Nuestras bases de datos estarán vigentes
        mientras sean necesarias para las finalidades de la sección 3, con los
        plazos de conservación de la sección 6.
      </p>
    </div>
  );
};
