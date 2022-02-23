import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'

function EditRecipe() {

    const location = useLocation()
    const { recipeDetails } = location.state;
    const [name, setName] = useState(recipeDetails.name);
    const [ingredients, setIngredients] = useState(recipeDetails.ingredients);
    const [instructions, setInstructions] = useState(recipeDetails.instructions);
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState([]);
    const [time, setTime] = useState([]);

    const removeIngredient = (index) => {
        let newIngredients = ingredients;
        newIngredients.splice(index,1);
        setIngredients([...newIngredients]);
    }

    const onNameChange = (recipeName) => {
        setName(recipeName.target.value)
    }

    const IngredientList = () => {
        return (
            <ul>
                {ingredients.map((ingredient, index) => {
                    return (
                        <li key={index}>{ingredient}<Button onClick={() => removeIngredient(index)}>delete</Button></li>
                    )
                })}
            </ul>
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
                <p>Ingredients</p>
                <IngredientList />
            </Form>
        </>
    )

}

export default EditRecipe;