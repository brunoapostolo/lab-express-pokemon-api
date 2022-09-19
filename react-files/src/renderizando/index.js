import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
function Rederizando() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function fetchComAxios() {
      try {
        const response = await axios.get("http://localhost:4000/pokemon/");
        setPokemons(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComAxios();
  }, []);
  return (
    <Container>
      <Row>
        {pokemons.map((element) => {
          return (
            <Col md="2">
              <Card>
                <Card.Img src={element.sprite} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Tipos do pokemon:
                    <ul>
                      {element.types.map((type) => {
                        return <li>{type}</li>;
                      })}
                    </ul>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Height: </strong>
                    {element.height}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Weight: </strong>
                    {element.weight}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default Rederizando;
