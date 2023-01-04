const { render } = wp.element; //we are using wp.element here!
import App from './App';

if ( document.getElementById( 'my-react-app' ) ) {
	render( <App />, document.getElementById( 'my-react-app' ) );
}
