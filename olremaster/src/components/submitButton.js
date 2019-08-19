
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SubmitButton extends Component {
render(){
return(
    <div>
 <Form>
 <Button color='pink' type="submit"> Submit Draft </Button>
</Form>

      </div>
);
}
}

export default SubmitButton;