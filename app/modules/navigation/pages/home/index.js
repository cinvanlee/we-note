import React from "react";
import { Row, Col } from "antd";
import { Card, Button } from "@/components";
import { navigateTo } from "@/helper/utils";
import data from "./data";
import "./style.less";

class HomePage extends React.Component {
    render() {
        return (
            <div className="nav-home-page">
                <Row gutter={15}>
                    {data.map((card, i) => (
                        <Col xs={{ span: 12 }} lg={{ span: 8 }} key={i}>
                            <Card
                                size="small"
                                title={card.title}
                                extra={
                                    <Button
                                        type="link"
                                        onClick={this.openMultiSites.bind(this, card.links)}
                                    >
                                        一键打开
                                    </Button>
                                }
                            >
                                <div className="site-links">
                                    {card.links.map((link, linkIndex) => (
                                        <a
                                            className='site-link'
                                            key={linkIndex}
                                            onClick={this.openSite.bind(this, link)}
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }

    openMultiSites = sites => {
        sites.forEach(site => {
            this.openSite(site);
        });
    };

    openSite = site => {
        navigateTo({
            name: site.title,
            url: `/navigation/iframe?url=${site.url}`
        });
    };
}

export default HomePage;
