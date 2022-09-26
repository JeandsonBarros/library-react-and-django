import '../styles/Styles.css';

function Container({ children }) {
    return ( 
    <section className='container'>
        {children}
    </section> );
}

export default Container;