import './Card.css';

export default function Card({imgLink}){
    console.log(imgLink)
    return (
            <img src={imgLink}  className='image'/>
    );
}