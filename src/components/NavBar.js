import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="#home">recipeManager</Navbar.Brand>
                <Nav className="mx-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Recipes" id="recipe-dropdown">
                        <NavDropdown.Item href="/recipes">All</NavDropdown.Item>
                        <NavDropdown.Item href="/">Main Dishes</NavDropdown.Item>
                        <NavDropdown.Item href="/">Side Dishes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='add'>Add new recipe</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;