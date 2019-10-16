import React from "react";
import { inject, observer } from "mobx-react";

@inject(stores => ({
    money: stores.counter.money,
    increment: stores.counter.increment,
    decrement: stores.counter.decrement
}))
@observer
class Counter extends React.Component {
    render() {
        const { money, decrement, increment } = this.props;
        return (
            <div>
                <p>You have ${money}</p>
                <p>
                    <button onClick={() => decrement()}>-</button>&nbsp;
                    <button onClick={() => increment()}>+</button>
                </p>
            </div>
        );
    }
}

export default Counter;
