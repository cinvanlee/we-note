import React from "react";
import { Card, Row, Col, Button } from "@/components";

class UiPage extends React.Component {
    render() {
        return (
            <div>
                <Row gutter={15}>
                    <Col>
                        <Card title="按钮">
                            <Button type="default">Default</Button>
                            <Button type="primary">Primary</Button>
                            <Button type="info">Info</Button>
                            <Button type="warning">Warning</Button>
                            <Button type="danger">Danger</Button>
                            <Button type="danger" disabled>
                                Disabled
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={15}>
                    <Col>
                        <Card title="按钮">
                            <Button type="primary" size="lg">
                                Primary
                            </Button>
                            <Button type="primary">Primary</Button>
                            <Button type="primary" size="sm">
                                Primary
                            </Button>
                            <Button type="primary" size="xs">
                                Primary
                            </Button>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col>
                        <Card title="按钮">
                            <Button round type="default">
                                Default
                            </Button>
                            <Button round type="primary">
                                Primary
                            </Button>
                            <Button round type="info">
                                Info
                            </Button>
                            <Button round type="warning">
                                Warning
                            </Button>
                            <Button round type="danger">
                                Danger
                            </Button>
                            <Button round type="danger" disabled>
                                Disabled
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UiPage;
