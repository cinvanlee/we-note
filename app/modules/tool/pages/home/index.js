import React from "react";
import { Button } from "antd";
import { navigateTo } from "@/helper/utils";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h3>工具</h3>
                <p>收集一些实用的小工具</p>
                <Button
                    onClick={() =>
                        navigateTo({
                            name: "JSON 格式化",
                            url: "/tool/json-beautify"
                        })
                    }
                >
                    JSON 格式化
                </Button>
            </div>
        );
    }
}

export default HomePage;
