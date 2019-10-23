import React from "react";
import { CompoundButton, Stack } from "office-ui-fabric-react";
import { navigateTo } from "@/helper/utils";

const stackTokens = {
    childrenGap: 40
};

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h3>工具</h3>
                <p>收集一些实用的小工具</p>
                <Stack horizontal tokens={stackTokens}>
                    <CompoundButton
                        secondaryText="一个简单的工具"
                        onClick={() => navigateTo({
                            name: 'JSON 格式化',
                            url: '/tool/json-beautify'
                        })}
                    >
                        JSON 格式化
                    </CompoundButton>
                </Stack>
            </div>
        );
    }
}

export default HomePage;
