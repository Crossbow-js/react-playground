var React  = require("react");

let Logo = React.createClass({
    render() {
        return <h1>React Playground</h1>
    }
});

let Header = React.createClass({
    render() {
        return <header>
                <Logo />
                <p className="lede">Have Fun!</p>
            </header>
    }
});

module.exports = Header;