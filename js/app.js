var React  = require("react");
var Header = require('./header');

let App = React.createClass({
    render() {
        return <Header />
    }
});


React.render(<App/>, document.getElementById('example'));

