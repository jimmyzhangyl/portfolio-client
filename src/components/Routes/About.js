import Container from 'react-bootstrap/esm/Container'
import Image from 'react-bootstrap/Image'
import { Page, Timeline } from '../components'


export default function About() {  
    return (
        <div>
            <section className='bg-light'>
                <Image fluid src={require('../../img/Header.jpg')} alt="landing Page Top" />
                <Container className='p-5 overflow-auto'>
                    <Page collection="pages" name="bio" />
                </Container>
            </section>
            <section >
                <Container className='p-5'>
                    <Timeline />
                </Container>
            </section>
            <Image fluid src={require('../../img/Footer.jpg')} alt="landing Page Bot" />

        </div>

    )
}