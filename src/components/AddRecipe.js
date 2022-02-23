import {Form, Row, Col, Button} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
function AddRecipe() {

    const [url, setUrl] = useState('');

    const onUrlChange = (recipeUrl) => {
        setUrl(recipeUrl.target.value)
    } 
    
    const submitUrl = () => {
        console.log(url)
        axios.post("http://localhost:4000/api/new", {url})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    return (
        <Form>
            <Row>
                <Col>
                <Form.Control onChange={onUrlChange} type="text" placeholder='Enter URL of recipe' />
                <Button onClick={submitUrl} variant="primary">Add</Button>
                </Col>
            </Row>
        </Form>
    )
}
 
export default AddRecipe;