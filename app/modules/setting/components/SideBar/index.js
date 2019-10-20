import React from "react";
import { Nav } from "office-ui-fabric-react";

class SideBar extends React.Component {
    render() {
        const groups = [
            {
                links: [
                    {
                        name: "Demo components",
                        links: [
                            {
                                key: "ActivityItem",
                                name: "ActivityItem",
                                url: "#/setting/demo"
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
