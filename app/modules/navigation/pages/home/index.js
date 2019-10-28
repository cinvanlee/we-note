import React from "react";
import { Row, Col } from "antd";
import { Card, Button } from "antd";
import _ from "lodash";
import { navigateTo } from "@/helper/utils";
import data from "./data";
import "./style.less";

class HomePage extends React.Component {
    render() {
        const chunkData = _.chunk(data, 3);
        return (
            <div className="nav-home-page">
                {chunkData.map((chunk, chunkIndex) => (
                    <Row key={chunkIndex} gutter={15}>
                        {chunk.map((card, i) => (
                            <Col span={8} key={i}>
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
                                                className="site-link"
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
                ))}
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
