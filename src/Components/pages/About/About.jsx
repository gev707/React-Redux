
import userImage from '../../../assets/Images/1619201806928.jpg';
import aboutImage from '../../../assets/Images/form.png';
import styles from './about.module.css'
import { Card, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhone,
    faCalendarAlt,
    faMapMarkerAlt,

} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
const About = () => {
    const sections = [
        {
            text:`This is my first React project, however, 
            building a todo application can be a great way to learn
            React and solidify some of the basic principles of the library.
            So today, we will be building a simple React app.`,
            image: aboutImage,
            figcaption: 'My Todo List !',
            alt:'myTodoList'
        }
        
    ];
    const section=sections.map((section,index)=>{
        return (
            <div key={index}>
                <h4 className={styles.aboutText}>{section.text}</h4>
                <figure>
                    <img src={section.image} alt={section.alt}/>
                    <figcaption>{section.figcaption}</figcaption>
                </figure>
            </div>
        )
    });
    return (
        <div className={styles.aboutHolder}>
            <div className={styles.aboutWrapper}>
            <h1 className={styles.aboutTitle}>Hi Dear Reader!</h1>
                <div className={styles.aboutSidebar}>
                    <Card >
                        <Image className={styles.userImage} roundedCircle src={userImage} />
                        <Card.Body>
                            <Card.Title>Gevorg Margaryan</Card.Title>
                            <Card.Text className={styles.userInfo}>
                                I have successfully completed an React/Redux educational programm
                                in Bitschool Business Development Group.
                        </Card.Text>
                        </Card.Body>
                        <div className={styles.contactsUser}>
                            <div className={styles.contactUser}>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <address className={styles.address}>gev.mar92@gmail.com</address>
                            </div>
                            <div className={styles.contactUser}>
                                <FontAwesomeIcon icon={faPhone} />
                                <address className={styles.address}>+374-93-60-70-16</address>
                            </div>
                            <div className={styles.contactUser}>
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <address className={styles.address}>05/10/1992</address>
                            </div>
                            <div className={styles.contactUser}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <address className={styles.address}>c.Vagharshapat</address>
                            </div>
                        </div>
                        <Card.Body>
                            <hr className={styles.hr} />
                            <Card.Link href="https://www.linkedin.com/in/gev-margaryan-b5a571188/">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Card.Link>
                            <Card.Link href="https://github.com/gev707">
                                <FontAwesomeIcon icon={faGithub} />
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className={styles.aboutContent}>
                    <h2>My First Project</h2>
                   {section}
                </div>
            </div>
        </div>
    )
}
export default About;