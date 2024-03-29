import { useState } from 'react'
import { Formik, Field, Form} from 'formik'
import './header.css'
import './content.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log(photos);
  return(
    <>
    <header>
      <Formik
        initialValues={{ search: ''}}
        onSubmit={async values => {
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, { headers: {'Authorization': 'Client-ID -f9so7Frdcwp0GE_vVbjc7j2i2XcXkKM_sef_1M51Qg'} } )
          const data = await response.json()
          setPhotos(data.results)
        }}
      >

        <Form>
          <Field name='search' />
        </Form>

      </Formik>
    </header>
    <div className='container'>
      <div className='center'>
        {photos.map(x => <article key={x.id} onClick={() => open(x.links.html)}>  <img src={x.urls.regular} />  <p>{[x.description, x.alt_description].join(' - ')}</p></article>)}
      </div>
    </div>

    </>
  )
}

export default App

// Hasta ahora lo que se ha hecho es importar desde formik, los componentes Formik, Field and Form, con los cuales creamos el input de nuestra App.
// A nuestros componente de Formik, le colocamos sus propiedades, las cuales son "initialValues (que son los valores iniciales de nuestros campo)", y "onSubmit (que es cuando le damos click al botón tipo submit o a la tecla de enter, que nos entrega los valores registrados en el campo de input)."
// Luego solamente le dimos estilos a nuestro header para que tenga más presentación.