import React from "react";
import { Dropdown } from "office-ui-fabric-react";

class AppearancePage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="wn-card">
                    <h2>Overview</h2>
                    <p>
                        A Card is a surface to display content and actions about
                        a single topic. It acts as a container for actionable
                        information like text, images and icons.
                    </p>
                    <p>
                        A Card abstracts styling properties to utilize them in
                        tandem with theme variables and provides some inherent
                        styling in the way of a box-shadow on the container.
                    </p>
                </div>
            </div>
        );
    }
}

export default AppearancePage;
