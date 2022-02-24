import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Modal } from 'react-bootstrap'
import { TiDelete, TiPencil, TiPlus } from 'react-icons/ti'
import axios from "axios";


function EditRecipe() {
    const [show, setShow] = useState(false);
    const location = useLocation()
    const { recipeDetails } = location.state;
    const [name, setName] = useState(recipeDetails.name);
    const [ingredients, setIngredients] = useState(recipeDetails.ingredients);
    const [instructions, setInstructions] = useState(recipeDetails.instructions);
    const [tags, setTags] = useState(recipeDetails.tags);
    const [image, setImage] = useState(recipeDetails.image);
    const [time, setTime] = useState(recipeDetails.time);
    const [ingredientIndex, setIngredientIndex] = useState();
    const [instructionIndex, setInstructionIndex] = useState();
    const [newIngredient, setNewIngredient] = useState('');
    const [newInstruction, setNewInstruction] = useState('');
    // const [ingredientName, setIngredientName] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    const removeIngredient = (index) => {
        let newIngredients = ingredients;
        newIngredients.splice(index, 1);
        setIngredients([...newIngredients]);
    }

    const editIngredient = (index) => {
        setIngredientIndex(index)
        handleShow()
    }

    const newIngredientChange = (e) => {
        setNewIngredient(e.target.value)
    }

    const addIngredient = () => {
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    const editInstruction = (index) => {
        setInstructionIndex(index)
        handleShow()
    }

    const newInstructionChange = (e) => {
        setNewInstruction(e.target.value)
    }

    const addInstruction = () => {
        setInstructions(prevInstructions => [...prevInstructions, newInstruction])
    }

    const removeInstruction = (index) => {
        let newInstructions = instructions;
        newInstructions.splice(index, 1);
        setInstructions([...newInstructions]);
    }

    const onNameChange = (recipeName) => {
        setName(recipeName.target.value)
    }

    const onIngredientChange = (name) => {
        // setIngredientName(ingredientName.target.value)
        // ingredientName = name.target.value;
    }

    const saveChanges = () => {
        const newRecipeDetails = {
            name,
            ingredients,
            instructions,
            tags,
            image,
            time
        }
        console.log(newRecipeDetails)
        axios.put(`http://localhost:4000/api/recipes/${recipeDetails._id}`, newRecipeDetails)
        .then(
            console.log('Created', recipeDetails)
        )
        .catch(err => {
            console.log('no connection');
        })
    }

    const IngredientList = () => {
        return (
            <ul>
                {ingredients.map((ingredient, index) => {
                    return (
                        <li key={index}>{ingredient} <TiPencil onClick={() => editIngredient(index)} style={{ color: 'blue', fontSize: '20px' }} /><TiDelete onClick={() => removeIngredient(index)} style={{ color: 'red', fontSize: '20px' }} /></li>
                    )
                })}
            </ul>
        )
    }

    const InstructionList = () => {
        return (
            <ul>
                {instructions.map((instruction, index) => {
                    return (
                        <li key={index}>{index+1}. {instruction} <TiPencil onClick={() => editIngredient(index)} style={{ color: 'blue', fontSize: '20px' }} /><TiDelete onClick={() => removeInstruction(index)} style={{ color: 'red', fontSize: '20px' }} /></li>
                    )
                })}
            </ul>
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
                    <Modal.Title>Edit Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="recipeName">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type="text" value={ingredients[ingredientIndex]} onChange={onIngredientChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="recipeName">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={onNameChange} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="recipeIngredients">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={ingredientString}
                        rows={ingredients.length}
                        onChange={onIngredientChange} />
                    <Form.Text className="text-muted">
                        Separate ingredients with a comma
                    </Form.Text>
                </Form.Group> */}

            </Form>
            <p>Ingredients</p>
            <IngredientList />
            <Form>
                <Form.Group className="mb-3" controlId="ingredientName">
                    <Form.Control type="text" value={newIngredient} onChange={newIngredientChange} />
                    <TiPlus onClick={() => addIngredient()} />
                </Form.Group>
            </Form>
            <InstructionList />
            <Form>
                <Form.Group className="mb-3" controlId="instructionName">
                    <Form.Control type="text" value={newInstruction} onChange={newInstructionChange} />
                    <TiPlus onClick={() => addInstruction()} />
                </Form.Group>
            </Form>
            <Button onClick={() => saveChanges()}>Save</Button>
        </>
    )

}

export default EditRecipe;