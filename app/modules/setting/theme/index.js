import React from "react";
import {
    FormGroup,
    InputGroup,
    Button,
    HTMLSelect,
    Checkbox,
    Card,
    Elevation
} from "@blueprintjs/core";

class ThemePage extends React.Component {
    render() {
        return (
            <div>
                <Card elevation={Elevation.TWO}>
                    <h2>Theme Config</h2>
                    <p>
                        User interfaces that enable people to interact smoothly
                        with data, ask better questions, and make better
                        decisions.
                    </p>
                    <FormGroup>
                        <span>Theme: </span>
                        <HTMLSelect>
                            <option value="">Default Light</option>
                            <option value="">Dark</option>
                        </HTMLSelect>
                        <Checkbox inline style={{ marginLeft: 20 }}>
                            Use darker window header
                        </Checkbox>
                    </FormGroup>

                    <FormGroup>
                        <Checkbox inline>Use custom font</Checkbox>
                        <HTMLSelect>
                            <option value="">微软雅黑</option>
                            <option value="">Monospace</option>
                        </HTMLSelect>

                        <span style={{ marginLeft: 20 }}>Size: </span>
                        <HTMLSelect>
                            <option value="">13px</option>
                            <option value="">14px</option>
                        </HTMLSelect>
                    </FormGroup>

                    <Button style={{ marginRight: 10 }}>Cancel</Button>
                    <Button style={{ marginRight: 10 }} disabled>
                        Apply
                    </Button>
                    <Button intent="primary">OK</Button>
                </Card>
            </div>
        );
    }
}

export default ThemePage;
