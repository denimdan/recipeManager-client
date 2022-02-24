import { Container, Card, Col, Row, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Recipes() {
    const [show, setShow] = useState(false);
    const [recipeData, setRecipeData] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get('http://localhost:4000/api/recipes').then((response) => {
            setRecipeData(response.data);
        });
    }, []);

    const RenderCards = () => {
        return (
            <Container className="recipeContainer">
                {recipeData
                    ?
                    <Row xs={2} md={3} className="g-4">
                        {recipeData.map(recipe => {
                            return (
                                <Col key={recipe._id}>
                                    <Card className="recipeCard" onClick={() => handleModal(recipe._id)}>
                                        <Card.Img className="card-img-top" variant="top" src={recipe.image ? recipe.image : require('../images/defaultImage.jpg')} />
                                        <Card.Body>
                                            <Card.Title>{recipe.name}</Card.Title>
                                            <Card.Text>
                                                {recipe.text}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    :
                    <div>loading</div>
                }
            </Container>
        )
    }

    const RenderModal = () => {
        return (
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
                animation
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{recipeDetails.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ingredients:
                    {!recipeDetails.ingredients
                        ?
                        <div>loading</div>
                        :
                        <ul>
                            {recipeDetails.ingredients.map((i, index) => {
                                return (<li key={index}>{i}</li>)
                            })}
                        </ul>
                    }
                    Instructions:
                    {!recipeDetails.instructions
                        ?
                        <div>loading</div>
                        :
                        <ul>
                            {recipeDetails.instructions.map((i, index) => {
                                return (<li key={index}>{index + 1}. {i}</li>)
                            })}
                        </ul>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Link
                        to={{
                            pathname: '/edit',
                            state: {
                                recipeDetails
                            },
                        }}>
                        <Button variant="warning">Edit</Button>
                    </Link>
                    <Button onClick={() => deleteRecipe(recipeDetails._id)} variant="danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const handleModal = (id) => {
        axios.get(`http://localhost:4000/api/recipes/${id}`).then((response) => {
            setRecipeDetails(response.data)
        })
            .catch(err => {
                console.log('no connection');
                setRecipeDetails([]);
            })
        handleShow()
    }

    const deleteRecipe = (id) => {
        axios.delete(`http://localhost:4000/api/recipes/${id}`)
        .then(response => {
            console.log(response);
            handleClose();
            axios.get('http://localhost:4000/api/recipes').then((response) => {
                setRecipeData(response.data);
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <RenderCards />
            <RenderModal />
        </>

    )
}

export default Recipes;