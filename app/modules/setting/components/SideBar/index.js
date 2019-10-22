import React from "react";
import { Nav } from "office-ui-fabric-react";

class SideBar extends React.Component {
    render() {
        const groups = [
            {
                links: [
                    {
                        name: "测试版块",
                        links: [
                            {
                                key: "Test TabBar",
                                name: "测试 TabBar",
                                url: "#/setting/test-tabbar"
                            }
                        ]
                    },
                    {
                        name: "Theme",
                        links: [
                            {
                                key: "Theme",
                                name: "ColorPicker",
                                url: "#/setting/theme"
                            }
                        ]
                    }
                ]
            }
        ];
        return (
            <div>
                <Nav groups={groups} />
            </div>
        );
    }
}

export default SideBar;
