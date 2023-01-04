import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const filterQuery = ( options, state ) => {
	const newOptions = [];
	options.forEach( ( element ) => {
		if (
			( element.name &&
				element.name
					.trim()
					.toLowerCase()
					.startsWith( state.inputValue.toLowerCase() ) ) ||
			element.symbol
				.trim()
				.toLowerCase()
				.startsWith( state.inputValue.toLowerCase() )
		)
			newOptions.push( element );
	} );
	return newOptions;
};

const App = () => {
	const [ companies, setCompanies ] = useState( [] );
	const [ open, setOpen ] = useState( false );
	const [ inputValue, setInputValue ] = useState( '' );

	useEffect( () => {
		async function loadCompanies() {
			const response = await fetch(
				'https://fda8-2601-246-4680-19a0-b8f6-b324-c057-55c6.ngrok.io/api/company/list'
			);
			if ( response.ok ) {
				setCompanies( await response.json() );
			}
		}
		loadCompanies();
	}, [] );

	return (
		<div>
			<Autocomplete
				disablePortal
				open={ open }
				onOpen={ () => {
					if ( inputValue ) {
						setOpen( true );
					}
				} }
				onClose={ () => setOpen( false ) }
				inputValue={ inputValue }
				onInputChange={ ( e, value ) => {
					setInputValue( value );
					if ( ! value ) {
						setOpen( false );
					}
				} }
				id="combo-box-demo"
				options={ companies }
				clearOnEscape={ true }
				size={ 'small' }
				forcePopupIcon={ false }
				getOptionLabel={ ( option ) =>
					option.name + ' (' + option.symbol + ')'
				}
				filterOptions={ filterQuery }
				sx={ { width: 300 } }
				onChange={ ( e, value ) => {
					window.location = '/stock-summary?ppc=' + value.symbol;
				} }
				renderInput={ ( params ) => (
					<TextField { ...params } label="Search by name or symbol" />
				) }
			/>
		</div>
	);
};
export default App;
