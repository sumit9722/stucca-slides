import './App.css'
import Card from './Card'
import { useCallback, useEffect, useRef, useState } from 'react'
import InfoBox from './InfoBox';
import CardBack from './CardBack';
import {gsap} from 'gsap';
import {useGSAP} from '@gsap/react';

export default function App() {

  const listOfStucaa = [
    {
      name : "Prateek Kashyap",
      depName : "Department of Visual Media",
      imgLink : "./assets/prateek.png"
    },
    {
      name : "Shreyansh Vanjani",
      depName : "Department of Art, Design and Publicity",
      imgLink : "./assets/shreyansh.png"
    },
    {
      name : "Aryan Wadlwa",
      depName : "Department of Publications and Correspondence",
      imgLink : "./assets/aryan.png"

    },
    {
      name : "Jaiditya Singh",
      depName : "Department of Controls",
      imgLink : "./assets/jaiditya.png"

    },
    {
      name : "Rijul Bassamboo",
      depName : "Department of Reception and Accommodation",
      imgLink: "./assets/rijul.png"

    },
    {
      name : "Shreeram Verma",
      depName : "Department of Sponsorship and Marketing",
      imgLink : "./assets/shreeram.png"

    },
    {
      name : "Aryan Khorana",
      depName : "General Secretary, Students' Union",
      imgLink : "./assets/aryankhorana.png"

    },
    {
      name : "Ahan Bansal",
      depName : "President, Students' Union",
      imgLink : "./assets/ahan.png"

    }
  ];

  const [currIndex, setCurrIndex] = useState(1);
  const currIndexRef = useRef(currIndex);
  const currCard = useRef();
  const currFront = useRef();
  const currFrontText = useRef();
  const currFrontImage = useRef();



  const beforeanimation = (settingFunc, number) => {
    var tl = gsap.timeline();
    tl.to(currCard.current,{
      width: '35.44vh',
      duration:0.4
    },0).to(currFrontImage.current,{
      scale:0.25,
      duration:0.5
    },0)
    tl.to(currCard.current, {
      rotateY: 180,
      onComplete : () => {
        settingFunc(number);
      }
    })
    
  }

  
    useGSAP(

      () => {
        var tl = gsap.timeline();
        tl.to(currCard.current, {
          rotateY: 0,
          duration: 0.5
        })
        tl.to(currCard.current,{
          width: '75vw',
          duration:0.5,
          delay: 0.3
        },0).to(currFrontImage.current,{
          scale:1,
          duration: 0.5,
          delay: 0.3
        },0)
      },
      [currIndex]
    )

    useEffect(() => {
      currIndexRef.current = currIndex;
    }, [currIndex]);

  useEffect(() => {
    function changeData(e) {
      const number = Number(e.key); 
      console.log(e, number, currIndexRef.current);
      if(!isNaN(number) && (number >= 1 && number <= 8) && (number != currIndexRef.current)){
        beforeanimation((number) => {
        
          setCurrIndex((number));
        },number);
      }
      
    }

    window.addEventListener('keydown', changeData);

    return () => {
      window.removeEventListener('keydown', changeData);
    }
  },[])

  return (
    <>
      <div className="logo">
        <img src="./assets/oasislogoNew.png" alt="osaislogo" className='oasislogo' />
      </div>
      <div ref={currCard} className="displaybody">
        <div ref={currFront} className="frontpart">
          <div ref={currFrontImage} className="imagebox">
            <Card imgLink = {listOfStucaa[currIndex-1].imgLink}/>
          </div>
          <div ref={currFrontText} className="infoboxdiv">
            <InfoBox  name = {listOfStucaa[currIndex-1].name} depName = {listOfStucaa[currIndex-1].depName}/>
          </div>
        </div>
        <div className="backpart">
          <CardBack className="cardbacks"/>
        </div>
      </div>
      <img src="./assets/right.png" className ="bottom-right"/>
      <img src="./assets/right.png" className ="bottom-left"/>
      
    </>
  )
}

